
from rest_framework import generics
from rest_framework.views import APIView

from ultis.api_helper import api_decorator
from .models import GiaoDich
from .serializers import GiaoDichSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from ultis.api_helper import api_decorator

from django.db.models import Q




class ListCreateGiaoDichView(generics.ListCreateAPIView):
    queryset = GiaoDich.objects.all()
    serializer_class = GiaoDichSerializer

class DetailUpdateGiaoDichView(generics.RetrieveUpdateDestroyAPIView):
    queryset = GiaoDich.objects.all()
    serializer_class = GiaoDichSerializer


class ListGetGiaoDichByKHIDAPIView(APIView):
    @api_decorator
    def get(self, request,id):
        queryset = GiaoDich.objects.filter(Q(khach_hang_thue=id) | Q( nhan_vien_thuc_hien=id))
        serializer = GiaoDichSerializer(queryset, many=True)
        return serializer.data, "Get Giao Gich By khach id Successfull", status.HTTP_200_OK


class ThongKeAPIView(APIView):
    @api_decorator
    def get(self):
        pass
