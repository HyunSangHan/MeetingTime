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

class CurrentMatching(APIView):

    def post(self, request, format=None):
        joined_users_male = list(JoinedUser.objects.filter(is_matched=False, profile__is_male=True))
        joined_users_female = list(JoinedUser.objects.filter(is_matched=False, profile__is_male=False))
        numbers = list(range(len(joined_users_male)))
        random.shuffle(numbers)
        matched = list()

        for i in range(len(joined_users_male)):
            runned = 1
            while runned < 3:
                if joined_users_male[i].already_met_one != joined_users_female[numbers[0]].rank:
                    #matched.append
                    serializer = MatchingSerializer(Matching.objects.create(joined_male=joined_users_male[i], joined_female=joined_users_female[numbers[0]], trial_time=request.data.trial_time))
                    numbers[0].pop()
                    break
                else:
                    random.shuffle(numbers)
                    runned += 1

            if serializer.is_valid():
                serializer.save()
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.data, statuso=status.HTTP_201_CREATED)

    def patch(self, request, format=None):
        queryset = Matching.objects.filter(id=request.data.id)
        serializer = MatchingSerializer(queryset, data=request.data, partial=True)
        if serializer.is_greenlight_male and serializer.is_greenlight_female:
            matched_matching = {
                "kakao_chattingroom" = "kakao_chat_example/1"
            # kakao 채팅방을 최대 50개를 준비해놓고 ChattingRoom 이런 model에 저장해놓은 다음 filter 해서 할당되지 않은 첫번째
            # url을 할당하는 것도 괜찮을 것 같네요 (50개는 우리가 매주 admin으로 입력해놓고)
            }
            serializer = MatchingSerializer(queryset, data=matched_matching, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, format=None):
        if request.data.trail_time > 0:
            Matching.objects.filter(trail_time=request.data.trial_time, is_matched=False).delete()
        else:
            Matching.objects.all().delete()
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)