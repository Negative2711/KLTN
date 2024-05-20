from django.core.exceptions import ValidationError
from rest_framework import serializers

from Authentication.models import User, KhachHang,NhanVien
from ultis.helper import validate_image_format


# Normal user
class LoginSerializer(serializers.Serializer):
    phone_number = serializers.CharField()
    email = serializers.CharField()


class VerifyOTPSerializer(serializers.Serializer):
    otp = serializers.CharField()


class VerifyUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'full_name',
            'gender',
            'date_of_birth',
            'doc_id',
            'date_issued',
            'date_expired',
            'place_issued',
            'hometown',
            'permanent_address',
            'nationality',
            'front_id_image',
            'back_id_image',
        )

    def validate(self, data):
        validate_image_format(data['front_id_image'])
        validate_image_format(data['back_id_image'])
        return data


# Admin user
class CreateAdminUserSerializer(serializers.Serializer):
    full_name = serializers.CharField()
    phone_number = serializers.CharField()
    email = serializers.CharField()


class AdminUserLoginSerializer(serializers.Serializer):
    phone_number = serializers.CharField()
    password = serializers.CharField()


class UpdateAdminPasswordSerializer(serializers.Serializer):
    new_password = serializers.CharField()
    renew_password = serializers.CharField()


class ResetAdminPasswordSerializer(serializers.Serializer):
    phone_number = serializers.CharField()


class GetUserInfoSerializer(serializers.ModelSerializer):
    local_phone_number = serializers.CharField()
    created_at = serializers.DateTimeField(format="%d/%m/%Y %H:%M:%S", read_only=True)

    class Meta:
        model = User
        exclude = (
                   'is_superuser',
                   'groups',
                   'user_permissions',
                   'updated_at',
                   )



    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['phone_number'] = data['local_phone_number']
        data.pop('local_phone_number', None)

        return data


class GetKhachHangInfoSerializer(serializers.ModelSerializer):
    local_phone_number = serializers.CharField()
    created_at = serializers.DateTimeField(format="%d/%m/%Y %H:%M:%S", read_only=True)

    class Meta:
        model = KhachHang
        exclude = (

            'user_permissions',
            'groups'
        )

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['phone_number'] = data['local_phone_number']

        data['anh_dai_dien'] = "https://"+ data['anh_dai_dien'][10:]
        data.pop('local_phone_number', None)


        return data


class UpdateUserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'avatar',
            'gender',
            'full_name',
            'date_of_birth',
            'permanent_address',
            'nationality',
        )

    def validate(self, data):
        if 'avatar' in data:
            validate_image_format(data['avatar'])
        return data





# Khách hàng
class KhachHangGetListSerializer(serializers.ModelSerializer):

    class Meta:
        model = KhachHang
        exclude = ['password','last_login','is_superuser','groups','user_permissions']

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['anh_dai_dien'] = "https://"+ data['anh_dai_dien'][10:]
        return data


class KhachHangUpdateSerializer(serializers.ModelSerializer):
    anh_dai_dien_url = serializers.URLField(source='anh_dai_dien', required=False)

    class Meta:
        model = KhachHang
        exclude = ['password', 'last_login', 'is_superuser', 'groups', 'user_permissions']

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['anh_dai_dien'] = "https://" + data['anh_dai_dien'][10:]
        return data

class NhanVienGetListSerializer(serializers.ModelSerializer):
    class Meta:
        model = NhanVien
        exclude = ['password','last_login','is_superuser','groups','user_permissions']

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['anh_dai_dien'] = "https://"+ data['anh_dai_dien'][10:]
        return data
