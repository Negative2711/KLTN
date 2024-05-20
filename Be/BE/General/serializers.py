from rest_framework import serializers
from .models import Location, Vehicle, Demand, VehicleStatus, VersionRelease


class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = '__all__'


class VehicleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vehicle
        fields = '__all__'


class DemandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Demand
        fields = '__all__'


class StatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = VehicleStatus
        fields = '__all__'


class VersionReleaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = VersionRelease
        fields = '__all__'
