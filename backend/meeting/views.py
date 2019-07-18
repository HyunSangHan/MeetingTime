from django.shortcuts import render
from rest_framework import viewsets, status
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from .serializers import MeetingSerializer, CurrentMeetingSerializer, JoinSerializer
from django.contrib.auth.models import User
from .models import Meeting, JoinedUser, Profile
from django.utils import timezone

class MeetingInfoView(viewsets.ModelViewSet):
    serializer_class = MeetingSerializer
    queryset = Meeting.objects.all()

class Join(APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        user = request.data.user #request에 user가 있다고 가정하고. 그런데 session관리는 어떻게 해야하는지 고민 필요
        profile = user.profile
        meeting = Meeting.objects.filter(meeting_time__gte=timezone.now()).order_by('meeting_time').first()
        if profile is not None and meeting is not None:
            queryset = JoinedUser.objects.get(profile=profile, meeting=meeting)
            serializer = JoinSerializer(queryset)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            raise Http404

    #json parser 필요 예상
    def post(self, request, format=None):
        user = request.data.user #request에 user가 있다고 가정하고. 그런데 session관리는 어떻게 해야하는지 고민 필요
        my_profile = user.profile
        current_meeting = Meeting.objects.filter(meeting_time__gte=timezone.now()).order_by('meeting_time').first()
        joined_user = JoinedUser.objects.filter(profile=my_profile, meeting=current_meeting).first()

        #사용자와 같은 성별중 이미 Join완료한 안원수를 카운트함(이는 바로 직전에 Join한 사람의 rank이기도 함) 그리고 1을 더함
        my_ranking = JoinedUser.objects.filter(profile__is_male = my_profile.is_male).count() + 1

        if my_profile is not None and current_meeting is not None and joined_user is None:
            joined_user = JoinedUser.objects.create(profile=my_profile, meeting=current_meeting, rank=my_ranking)
            return Response(joined_user, status=status.HTTP_201_CREATED)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)


    def put(self, request, format=None):
        my_profile = user.profile
        current_meeting = Meeting.objects.filter(meeting_time__gte=timezone.now()).order_by('meeting_time').first()
        joined_user = JoinedUser.objects.filter(profile=my_profile, meeting=current_meeting).first()
        serializer = JoinSerializer(joined_user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        # 참고로 매치여부 업뎃은 프론트에서 request로 보내줘야할 듯함