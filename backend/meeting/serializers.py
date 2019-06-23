from rest_framework import serializers
from .models import MeetingMatching

class MeetingMatchingSerializer(serializers.ModelSerializer):
    class Meta:
        model = MeetingMatching
        fields = '__all__'