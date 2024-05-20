# # Add the following code to your admin.py file to include the BookingPost model in the Django admin site:
#
# from django.contrib import admin
# from .models import BookingPost
# from Authentication.models import User
# from unfold.admin import ModelAdmin
# from django.utils.translation import gettext_lazy as _
#
#
# @admin.register(BookingPost)
# class BookingPostAdmin(ModelAdmin):
#     list_display = (
#         'title', 'status', 'start_date', 'departure', 'price',
#         'vehicle', 'user', 'created_at')
#     search_fields = ('title', 'departure', 'destination', 'user__full_name')
#     list_filter = ('status', 'vehicle__name')
#     ordering = ('-created_at',)
#
#     fieldsets = (
#         (_('Booking Info'), {'fields': (
#             'title', 'detail', 'status', 'start_date', 'departure',
#             'price',
#             'vehicle', 'user')}),
#         (_('Date and Time'), {'fields': ('created_at',)}),
#     )
#
#     readonly_fields = ('created_at',)
