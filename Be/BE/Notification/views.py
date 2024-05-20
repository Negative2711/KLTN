# views.py

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
#from firebase_admin import messaging

##from api.services.firebase import send_push_notification
from ultis.api_helper import api_decorator
from .serializers import NotificationSerializer
from .models import Notification
from django.db import transaction
from django.db.models import Q


class RegisterDeviceToken(APIView):
    permission_classes = [IsAuthenticated]

    @api_decorator
    def post(self, request, *args, **kwargs):
        user = self.request.user
        device_token = self.request.data.get('device_token')

        if device_token:
            user.device_token = device_token
            user.save()

            return {}, "Add token successfully", status.HTTP_200_OK
        else:
            return {}, "Device token is missing", status.HTTP_400_BAD_REQUEST


class DeleteDeviceToken(APIView):
    permission_classes = [IsAuthenticated]

    @api_decorator
    def delete(self, request, *args, **kwargs):
        user = self.request.user
        user.device_token = None
        user.save()

        return {}, "Remove token successfully", status.HTTP_200_OK


class SendPushNotification(APIView):
    permission_classes = [IsAuthenticated]

    @api_decorator
    def post(self, request, *args, **kwargs):
        user = self.request.user
        device_token = user.device_token

        title = self.request.data.get('title')
        body = self.request.data.get('body')

        if not title or not body:
            raise ValueError("Title/body is not empty")

        if device_token:
            data = {

                "router": "Tên route",
                "index": "0",
                "type": "Tên loại",
                "content_id": "45h45u4hu5"
            }
          ##  send_push_notification(device_token, title, body, data, user)
            # save noti
            notification_data = {
                'user': user.id,
                'title': title,
                'body': body,
                'is_read': False,
            }
            notification_serializer = NotificationSerializer(data=notification_data)
            if notification_serializer.is_valid():
                notification_serializer.save()
                return {}, "Push notification sent and saved successfully", status.HTTP_200_OK
            else:
                raise ValueError("Error saving notification data ")
            # end save noti

            # return {}, "Push notification successfully", status.HTTP_200_OK

        else:
            return {}, "Device token not found for this user", status.HTTP_400_BAD_REQUEST


class NotificationDetailView(APIView):
    permission_classes = [IsAuthenticated]

    @api_decorator
    def get(self, request, pk):
        queryset = Notification.objects.get(id=pk, user=request.user.id)
        queryset.mark_as_read()
        serializer = NotificationSerializer(queryset, context={'request': request})
        return serializer.data, "Read", status.HTTP_200_OK
class NotificationNotiDetailView(APIView):
    @api_decorator
    def get(self, request, pk):
        queryset = Notification.objects.get(id=pk)
        queryset.mark_as_read()
        serializer = NotificationSerializer(queryset, context={'request': request})
        return serializer.data, "Read", status.HTTP_200_OK


class NotiListByUser(APIView):
    permission_classes = [IsAuthenticated]

    @api_decorator
    def get(self, request):
        queryset = Notification.objects.filter(user=request.user.id)
        serializer = NotificationSerializer(queryset, many=True)
        return serializer.data, "Retrieve data successfully ", status.HTTP_200_OK


class NotiListReadsByUser(APIView):

    @api_decorator
    def get(self, request,id):
        queryset = Notification.objects.filter(Q(user=id) | Q(loai='All'))

        with transaction.atomic():
            for notification in queryset:
                notification.mark_as_read()

        serializer = NotificationSerializer(queryset, many=True)
        return serializer.data, "Read all notice", status.HTTP_200_OK


class CrateNewNotiView(APIView):
    @api_decorator
    def post(self, request):
        serializer = NotificationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return serializer.data,"Create Noti Successfull" ,status.HTTP_201_CREATED
        raise ValueError("Error saving notification data ")
