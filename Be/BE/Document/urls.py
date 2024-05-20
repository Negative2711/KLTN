from django.urls import path

from Document.views import GetCompanyDocListAPIView

urlpatterns = [
    path('company/<str:pk>/', GetCompanyDocListAPIView.as_view()),
]