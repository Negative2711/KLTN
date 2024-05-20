from django.urls import path
from .views import BookingListAPIView, BookingFilterListAPIView, CreateBookingAPIView, BookingDetailAPIView, \
    BookingByUserListAPIView,BookingListByKhachHangAPIView,BookingApproveAPIView,BookingrefuseAPIView

urlpatterns = [
    path('posts/', BookingListAPIView.as_view()),
    path('posts/<uuid:pk>/', BookingFilterListAPIView.as_view()),
    path('post/create/', CreateBookingAPIView.as_view()),
    path("post/detail/<str:pk>/", BookingDetailAPIView.as_view()),
    path("post/user/<str:pk>/", BookingByUserListAPIView.as_view()),


    #duyệt bài Approve
    path('post/approve/<str:pk>/', BookingApproveAPIView.as_view()),
    path('post/refuse/<str:pk>/', BookingrefuseAPIView.as_view()),
    path('posts/bykhachhang/<str:idkh>/', BookingListByKhachHangAPIView.as_view()),

]