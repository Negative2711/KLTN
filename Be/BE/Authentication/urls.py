from django.urls import path

from Authentication.views import LoginAPIView, RegisterAPIView, VerifyUserView, GetUserInfoAPIView, \
    DeleteUserInfoAPIView, UpdateUserInfoAPIView

# khách hàng
from Authentication.views import (GetListKhachHangAPIView,GetInfoKhachHangAPIView,RegisterKhachHangAPIView
                                  ,GetKhachHangInfoAPIView,KhachHangLoginAPIView,
                                  ChangePWKhachHangAPIView,
                                  KhachHangDetailAPIView,
                                  UpdateKhachHangInfoAPIView,
                                  UpdateKhachHangForMNAPIView)



#Nhan Vien
from Authentication.views import (NhanVienLoginAPIView,GetNhanVienInfoAPIView,RegisterNhanVienAPIView,
                                  ForgotPWNhanVienAPIView,
                                  ChangePWNhanVienAPIView)
urlpatterns = [
    path("login/", LoginAPIView.as_view()),
    path("register/", RegisterAPIView.as_view()),
    path('user/verify/', VerifyUserView.as_view()),
    path('user/info/', GetUserInfoAPIView.as_view()),
    path('user/update/', UpdateUserInfoAPIView.as_view()),
    path('user/delete/', DeleteUserInfoAPIView.as_view()),

    # khách hàng
    path('khachhang/getlist/', GetListKhachHangAPIView.as_view()),
    path('khachhang/info/<str:idkh>/', GetInfoKhachHangAPIView.as_view()),
    path("khachhang/register/", RegisterKhachHangAPIView.as_view()),
    path('khachhang/info/', GetKhachHangInfoAPIView.as_view()),
    path("khachhang/login/", KhachHangLoginAPIView.as_view()),
    path("khachhang/detail/<str:idkh>/", KhachHangDetailAPIView.as_view()),
    path("khachhang/change-password/", ChangePWKhachHangAPIView.as_view()),
    path("khachhang/update-auth/", UpdateKhachHangInfoAPIView.as_view()),
    path("khachhang/update-nonauth/<str:idkh>/", UpdateKhachHangForMNAPIView.as_view()),







    #nhân viên
    path("nhanvien/login/", NhanVienLoginAPIView.as_view()),
    path("nhanvien/info/", GetNhanVienInfoAPIView.as_view()),
    path("nhanvien/register/", RegisterNhanVienAPIView.as_view()),
    path("nhanvien/change-password/", ChangePWNhanVienAPIView.as_view()),
    path("nhanvien/forgot/", ForgotPWNhanVienAPIView.as_view()),

]
