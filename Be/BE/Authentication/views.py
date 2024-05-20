from django.contrib.auth import authenticate, login
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework.views import APIView
from Authentication.models import User, OTP, KhachHang, NhanVien
from Authentication.serializers import LoginSerializer, VerifyUserSerializer, CreateAdminUserSerializer, \
    AdminUserLoginSerializer, UpdateAdminPasswordSerializer, ResetAdminPasswordSerializer, GetUserInfoSerializer, \
    UpdateUserInfoSerializer, GetKhachHangInfoSerializer,KhachHangUpdateSerializer

from Authentication.serializers import KhachHangGetListSerializer, NhanVienGetListSerializer
from core import settings
from ultis.helper import validate_email_address, get_validate_date, get_full_image_url, convert_phone_number, \
    send_email, send_log_email
from ultis.api_helper import api_decorator

# Nhan Vien
from .serializers import NhanVienGetListSerializer


class RegisterAPIView(APIView):
    permission_classes = (AllowAny,)

    @api_decorator
    def post(self, request):
        email = request.data.get('email', None)
        phone_number = request.data.get('phone_number', None)
        password1 = request.data.get('password1', None)
        password2 = request.data.get('password2', None)

        if not (phone_number and password1 and password2):
            return {}, "Missing required fields", status.HTTP_400_BAD_REQUEST

        send_log_email(request)
        phone_number = convert_phone_number(phone_number)

        if User.objects.filter(phone_number=phone_number).exists():
            return {}, "SĐT User already exists", status.HTTP_400_BAD_REQUEST
        elif User.objects.filter(email=email).exists():
            return {}, "Email already exists", status.HTTP_400_BAD_REQUEST

        if password1 != password2:
            return {}, "Mật khẩu không giống nhau", status.HTTP_400_BAD_REQUEST

        user = User.objects.create_user(phone_number=phone_number, email=email)

        user.set_password(password1)
        user.email = email
        user.points = 1000
        user.save()

        response_data = {
            'phone_number': user.local_phone_number if hasattr(user, 'local_phone_number') else None,
            'email': user.email if hasattr(user, 'email') else None,
            'id': str(user.id),
            'is_active': user.is_active,
            'is_verify': user.is_verify,
            'is_staff': user.is_staff,
            'created_at': user.created_at,
            'token': user.token
        }

        return response_data, "Register successful", status.HTTP_201_CREATED


class LoginAPIView(APIView):
    permission_classes = (AllowAny,)

    @api_decorator
    def post(self, request):
        email = request.data.get('email', None)
        phone_number = request.data.get('phone_number', None)
        password = request.data.get('password', None)

        if not ((phone_number or email) and password):
            return {}, "Cần nhập đầy đủ thông tin", status.HTTP_400_BAD_REQUEST

        send_log_email(request)

        user = None

        if "@" in phone_number:
            print("Yes")
            user = User.objects.filter(email=phone_number).first()
            if user and user.check_password(password):
                user = User.objects.filter(email=phone_number).first()
            else:
                user = None
        elif phone_number:
            phone_number = convert_phone_number(phone_number)
            user = authenticate(phone_number=phone_number, password=password)

        # elif email:
        #     user = User.objects.filter(email=email).first()
        #     if user.check_password(password):
        #         user = User.objects.filter(email=email).first()
        #     else:
        #         user = None
        if user is None:
            return {}, "Tài khoản hoặc mật khẩu không chính xác", status.HTTP_401_UNAUTHORIZED
        response_data = {
            'phone_number': user.local_phone_number if hasattr(user, 'local_phone_number') else None,
            'email': user.email if hasattr(user, 'email') else None,
            'id': str(user.id),
            'is_active': user.is_active,
            'is_verify': user.is_verify,
            'is_staff': user.is_staff,
            'created_at': user.created_at,
            'token': user.token
        }

        return response_data, "Login successful", status.HTTP_200_OK


