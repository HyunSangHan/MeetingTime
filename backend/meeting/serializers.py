from rest_framework import serializers
from .models import Meeting, JoinedUser

class MeetingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Meeting
        fields = '__all__'

class JoinSerializer(serializers.ModelSerializer):
    class Meta:
        model = JoinedUser
        fields = '__all__'