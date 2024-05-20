from rest_framework import serializers

from Document.models import (CompanyDoc,HopDong,DichVu)



class GetCompanyDocListSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyDoc
        fields = '__all__'

class HopDongSerializer(serializers.ModelSerializer):
    class Meta:
        model = HopDong
        fields = '__all__'

class DichVuSerializer(serializers.ModelSerializer):
    class Meta:
        model = DichVu
        fields = '__all__'


