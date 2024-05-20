from django.db import models
import uuid
from Authentication.models import  KhachHang


class GiaoDich(models.Model):
    STATUS_CHOICES = (
        ('waiting', 'Chờ xác nhận'),
        ('process', 'Đang tiến hành'),
        ('successful', 'Thành công'),
        ('cancel', 'Hủy bỏ'),
    )

    TYPE_CHOICES = (
        ('single', 'Dùng lẻ'),
        ('rental', 'Từ bài đăng tìm việc'),
        ('booking', 'Từ bài thuê'),

    )
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    thoi_gian_lam_viec = models.DateField(null=True)
    trang_thai = models.CharField(max_length=20, choices=STATUS_CHOICES, default="Chờ xác nhận")
    gia_tri = models.IntegerField(default=0)
    ghi_chu = models.CharField(max_length=300, null=True)
    dia_chi_lam_viec = models.CharField(max_length=200,default="Hồ Chí Minh")
    khach_hang_thue = models.ForeignKey(KhachHang, on_delete=models.CASCADE, null=True)
    nhan_vien_thuc_hien = models.ForeignKey(KhachHang, on_delete=models.CASCADE, null=True,related_name="nhan_vien_lam")
    hinh_thuc_thanh_toan = models.CharField(max_length=20, default="Thu tiền tại nhà")
    loai_giao_dich = models.CharField(max_length=20, choices=TYPE_CHOICES, default="single")
    create_at = models.DateTimeField(auto_now=True,null=True)

    def __str__(self):
        return f'Giao dịch {self.trang_thai}'

#
# class ChiTietGiaoDich(models.Model):
#     id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
#     ten_dich_vu = models.CharField(max_length=250)
#     don_gia = models.IntegerField()
#     thue_VAT = models.IntegerField()
#     phu_thu = models.IntegerField()
#     ma_giao_dich = models.ForeignKey(GiaoDich, on_delete=models.CASCADE,null=False)
#
#     def __str__(self):
#         return f'{self.ten_dich_vu} có đơn gia {self.don_gia}'