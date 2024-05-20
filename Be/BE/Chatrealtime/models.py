from django.db import models
from Authentication.models import  User


class Conversation(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='conversations')
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Conversation {self.id}'

    class Meta:
        ordering = ['-timestamp']

class Message(models.Model):
    conversation = models.ForeignKey(Conversation, on_delete=models.CASCADE, related_name='messages')
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_messages')
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Message from {self.sender.username} in conversation {self.conversation.id}'

    class Meta:
        ordering = ['timestamp']
