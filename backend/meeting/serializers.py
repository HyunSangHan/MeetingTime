from rest_framework import serializers
from .models import Meeting, Profile

class MeetingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Meeting
        fields = '__all__'

class CounterProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'