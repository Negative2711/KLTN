import uuid
import secrets
from functools import partial

import jwt
import random
import string
from datetime import datetime, timedelta

from django.core.validators import MinValueValidator, MaxValueValidator
from django.db.models.signals import pre_save

from django.contrib.auth.hashers import make_password

from django.dispatch import receiver
from django.conf import settings
from django.contrib.auth.models import (
    AbstractBaseUser, BaseUserManager, PermissionsMixin,
)
from django.db import models
from phonenumber_field.modelfields import PhoneNumberField


from ultis.helper import custom_user_image_path


class User(AbstractBaseUser, PermissionsMixin):
    class CustomUserManager(BaseUserManager):
        def create_user(self, phone_number,email, **extra_fields):
            if not phone_number:
                raise ValueError('User must have a phone number.')
            user = None
            if phone_number:
                user = self.model(phone_number=phone_number, **extra_fields)
            elif email:
                user = self.model(email=email, **extra_fields)

            user.set_password(extra_fields.get('password', secrets.token_urlsafe(6)))
            user.save()
            return user

        def create_superuser(self, phone_number, **extra_fields):
            user = self.create_user(phone_number, **extra_fields, )
            user.is_superuser = True
            user.is_staff = True
            user.save()
            return user


    avatar_image_path = partial(custom_user_image_path, path="avatar")

    # Base
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    phone_number = PhoneNumberField(unique=True, db_index=True)
    email = models.CharField(max_length=100, blank=True)
    is_active = models.BooleanField(default=True)
    is_verify = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = 'phone_number'

    objects = CustomUserManager()

    # Kyc
    GENDER_CHOICES = (
        ('Male', 'Nam'),
        ('Female', 'Nữ'),
        ('Unknown', 'Không xác định'),
    )
    ho_ten = models.CharField(max_length=200, blank=True)
    gioi_tinh = models.CharField(max_length=7, choices=GENDER_CHOICES, default='Unknown')
    ngay_sinh = models.DateField(null=True)
    ngay_khoi_tao = models.DateField(null=True)
    date_expired = models.DateField(null=True)
    place_issued = models.CharField(max_length=200, blank=True)
    dia_chi = models.CharField(max_length=200, blank=True)
    anh_dai_dien = models.ImageField(default='res.cloudinary.com/dtwy0ch1a/image/upload/v1712333902/avatarDefault.png')


    # Notification
    device_token = models.CharField(max_length=200, blank=True, null=True)

    def __str__(self):
        return self.ho_ten if len(self.ho_ten) > 0 else self.local_phone_number

    @property
    def local_phone_number(self):
        return str(self.phone_number).replace('+84', '0')

    @property
    def token(self):
        return self._generate_jwt_token()

    @property
    def new_password(self):
        new_pwd = secrets.token_urlsafe(6)
        self.set_password(new_pwd)
        self.save()
        return new_pwd

    def _generate_jwt_token(self):
        dt = datetime.now() + timedelta(days=60)

        token = jwt.encode({
            'id': str(self.pk),
            'exp': int(dt.timestamp())
        }, settings.SECRET_KEY, algorithm='HS256')

        return token



class OTP(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    code = models.CharField(max_length=6, blank=True)
    log = models.TextField(blank=True)
    active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now=True)

    @property
    def expires_at(self):
        return self.created_at + timedelta(minutes=15)

    @classmethod
    def generate_otp(cls):
        return ''.join(random.choices(string.digits, k=6))


class KhachHang(User):
    idkh = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    ma_khach_hang = models.CharField(max_length=100)

    def __str__(self):
        return f'{self.ho_ten}'

    def generate_ma(self):
        # Sinh ra 6 số ngẫu nhiên từ 0 đến 9
        so_ngau_nhien = ''.join(str(random.randint(0, 9)) for _ in range(6))

        # Kết hợp chuỗi 'KH' với 6 số ngẫu nhiên
        self.ma_khach_hang = 'KH' + so_ngau_nhien


class UserReview(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    cua_khach_hang = models.ForeignKey(KhachHang, related_name='user_reviews', on_delete=models.CASCADE)
    cho_khach_hang = models.ForeignKey(KhachHang, related_name='user_nhan_reviews', on_delete=models.CASCADE)
    danh_gia = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    nhan_xet = models.CharField(max_length=200)
    ngay_tao = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Review for {self.cua_khach_hang} - Đánh giá: {self.cho_khach_hang}"


@receiver(pre_save, sender=OTP)
def generate_otp(sender, instance, **kwargs):
    if not instance.code:
        instance.code = ''.join(random.choices(string.digits, k=6))




class NhanVien(User):
    idnv = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    ma_nhan_vien = models.CharField(max_length=100)
    def __str__(self):
        return  self.ho_ten
    def generate_ma(self):
        # Sinh ra 6 số ngẫu nhiên từ 0 đến 9
        so_ngau_nhien = ''.join(str(random.randint(0, 9)) for _ in range(6))

        # Kết hợp chuỗi 'KH' với 6 số ngẫu nhiên
        self.ma_khach_hang = 'NV' + so_ngau_nhien

    def pre_save(self):
        print('Hello')


@receiver(pre_save, sender=NhanVien)
def hash_password(sender, instance, **kwargs):
    # Only hash the password if it's been changed or it's a new user
    if not instance.pk or instance._state.adding or instance.password != sender.objects.get(pk=instance.pk).password:
        instance.set_password(instance.password)

@receiver(pre_save, sender=User)
def hash_password(sender, instance, **kwargs):
    # Only hash the password if it's been changed or it's a new user
    if not instance.pk or instance._state.adding or instance.password != sender.objects.get(pk=instance.pk).password:
        instance.set_password(instance.password)
@receiver(pre_save, sender=KhachHang)
def hash_password(sender, instance, **kwargs):
    # Only hash the password if it's been changed or it's a new user
    if not instance.pk or instance._state.adding or instance.password != sender.objects.get(pk=instance.pk).password:
        instance.set_password(instance.password)


