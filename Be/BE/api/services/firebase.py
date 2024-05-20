from firebase_admin import messaging

import firebase_admin
from firebase_admin import credentials
from Notification.models import Notification

cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred)


# def send_push_notification(device_token, title, body,data,user):
#     try:
#         message = messaging.Message(
#             notification=messaging.Notification(
#                 title=title,
#                 body=body,
#
#             ),
#             data=data,
#
#             token=device_token,
#         )
#         response = messaging.send(message)
#         if response:
#             Notification.objects.create(title = title,body = body,
#                                         user = user,
#                                         route = data["router"],
#                                         index = data["index"],
#                                         typenoti = data["type"],
#                                         content_id=data["content_id"])
#
#         print("Successfully sent message:", response)
#     except Exception as e:
#         print("Error sending message:", str(e))