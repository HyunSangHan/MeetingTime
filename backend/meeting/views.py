from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import MeetingSerializer, MatchingSerializer
from .models import Meeting, Matching, JoinedUser
import random


class MeetingInfoView(viewsets.ModelViewSet):
    serializer_class = MeetingSerializer
    queryset = Meeting.objects.all()

class MatchingAPI(APIView):

    def post(self, request, format=None):
        joined_users_male = list(JoinedUser.objects.filter(is_matched=False and is_female=False))
        joined_users_female = list(JoinedUser.objects.filter(is_matched=False and is_female=True))
        random.shuffle(joined_users_male)
        random.shuffle(joined_users_female)
        for i in range(len(joined_users_male)):
            serializer = MatchingSerializer(Matching.objects.create(joined_male=joined_users_male[i], joined_female=joined_users_female[i]))
            if serializer.is_valid():
                serializer.save()
            else
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def patch(self, request, format=None):
        queryset = Matching.objects.filter(id=request.data.id)
        serializer = MatchingSerializer(queryset)
        serializer.is_greenlight_male = request.data.is_greenlight_male
        serializer.is_greenlight_female = request.data.is_greenlight_female
        serializer.is_gift_male = request.data.is_gift_male
        serializer.is_gift_female = request.data.is_gift_female
        if serializer.is_greenlight_male and serializer.is_greenlight_female:
            serializer.kakao_chattingroom = "kakao_chat_example/1"
            # kakao 채팅방을 최대 50개를 준비해놓고 ChattingRoom 이런 model에 저장해놓은 다음 filter 해서 할당되지 않은 첫번째
            # url을 할당하는 것도 괜찮을 것 같네요 (50개는 우리가 매주 admin으로 입력해놓고)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.data, status=status.HTTP_200_OK)