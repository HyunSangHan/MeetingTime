from django.shortcuts import render
from rest_framework import viewsets
from .serializers import MeetingSerializer
from .models import Meeting


class MeetingInfoView(viewsets.ModelViewSet):
    serializer_class = MeetingSerializer
    queryset = Meeting.objects.all()