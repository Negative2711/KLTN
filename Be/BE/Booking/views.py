
from django.db.models import Q

from Authentication.models import User,KhachHang
from rest_framework import status
from rest_framework.views import APIView

from ultis.api_helper import api_decorator
from ultis.helper import CustomPagination
from .models import BaiThue
from .serializers import BookingListSerializer, CreateBookingSerializer, BookingDetailSerializer


class BookingListAPIView(APIView):
    @api_decorator
    def get(self, request):
        posts = BaiThue.objects.filter().order_by('-created_at')

        serializer = BookingListSerializer(posts, many=True)
        data = serializer.data
        return data, "Retrieve data successfully", status.HTTP_200_OK

    @api_decorator
    def post(self, request):
        key = request.data["key"]
        value = request.data["value"]

        if key == "service":
            posts = BaiThue.objects.filter(demand__icontains=value).order_by('-created_at')
        elif key == "vehicle":
            posts = BaiThue.objects.filter(vehicle__name__icontains=value).order_by('-created_at')
        elif key == "location":
            posts = BaiThue.objects.filter(departure__icontains=value).order_by('-created_at')
        elif key == "price":
            tmp = value.split("#")
            min_price = int(tmp[0])
            max_price = int(tmp[1])
            posts = BaiThue.objects.filter(price__range=(min_price, max_price)).order_by('-created_at')

        paginator = CustomPagination()
        result_page = paginator.paginate_queryset(posts, request)
        serializer = BookingListSerializer(result_page, many=True)
        data = paginator.get_paginated_response(serializer.data).data
        return data, "Retrieve data successfully", status.HTTP_200_OK


class BookingFilterListAPIView(APIView):
    # @api_decorator
    # def get(self, request, pk):
    #     #posts = BaiThue.objects.filter(vehicle=vehicle).order_by('-created_at')
    #     paginator = CustomPagination()
    #    # result_page = paginator.paginate_queryset(posts, request)
    #     #serializer = BookingListSerializer(result_page, many=True)
    #    # data = paginator.get_paginated_response(serializer.data).data
        pass
       # return data, "Retrieve data successfully", status.HTTP_200_OK
class CreateBookingAPIView(APIView):
    @api_decorator
    def post(self, request):

        khach_hang_id = request.data.get('khach_hang_id', None)
        khach_hang = KhachHang.objects.get(idkh=khach_hang_id)
        serializer = CreateBookingSerializer(data=request.data, context={'request': request})
        if serializer.is_valid(raise_exception=True):
            serializer.save(khach_hang_id=khach_hang)
            data = serializer.data
            return data, "Create booking post successfully", status.HTTP_201_CREATED

class BookingByUserListAPIView(APIView):
    @api_decorator
    def get(self, request, pk):
        user = User.objects.get(id=pk)
        posts = BaiThue.objects.filter(user=user).order_by('-created_at')
        paginator = CustomPagination()
        result_page = paginator.paginate_queryset(posts, request)
        serializer = BookingListSerializer(result_page, many=True)
        data = paginator.get_paginated_response(serializer.data).data
        return data, "Retrieve data successfully", status.HTTP_200_OK





class BookingDetailAPIView(APIView):
    @api_decorator
    def get(self, request, pk):
        queryset = BaiThue.objects.get(id=pk)
        serializer = BookingDetailSerializer(queryset)
        return serializer.data, "Retrieve data successfully", status.HTTP_200_OK

class BookingListByKhachHangAPIView(APIView):
    @api_decorator
    def get(self, request):
        posts = BaiThue.objects.filter().order_by('-created_at')

        serializer = BookingListSerializer(posts, many=True)
        data = serializer.data
        return data, "Retrieve data successfully", status.HTTP_200_OK

    @api_decorator
    def get(self, request,idkh):
        khachhang = KhachHang.objects.get(idkh=idkh)
        posts = BaiThue.objects.filter(khach_hang_id=khachhang).order_by('-created_at')
        serializer = BookingListSerializer(posts, many=True)
        return serializer.data, "Retrieve data successfully", status.HTTP_200_OK

# approve Booking

class BookingApproveAPIView(APIView):
    @api_decorator
    def get(self, request, pk):
        baithue = BaiThue.objects.get(id=pk)
        baithue.duyet_bai()
        serializer = BookingDetailSerializer(baithue)
         # Gọi phương thức duyet_bai mà không truyền tham số
        return serializer.data, "Retrieve data successfully", status.HTTP_200_OK

class BookingrefuseAPIView(APIView):
    @api_decorator
    def get(self, request, pk):
        baithue = BaiThue.objects.get(id=pk)
        baithue.tu_choi()
        serializer = BookingDetailSerializer(baithue)
         # Gọi phương thức duyet_bai mà không truyền tham số
        return serializer.data, "Retrieve data successfully", status.HTTP_200_OK