import uuid
from django.db import models

from Authentication.models import User,KhachHang


class CompanyDoc(models.Model):
    STATUS_CHOICES = (
        ('base', 'Chung'),
        ('about', 'Giới thiệu'),
        ('terms', 'Điều khoản'),
    )
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    tieu_de = models.TextField(blank=True)
    mo_ta = models.TextField(blank=True)
    loai = models.TextField(max_length=100, choices=STATUS_CHOICES, default="base")
    position = models.IntegerField(default=1)

    def __str__(self):
        return self.tieu_de



#Hợp đồng
class HopDong(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    nguoi_lao_dong = models.ForeignKey(KhachHang, on_delete=models.CASCADE)
    cong_ty = models.CharField(max_length=100)
    ngay_ky = models.DateField()
    ngay_het_han = models.DateField()
    salary = models.DecimalField(max_digits=10, decimal_places=2)
    anh_hop_dong = models.ImageField(default="14")

    def __str__(self):
        return f"{self.nguoi_lao_dong.id}'s hợp đồng với phía công ty {self.cong_ty}"


# class DichVu(models.Model):
#     id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
#     ten_dich_vu = models.CharField(max_length=200)
#     don_gia = models.PositiveIntegerField()

