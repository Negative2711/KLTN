from rest_framework import generics, status

from Authentication.models import User, KhachHang
from ultis.api_helper import api_decorator
from ultis.helper import CustomPagination
from .models import (
    BaiTimViec)
from .serializers import RentalCreateSerializer, BaiTimViecsSerializer, RentalDetailSerializer

from rest_framework.views import APIView


# Danh sách tất cả bài tìm việc có phân trang
class RentalListAPIView(APIView):
    @api_decorator
    def get(self, request):
        posts = BaiTimViec.objects.all().order_by('ngay_khoi_tao')
        serializer = BaiTimViecsSerializer(posts, many=True, context={'request': request})


        return serializer.data, "Retrieve data successfully", status.HTTP_200_OK


# Tạo một bài Tìm việc mới
class RentalCreateAPIView(APIView):
    @api_decorator
    def post(self, request):
        khach_hang_id = request.data.get('khach_hang', None)
        khach_hang = KhachHang.objects.filter(idkh=khach_hang_id).first()
        serializer = RentalCreateSerializer(data=request.data, context={'request': request})
        if serializer.is_valid(raise_exception=True):
            serializer.save(khach_hang=khach_hang)
            return serializer.data, "Create rental post successfully", status.HTTP_201_CREATED



# Chi tiết một bài Tìm việc
class RentalDetailAPIView(APIView):
    @api_decorator
    def get(self, request, pk):
        queryset = BaiTimViec.objects.get(id=pk)
        serializer = RentalDetailSerializer(queryset, context={'request': request})
        return serializer.data, "Retrieve data successfully", status.HTTP_200_OK
class RentalFilterListAPIView(APIView):
    @api_decorator
    def get(self, request, pk):
        posts = BaiTimViec.objects.filter().order_by('-created_at')

        paginator = CustomPagination()
        result_page = paginator.paginate_queryset(posts, request)
        serializer = BaiTimViecsSerializer(result_page, many=True, context={'request': request})
        data = paginator.get_paginated_response(serializer.data).data

        return data, "Retrieve data successfully", status.HTTP_200_OK


class RentalRelativeListAPIView(APIView):
    @api_decorator
    def get(self, request, pk):
        current_post = BaiTimViec.objects.get(id=pk)
        posts = BaiTimViec.objects.filter(location=current_post.location).order_by('-created_at')

        paginator = CustomPagination()
        result_page = paginator.paginate_queryset(posts, request)
        serializer = BaiTimViecsSerializer(result_page, many=True, context={'request': request})
        data = paginator.get_paginated_response(serializer.data).data

        return data, "Retrieve data successfully", status.HTTP_200_OK


class RentalListFromUserAPIView(APIView):
    @api_decorator
    def get(self, request, pk):
        user = User.objects.get(id=pk)
        posts = BaiTimViec.objects.filter(user=user).order_by('-created_at')

        paginator = CustomPagination()
        result_page = paginator.paginate_queryset(posts, request)
        serializer = BaiTimViecsSerializer(result_page, many=True, context={'request': request})
        data = paginator.get_paginated_response(serializer.data).data

        return data, "Retrieve data successfully", status.HTTP_200_OK



