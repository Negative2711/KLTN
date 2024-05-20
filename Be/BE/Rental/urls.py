from .views import (RentalListAPIView,
                    RentalCreateAPIView,
                    RentalRelativeListAPIView,
                    RentalDetailAPIView,
                    RentalFilterListAPIView,
                    RentalListFromUserAPIView)

from django.urls import path

urlpatterns = [


    path("posts/", RentalListAPIView.as_view()),
    path("posts/<str:pk>/", RentalFilterListAPIView.as_view()),
    path("posts/relative/<str:pk>/", RentalRelativeListAPIView.as_view()),
    path("posts/user/<str:pk>/", RentalListFromUserAPIView.as_view()),

    path("post/detail/<str:pk>/", RentalDetailAPIView.as_view()),
    path("post/create/", RentalCreateAPIView.as_view()),

]
