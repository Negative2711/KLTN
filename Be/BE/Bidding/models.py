import uuid

from django.db import models

from Authentication.models import User, KhachHang
from Booking.models import BaiThue



class Proposal(models.Model):
    STATUS_CHOICES = (
        ('waiting', 'Chờ xác nhận'),
        ('process', 'Đang tiến hành'),
        ('successful', 'Thành công'),
        ('failed', 'Thất bại'),
    )

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    khach_hang = models.ForeignKey(KhachHang, default=uuid.uuid4, on_delete=models.CASCADE)
    bai_thue = models.ForeignKey(BaiThue, on_delete=models.CASCADE, null=True)
    gia = models.PositiveIntegerField()
    trang_thai = models.CharField(max_length=20, choices=STATUS_CHOICES, default="waiting")

    ngay_khoi_tao = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.id}"
