from django.urls import path
from .views import CityAPIView, VehicleAPIView, DemandAPIView, StatusAPIView, CurrentLocationAPIView, \
    VersionReleaseAPIView,UpdateVersionReleaseAPIView

urlpatterns = [
    path('locations/', CityAPIView.as_view()),
    path('vehicles/', VehicleAPIView.as_view()),
    path('demands/', DemandAPIView.as_view()),
    path('status/vehicle/', StatusAPIView.as_view()),
    path('locate/', CurrentLocationAPIView.as_view()),
    path('version/', VersionReleaseAPIView.as_view()),
    path('version/update/<str:pk>/', UpdateVersionReleaseAPIView.as_view()),

]
