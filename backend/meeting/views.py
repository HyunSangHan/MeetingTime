from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import MeetingSerializer, MatchingSerializer
from .models import Meeting, Matching, JoinedUser


class MeetingInfoView(viewsets.ModelViewSet):
    serializer_class = MeetingSerializer
    queryset = Meeting.objects.all()

class MatchingAPI(APIView):

    def post(self, request, format=None):
        # joined_users = JoinedUser.objects.filter(is_matched=False)
        # list_of_users = []
        # for users in joined_users:
        #     list_of_users.append(user)
        queryset = Matching.objects.filter()
        serializer = MatchingSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, format=None):
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
        serializer.save()
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.data, status=status.HTTP_200_OK)