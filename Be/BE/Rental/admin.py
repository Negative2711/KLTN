# Add the following code to include the Brand, Model, and RentalPost models in the Django admin site:
from .models import  BaiTimViec
from django.contrib import admin

admin.site.register(BaiTimViec)
