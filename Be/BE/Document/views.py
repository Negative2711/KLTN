from django.shortcuts import render
from rest_framework import status
from rest_framework.views import APIView

from Document.models import (CompanyDoc,HopDong)
from Document.serializers import (GetCompanyDocListSerializer,HopDongSerializer)
from ultis.api_helper import api_decorator


class GetCompanyDocListAPIView(APIView):
    @api_decorator
    def get(self, request,pk):
        vehicle = CompanyDoc.objects.filter(type=pk)
        serializer = GetCompanyDocListSerializer(vehicle, many=True)
        data = serializer.data
        data = sorted(data, key=lambda x: x['position'])
        return data, "Retrieve data successfully", status.HTTP_200_OK

# Tạo hợp đồng
class HopDongListAPIView(APIView):
    @api_decorator
    def get(self, request):
        try:
            hop_dongs = HopDong.objects.all()
            serializer = HopDongSerializer(hop_dongs, many=True)
            return serializer.data,"Retrieve data successfully", status.HTTP_200_OK
        except Exception as e:
            raise ValueError("Errorr")


## Tạo hợp đồng
class CreateHopDongAPIView():
    def post(self, request):
        try:
            serializer = HopDongSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return serializer.data, "Hop dong created successfully", status.HTTP_201_CREATED
            return serializer.errors, "Error", status.HTTP_400_BAD_REQUEST
        except Exception as e:
            return serializer.errors, "Error", status.HTTP_500_INTERNAL_SERVER_ERROR