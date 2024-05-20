from rest_framework import serializers
from .models import GiaoDich
from Authentication.models import  KhachHang
from Authentication.serializers import  KhachHangGetListSerializer

class GiaoDichSerializer(serializers.ModelSerializer):
    khach_hang_thue = KhachHangGetListSerializer()
    nhan_vien_thuc_hien = KhachHangGetListSerializer()
    class Meta:
        model = GiaoDich
        fields = '__all__'
