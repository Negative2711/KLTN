from datetime import datetime

from rest_framework import serializers
from Authentication.models import User,KhachHang
from Bidding.models import Proposal
from Authentication.serializers import KhachHangGetListSerializer
from ultis.api_helper import format_time_difference
from .models import BaiThue


class ProposalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Proposal
        fields = '__all__'
class CreateBookingSerializer(serializers.ModelSerializer):
    vehicle = serializers.StringRelatedField()
    user = serializers.StringRelatedField()
    vehicle_status = serializers.StringRelatedField()

    class Meta:
        model = BaiThue
        fields = '__all__'

class BookingListSerializer(serializers.ModelSerializer):

    khach_hang_id = KhachHangGetListSerializer()
    created_at = serializers.DateTimeField(format="%d/%m/%Y %H:%M:%S", read_only=True)

    class Meta:
        model = BaiThue
        fields = '__all__'

    def to_representation(self, instance):
        data = super().to_representation(instance)
        return data





class UserSerializer(serializers.ModelSerializer):
    local_phone_number = serializers.CharField()

    class Meta:
        model = User
        fields = ['full_name', 'avatar', 'local_phone_number']

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['phone_number'] = data['local_phone_number']
        data.pop('local_phone_number', None)

        return data


class BookingDetailSerializer(serializers.ModelSerializer):
    khach_hang_id = KhachHangGetListSerializer()
    created_at = serializers.DateTimeField(format="%d/%m/%Y %H:%M:%S", read_only=True)

    class Meta:
        model = BaiThue
        fields = '__all__'

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['time_ago'] = format_time_difference(datetime.strptime(data['created_at'], "%d/%m/%Y %H:%M:%S"),
                                                  datetime.now())

        return data
