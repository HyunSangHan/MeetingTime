from django.shortcuts import render
from rest_framework import viewsets
from .serializers import MeetingMatchingSerializer
from .models import MeetingMatching


class MeetingInfoView(viewsets.ModelViewSet):
    serializer_class = MeetingMatchingSerializer
    queryset = MeetingMatching.objects.all()