class VerifyUserView(APIView):
    permission_classes = (IsAuthenticated,)

    @api_decorator
    def post(self, request):
        phone_number = request.user.phone_number

        if not User.objects.filter(phone_number=phone_number).exists():
            raise ValueError("User doest not exist")

        user = User.objects.get(phone_number=phone_number)
        user.is_verify = True
        user.save()
        serializer = VerifyUserSerializer(user, data=request.data, partial=True, context={'request': request})
        if serializer.is_valid(raise_exception=True):
            serializer.is_verify = True
            serializer.save()
            data = serializer.data

            return data, "Verify user successfully", status.HTTP_200_OK
        return Response({
            "status_code": status.HTTP_400_BAD_REQUEST,
            "message": "Invalid data format",
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)


class GetUserInfoAPIView(APIView):
    permission_classes = (IsAuthenticated,)

    @api_decorator
    def get(self, request):
        phone_number = request.user.phone_number
        user = User.objects.get(phone_number=phone_number)
        serializer = GetUserInfoSerializer(user, context={'request': request})
        return serializer.data, "Retrieve data successfully", status.HTTP_200_OK


class GetKhachHangInfoAPIView(APIView):
    permission_classes = (IsAuthenticated,)

    @api_decorator
    def get(self, request):
        phone_number = request.user.phone_number
        user = KhachHang.objects.get(phone_number=phone_number)

        serializer = GetKhachHangInfoSerializer(user)

        return serializer.data, "Retrieve data successfully", status.HTTP_200_OK


class UpdateUserInfoAPIView(APIView):
    permission_classes = (IsAuthenticated,)

    @api_decorator
    def put(self, request):
        phone_number = request.user.phone_number

        if not User.objects.filter(phone_number=phone_number).exists():
            raise ValueError("User doest not exist")

        user = User.objects.get(phone_number=phone_number)
        serializer = UpdateUserInfoSerializer(user, data=request.data, partial=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return serializer.data, "Update user successfully", status.HTTP_200_OK


class DeleteUserInfoAPIView(APIView):
    permission_classes = (IsAuthenticated,)

    @api_decorator
    def delete(self, request):
        phone_number = request.user.phone_number
        user = User.objects.get(phone_number=phone_number)
        user.delete()
        return {}, "Delete user successfully", status.HTTP_204_NO_CONTENT


# Khách hàng

class ChangePWKhachHangAPIView(APIView):
    permission_classes = (IsAuthenticated,)

    @api_decorator
    def post(self, request):
        password = request.data.get('password')
        password1 = request.data.get('password1')
        password2 = request.data.get('password2')
        phone_number = request.user.phone_number
        user = KhachHang.objects.get(phone_number=phone_number)
        if not user.check_password(password):
            return {}, "Mật khẩu không chính xác", status.HTTP_400_BAD_REQUEST
        elif password1 == password2:
            user.password=password1
        else:
            return {}, "Mật khẩu không giống nhau", status.HTTP_400_BAD_REQUEST

        serializer = GetKhachHangInfoSerializer(user)
        user.save()
        return serializer.data, "Đổi mật khẩu thành công", status.HTTP_200_OK

class KhachHangLoginAPIView(APIView):
    permission_classes = (AllowAny,)

    @api_decorator
    def post(self, request):
        email = request.data.get('email', None)
        phone_number = request.data.get('phone_number', None)
        password = request.data.get('password', None)

        if not ((phone_number or email) and password):
            return {}, "Cần nhập đầy đủ thông tin", status.HTTP_400_BAD_REQUEST

        user = None

        if "@" in phone_number:
            print("Yes")
            user = KhachHang.objects.filter(email=phone_number).first()
            if user and user.check_password(password):
                if KhachHang.objects.filter(email=phone_number).first():
                    phone = KhachHang.objects.filter(email=phone_number).first().phone_number
                    user = authenticate(phone_number=phone,
                                        password=password)
            else:
                user = None
        elif phone_number:
            phone_number = convert_phone_number(phone_number)
            user = authenticate(phone_number=phone_number, password=password)

        if user is None or not KhachHang.objects.filter(user_ptr_id=user.id).first():
            return {}, "Tài khoản hoặc mật khẩu không chính xác", status.HTTP_401_UNAUTHORIZED

        response_data = {
            'phone_number': user.local_phone_number if hasattr(user, 'local_phone_number') else None,
            'email': user.email if hasattr(user, 'email') else None,
            'id': str(user.id),
            'ho_ten': user.ho_ten,
            'is_active': user.is_active,
            'is_verify': user.is_verify,
            'is_staff': user.is_staff,
            'created_at': user.created_at,
            'token': user.token,
            'idkh': KhachHang.objects.filter(user_ptr_id=user.id).first().idkh
        }

        return response_data, "Login successful", status.HTTP_200_OK


class GetListKhachHangAPIView(APIView):
    @api_decorator
    def get(self, request):
        khachHang = KhachHang.objects.filter().order_by('-created_at')
        serializer = KhachHangGetListSerializer(khachHang, many=True)
        data = serializer.data
        return data, "Retrieve data successfully", status.HTTP_200_OK


class GetInfoKhachHangAPIView(APIView):
    @api_decorator
    def get(self, request, idkh):
        khachHang = KhachHang.objects.get(idkh=idkh)
        serializer = KhachHangGetListSerializer(khachHang)
        data = serializer.data
        return data, "Retrieve data successfully", status.HTTP_200_OK


class KhachHangDetailAPIView(APIView):
    @api_decorator
    def get(self, request, idkh):
        khachHang = KhachHang.objects.get(idkh=idkh)
        serializer = KhachHangGetListSerializer(khachHang)
        data = serializer.data
        return data, "Retrieve data successfully", status.HTTP_200_OK


class RegisterKhachHangAPIView(APIView):
    permission_classes = (AllowAny,)

    @api_decorator
    def post(self, request):
        name = request.data.get('ho_ten', None)
        email = request.data.get('email', None)
        phone_number = request.data.get('phone_number', None)
        password1 = request.data.get('password1', None)
        password2 = request.data.get('password2', None)

        if not (phone_number and password1 and password2):
            return {}, "Missing required fields", status.HTTP_400_BAD_REQUEST

        send_log_email(request)
        phone_number = convert_phone_number(phone_number)

        if User.objects.filter(phone_number=phone_number).exists():
            return {}, "SĐT User already exists", status.HTTP_400_BAD_REQUEST
        elif User.objects.filter(email=email).exists():
            return {}, "Email already exists", status.HTTP_400_BAD_REQUEST

        if password1 != password2:
            return {}, "Mật khẩu không giống nhau", status.HTTP_400_BAD_REQUEST

        user = KhachHang.objects.create_user(phone_number=phone_number, email=email)

        user.set_password(password1)
        user.email = email
        user.ho_ten = name
        user.points = 1000
        user.generate_ma()
        user.save()

        response_data = {
            'phone_number': user.local_phone_number if hasattr(user, 'local_phone_number') else None,
            'name': user.ho_ten,
            'makh': user.ma_khach_hang,
            'email': user.email,
            'id': str(user.id),
            'is_active': user.is_active,
            'is_verify': user.is_verify,
            'is_staff': user.is_staff,
            'created_at': user.created_at,
            'token': user.token
        }

        return response_data, "Register successful", status.HTTP_201_CREATED


# Nhân Viên


class NhanVienLoginAPIView(APIView):
    permission_classes = (AllowAny,)

    @api_decorator
    def post(self, request):
        email = request.data.get('email', None)
        phone_number = request.data.get('phone_number', None)
        password = request.data.get('password', None)

        if not ((phone_number or email) and password):
            return {}, "Cần nhập đầy đủ thông tin", status.HTTP_400_BAD_REQUEST

        # send_log_email(request)

        user = None

        if "@" in phone_number:

            user = NhanVien.objects.filter(email=phone_number).first()
            if user and user.check_password(password):
                if NhanVien.objects.filter(email=phone_number).first():
                    phone = NhanVien.objects.filter(email=phone_number).first().phone_number
                    user = authenticate(phone_number=phone,
                                        password=password)
            else:
                user = None
        elif phone_number:
            phone_number = convert_phone_number(phone_number)
            user = authenticate(phone_number=phone_number, password=password)

        if user is None or not NhanVien.objects.filter(user_ptr_id=user.id):
            return {}, "Tài khoản hoặc mật khẩu không chính xác", status.HTTP_401_UNAUTHORIZED

        response_data = {
            'phone_number': user.local_phone_number if hasattr(user, 'local_phone_number') else None,
            'email': user.email if hasattr(user, 'email') else None,
            'id': str(user.id),
            'ho_ten': user.ho_ten,
            'is_active': user.is_active,
            'is_verify': user.is_verify,
            'is_staff': user.is_staff,
            'created_at': user.created_at,
            'token': user.token,
            'idnv': NhanVien.objects.filter(user_ptr_id=user.id).first().idnv
        }

        return response_data, "Login successful", status.HTTP_200_OK


class GetNhanVienInfoAPIView(APIView):
    permission_classes = (IsAuthenticated,)

    @api_decorator
    def get(self, request):
        phone_number = request.user.phone_number
        user = NhanVien.objects.get(phone_number=phone_number)

        serializer = NhanVienGetListSerializer(user)

        return serializer.data, "Retrieve data successfully", status.HTTP_200_OK


class RegisterNhanVienAPIView(APIView):
    permission_classes = (AllowAny,)

    @api_decorator
    def post(self, request):
        name = request.data.get('name', None)
        email = request.data.get('email', None)
        phone_number = request.data.get('phone_number', None)
        password1 = request.data.get('password1', None)
        password2 = request.data.get('password2', None)

        if not (phone_number and password1 and password2):
            return {}, "Missing required fields", status.HTTP_400_BAD_REQUEST

        send_log_email(request)
        phone_number = convert_phone_number(phone_number)

        if User.objects.filter(phone_number=phone_number).exists():
            return {}, "SĐT User already exists", status.HTTP_400_BAD_REQUEST
        elif User.objects.filter(email=email).exists():
            return {}, "Email already exists", status.HTTP_400_BAD_REQUEST

        if password1 != password2:
            return {}, "Mật khẩu không giống nhau", status.HTTP_400_BAD_REQUEST

        user = NhanVien.objects.create_user(phone_number=phone_number, email=email)

        user.set_password(password1)
        user.email = email
        user.ho_ten = name
        user.points = 1000
        user.generate_ma()
        user.save()

        response_data = {
            'phone_number': user.local_phone_number if hasattr(user, 'local_phone_number') else None,
            'name': user.ho_ten,
            'makh': user.ma_khach_hang,
            'email': user.email,
            'id': str(user.id),
            'is_active': user.is_active,
            'is_verify': user.is_verify,
            'is_staff': user.is_staff,
            'created_at': user.created_at,
            'token': user.token
        }

        return response_data, "Register successful", status.HTTP_201_CREATED

class ChangePWNhanVienAPIView(APIView):
    permission_classes = (IsAuthenticated,)

    @api_decorator
    def get(self, request):
        password = request.data.get('password')
        password1 = request.data.get('password1')
        password2 = request.data.get('password2')
        phone_number = request.user.phone_number
        user = NhanVien.objects.get(phone_number=phone_number)
        if not user.check_password(password):
            return {}, "Mật khẩu không chính xác", status.HTTP_400_BAD_REQUEST
        elif password1 == password2:
            user.password = password1
        else:
            return {}, "Mật khẩu không giống nhau", status.HTTP_400_BAD_REQUEST

        serializer = GetNhanVienInfoAPIView(user)
        user.save()
        return serializer.data, "Đổi mật khẩu thành công", status.HTTP_200_OK


class ForgotPWNhanVienAPIView(APIView):
    @api_decorator
    def post(self,request):
        email = request.data.get('email')
        password1 = request.data.get('password1')
        password2 = request.data.get('password2')
        otp = request.data.get('otp')

        nhanvien = NhanVien.objects.get(email=email)

        if nhanvien.OTP == otp:
            if password1 == password2:
                nhanvien.set_password(password1)
                nhanvien.save()
            return {}, "Mật khẩu không giống nhau", status.HTTP_400_BAD_REQUEST
        else:
            return {}, "OTP không đúng", status.HTTP_400_BAD_REQUEST

        return {}, "Khôi phục mật khẩu thành công", status.HTTP_200_OK

class UpdateKhachHangInfoAPIView(APIView):
        permission_classes = (IsAuthenticated,)
        @api_decorator
        def put(self, request):
            phone_number = request.user.phone_number

            if not KhachHang.objects.filter(phone_number=phone_number).exists():
                raise ValueError("Khách Hàng không tồn tại")

            user = KhachHang.objects.get(phone_number=phone_number)
            user.anh_dai_dien= request.data.get("anh_dai_dien")
            user.save()
            serializer = KhachHangUpdateSerializer(user, data=request.data, partial=True)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return serializer.data, "Cập nhật thành công", status.HTTP_200_OK


class UpdateKhachHangForMNAPIView(APIView):
    @api_decorator
    def put(self, request,idkh):
        if not KhachHang.objects.filter(idkh=idkh).exists():
            raise ValueError("Khách Hàng không tồn tại")

        user = KhachHang.objects.get(idkh=idkh)
        serializer = KhachHangUpdateSerializer(user, data=request.data, partial=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return serializer.data, "Cập nhật thành công", status.HTTP_200_OK