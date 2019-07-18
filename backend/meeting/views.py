from django.shortcuts import render
from rest_framework import viewsets, status
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import MeetingSerializer, CurrentMeetingSerializer
from .models import Meeting
from django.utils import timezone

class MeetingInfoView(viewsets.ModelViewSet):
    serializer_class = MeetingSerializer
    queryset = Meeting.objects.all()

class CurrentMeeting(APIView):
    def get(self, request, format=None):
        # 미팅일자가 현재보다 미래인 경우 + 가장 빨리 디가오는 미팅 순으로 정렬해서 + 가장 앞에 있는 미팅일정 1개만 쿼리셋에 담기 
        queryset = Meeting.objects.filter(meeting_time__gte=timezone.now()).order_by('meeting_time').first()
        serializer = CurrentMeetingSerializer(queryset)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, format=None):
        queryset = Meeting.objects.all()
        serializer = CurrentMeetingSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)