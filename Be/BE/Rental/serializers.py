from datetime import datetime

from rest_framework import serializers

from Authentication.models import User, UserReview
from Authentication.serializers import KhachHangGetListSerializer
from ultis.api_helper import format_time_difference
from ultis.helper import is_valid_image, create_image_array
from .models import BaiTimViec






class BaiTimViecsSerializer(serializers.ModelSerializer):
    # nó sẽ hiển thị trường đơn giản thay vì cả một objec json
    khach_hang_id = KhachHangGetListSerializer()
    ngay_khoi_tao = serializers.DateTimeField(format="%d/%m/%Y %H:%M:%S", read_only=True)

    class Meta:
        model = BaiTimViec
        fields = '__all__'

    def to_representation(self, instance):
        data = super().to_representation(instance)
        return data


class RentalCreateSerializer(serializers.ModelSerializer):
    vehicle = serializers.StringRelatedField()
    user = serializers.StringRelatedField()
    created_at = serializers.DateTimeField(format="%d/%m/%Y %H:%M:%S", read_only=True)

    class Meta:
        model = BaiTimViec
        fields = '__all__'

    def to_representation(self, instance):
        data = super().to_representation(instance)
        return create_image_array(data, instance)


class UserReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserReview
        fields = ['rating', 'feedback']  # '__all__'


class UserSerializer(serializers.ModelSerializer):
    user_review = UserReviewSerializer(many=True, read_only=True, source='user_reviews')
    local_phone_number = serializers.CharField()

    class Meta:
        model = User
        fields = ['id', 'full_name', 'local_phone_number','account_type','user_review','avatar']  # '__all__'

    def to_representation(self, instance):
        data = super().to_representation(instance)
        rating_lst = [x['rating'] for x in data['user_review']]
        rating_count = len(rating_lst)
        rating_avg_score = round(sum(rating_lst) / len(rating_lst),1) if rating_count else 0

        data['phone_number'] = data['local_phone_number']
        data.pop('local_phone_number', None)

        data['user_review'] = {
            "rating_avg_score": rating_avg_score,
            "rating_count": rating_count,
        }
        data['is_online'] = 'true'

        return data


class RentalDetailSerializer(serializers.ModelSerializer):
    khach_hang = serializers.StringRelatedField()
    ngay_khoi_tao = serializers.DateTimeField(format="%d/%m/%Y %H:%M:%S", read_only=True)

    class Meta:
        model = BaiTimViec
        fields = '__all__'

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['thoi_gian_dang'] = format_time_difference(datetime.strptime(data['ngay_khoi_tao'], "%d/%m/%Y %H:%M:%S"),
                                                  datetime.now())
        return create_image_array(data, instance)
