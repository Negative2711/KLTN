from django.urls import path

from Notification.views import RegisterDeviceToken, DeleteDeviceToken, SendPushNotification, NotificationDetailView, \
    NotiListByUser, \
CrateNewNotiView,NotificationNotiDetailView,NotiListReadsByUser

urlpatterns = [
    path('register/', RegisterDeviceToken.as_view()),
    path('delete/', DeleteDeviceToken.as_view()),
    path('push/', SendPushNotification.as_view()),
    path('detail/<str:pk>/', NotificationDetailView.as_view()),
    path('list/', NotiListByUser.as_view()),
    path('list/read/', NotiListReadsByUser.as_view()),

    ## Noti
    path('create/', CrateNewNotiView.as_view()),
    path('noti/detail/<str:pk>/', NotificationNotiDetailView.as_view()),
    path('notis/byUser/<str:id>/', NotiListReadsByUser.as_view()),



]
