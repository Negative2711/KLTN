import uuid
from django.db import models
from Authentication.models import KhachHang


class BaiThue(models.Model):
    STATUS_CHOICES = (
        ('waiting', 'Chờ Xác Nhận'),
        ('processing', 'Đang Tiến Hành'),
        ('cancel', 'Hủy Bỏ'),
        ('done', 'Thành Công'),
    )

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    tieu_de = models.CharField(max_length=100,null=False)
    mo_ta_ngan = models.CharField(max_length=100, blank=True)
    chi_tiet = models.TextField()
    trang_thai = models.CharField(max_length=20, choices=STATUS_CHOICES, default="waiting")
    thoi_gian = models.DateField()
    gia = models.DecimalField(max_digits=10, decimal_places=2)
    khach_hang_id = models.ForeignKey(KhachHang,default=uuid.uuid4, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    da_duyet = models.BooleanField(default= False)
    dia_chi = models.CharField(max_length=100, default="Hồ Chí Minh")

    def __str__(self):
        return self.tieu_de

    def duyet_bai(self):
        self.da_duyet = True
        self.save()
    def tu_choi(self):
        self.da_duyet = False
        self.save()