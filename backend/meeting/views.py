from django.shortcuts import render
from rest_framework import viewsets, status
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from .serializers import MeetingSerializer, CounterProfileSerializer
from django.contrib.auth.models import User
from .models import Meeting, JoinedUser, Profile, Matching
from django.utils import timezone

class MeetingInfoView(viewsets.ModelViewSet):
    serializer_class = MeetingSerializer
    queryset = Meeting.objects.all()

class CounterProfile(APIView):
    def get(self, request, format=None):
        # =========Just for test (START)=========
        user = User.objects.get(username="user_male")
        # =========Just for test (END)=========
        # user = request.data.user # request에 user가 있다고 가정하고. 그런데 session관리는 어떻게 해야하는지 고민 필요. 혹시 토큰으로?
        my_profile = user.profile
        current_meeting = Meeting.objects.filter(meeting_time__gte=timezone.now()).order_by('meeting_time').first()
        joined_user = JoinedUser.objects.filter(profile=my_profile, meeting=current_meeting).first()

        if my_profile.is_male:
            current_matching = Matching.objects.filter(joined_male=joined_user).last()
            counter_joined_user = current_matching.joined_female
        else:
            current_matching = Matching.objects.filter(joined_female=joined_user).last()
            counter_joined_user = current_matching.joined_male

        if my_profile is not None and current_meeting is not None and current_matching is not None and counter_joined_user is not None:
            queryset = counter_joined_user.profile
            serializer = CounterProfileSerializer(queryset)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)