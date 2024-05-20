from django.db import models
import uuid
from Authentication.models import KhachHang


# Create your models here.


class Notification(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(KhachHang, on_delete=models.CASCADE, related_name='notifications', default= None ,null= True)
    tieu_de = models.TextField(max_length=80, blank=False)
    mota_ngan = models.TextField(max_length=80, blank=False)
    noi_dung = models.TextField(max_length=300, blank=False)
    ngay_tao = models.DateTimeField(auto_now_add=True)
    loai =  models.TextField(max_length=10,default="All",null= False)
    da_doc = models.BooleanField(default=False)

    def __str__(self):
        return self.tieu_de

    def mark_as_read(self):
        self.is_read = True
        self.save()
