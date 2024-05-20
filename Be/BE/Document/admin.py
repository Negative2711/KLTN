from django.contrib import admin
from .models import HopDong,CompanyDoc

# Đăng ký model vào trang quản trị
admin.site.register(HopDong)
admin.site.register(CompanyDoc)
