from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),

    path('api/v1/auth/', include('Authentication.urls')),
    path('api/v1/rental/', include('Rental.urls')),
    path('api/v1/notication/', include('Notification.urls')),
    path('api/v1/booking/', include('Booking.urls')),
    path('api/v1/transaction/', include('Transaction.urls')),
    path('chat/', include('Chatrealtime.urls')),
]
