from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Meeting, Profile, Company, Matching, JoinedUser

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username']

class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ['name']

class MeetingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Meeting
        fields = '__all__'

class MatchingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Matching
        fields = '__all__'
    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['joined_male'] = JoinSerializer(instance.joined_male).data
        response['joined_female'] = JoinSerializer(instance.joined_female).data
        return response

class JoinSerializer(serializers.ModelSerializer):
    class Meta:
        model = JoinedUser
        fields = ['profile', 'rank', 'is_matched', 'meeting']
    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['profile'] = ProfileSerializer(instance.profile).data
        return response

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = (
            "image",
            "is_male",
            "age_range",
            "created_at",
            "last_login_at",
            "team_introduce",
            "last_intro_modified_at"
        )
    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['user'] = UserSerializer(instance.user).data
        response['company'] = CompanySerializer(instance.company).data
        return response