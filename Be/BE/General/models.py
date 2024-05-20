import uuid
from django.db import models


class VersionRelease(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    version_ios = models.CharField(max_length=10, default="1.0.1")
    version_apk = models.CharField(max_length=10, default="1.0.1")
    url_ios   = models.CharField(max_length=200,default="templink")
    url_apk = models.CharField(max_length=200,default="templink")

    def __str__(self):
        return f"IOS {self.version_ios} - APK: {self.version_apk}"
