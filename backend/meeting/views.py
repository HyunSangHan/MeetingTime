from django.shortcuts import render
from rest_framework import viewsets, status
from .models import Meeting, JoinedUser, Profile, Matching, KakaoChatting
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import MeetingSerializer, JoinSerializer, MatchingSerializer, ProfileSerializer
from django.contrib.auth.models import User
from django.contrib import auth
import random
from datetime import timedelta
from django.utils import timezone
from allauth.socialaccount.providers.kakao.views import KakaoOAuth2Adapter
from rest_auth.registration.views import SocialLoginView
import requests
import json
from django.shortcuts import redirect

def print_example():
    now = timezone.now()
    meeting_time = now + timedelta(days=9)
    first_shuffle_time = now + timedelta(days=7)
    second_shuffle_time = first_shuffle_time + timedelta(seconds=60)
    third_shuffle_time = second_shuffle_time + timedelta(seconds=60)
    Meeting.objects.create(open_time=now, first_shuffle_time=first_shuffle_time, second_shuffle_time=second_shuffle_time, third_shuffle_time=third_shuffle_time, meeting_time=meeting_time, cutline=4)

def match_example():
    current_meeting = Meeting.objects.filter(meeting_time__gte=timezone.now()).order_by('meeting_time').first()
    cutline = current_meeting.cutline
    joined_users_male = list(JoinedUser.objects.filter(meeting=current_meeting, is_matched=False, profile__is_male=True, rank__lte=cutline))
    joined_users_female = list(JoinedUser.objects.filter(meeting=current_meeting, is_matched=False, profile__is_male=False, rank__lte=cutline))
    numbers = list(range(len(joined_users_male)))
    random.shuffle(numbers)

    for i in range(len(joined_users_male)):
        Matching.objects.create(joined_male=joined_users_male[i], joined_female=joined_users_female[numbers[0]], trial_time=1)
        joined_users_male[i].already_met_one = joined_users_female[numbers[0]].rank
        joined_users_female[numbers[0]].already_met_one = joined_users_male[i].rank
        joined_users_male[i].save()
        joined_users_female[numbers[0]].save()
        numbers.pop(0)
# class Example(APIView):
#     def post(self, requests, format=None):
#         Meeting.objects.create(open_time="2019-08-12T22:02:29+09:00", first_shuffle_time="2019-08-13T22:02:29+09:00", second_shuffle_time="2019-08-13T22:02:29+09:00", third_shuffle_time="2019-08-13T22:02:29+09:00", meeting_time="2019-09-10T22:02:29+09:00")

def logout(request):
    auth.logout(request)
    return redirect('http://localhost:3000/')

class KakaoLogin(SocialLoginView):
    adapter_class = KakaoOAuth2Adapter

class MeetingInfoView(viewsets.ModelViewSet):
    serializer_class = MeetingSerializer
    queryset = Meeting.objects.all()

class CurrentMatching(APIView):
    def get(self, request, format=None):
        my_profile = request.user.profile
        current_meeting = Meeting.objects.filter(meeting_time__gte=timezone.now()).order_by('meeting_time').first()
        joined_user = JoinedUser.objects.filter(meeting=current_meeting, profile=my_profile).last()
        if my_profile.is_male:
            matching = Matching.objects.filter(trial_time=1, joined_male=joined_user).last()
        else:
            matching = Matching.objects.filter(trial_time=1, joined_female=joined_user).last()

        if matching is not None:
            serializer = MatchingSerializer(matching)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def post(self, request, format=None):
        current_meeting = Meeting.objects.filter(meeting_time__gte=timezone.now()).order_by('meeting_time').first()
        cutline = current_meeting.cutline
        joined_users_male = list(JoinedUser.objects.filter(meeting=current_meeting, is_matched=False, profile__is_male=True, rank__lte=cutline))
        joined_users_female = list(JoinedUser.objects.filter(meeting=current_meeting, is_matched=False, profile__is_male=False, rank__lte=cutline))
        numbers = list(range(len(joined_users_male)))
        random.shuffle(numbers)

        for i in range(len(joined_users_male)):
            if request.data["trial_time"] == 1:
                Matching.objects.create(joined_male=joined_users_male[i], joined_female=joined_users_female[numbers[0]], trial_time=request.data["trial_time"])
                joined_users_male[i].already_met_one = joined_users_female[numbers[0]].rank
                joined_users_female[numbers[0]].already_met_one = joined_users_male[i].rank
                joined_users_male[i].save()
                joined_users_female[numbers[0]].save()
                numbers.pop(0)
            elif request.data["trial_time"] == 2:
                runned = 1
                while runned < 10:
                    if joined_users_male[i].already_met_one != joined_users_female[numbers[0]].rank:
                        Matching.objects.create(joined_male=joined_users_male[i], joined_female=joined_users_female[numbers[0]], trial_time=request.data["trial_time"])
                        joined_users_male[i].already_met_two = joined_users_female[numbers[0]].rank
                        joined_users_female[numbers[0]].already_met_two = joined_users_male[i].rank
                        joined_users_male[i].save()
                        joined_users_female[numbers[0]].save()
                        numbers.pop(0)
                        break
                    else:
                        random.shuffle(numbers)
                        runned += 1
            elif request.data["trial_time"] == 3:
                runned = 1
                while runned < 10:
                    if joined_users_male[i].already_met_two != joined_users_female[numbers[0]].rank:
                        Matching.objects.create(joined_male=joined_users_male[i], joined_female=joined_users_female[numbers[0]], trial_time=request.data["trial_time"])
                        joined_users_male[i].already_met_three = joined_users_female[numbers[0]].rank
                        joined_users_female[numbers[0]].already_met_three = joined_users_male[i].rank
                        joined_users_male[i].save()
                        joined_users_female[numbers[0]].save()
                        numbers.pop(0)
                        break
                    else:
                        random.shuffle(numbers)
                        runned += 1
            else:
                runned = 1
                while runned < 10:
                    if joined_users_male[i].already_met_three != joined_users_female[numbers[0]].rank:
                        Matching.objects.create(joined_male=joined_users_male[i], joined_female=joined_users_female[numbers[0]], trial_time=request.data["trial_time"])
                        numbers.pop(0)
                        break
                    else:
                        random.shuffle(numbers)
                        runned += 1

        queryset = Matching.objects.filter(trial_time=request.data["trial_time"], joined_male__meeting=current_meeting)
        serializer = MatchingSerializer(queryset, many=True)
        if queryset is not None:
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.data, status=status.HTTP_204_NO_CONTENT)

    def patch(self, request, format=None):
        queryset = Matching.objects.filter(id=request.data.id)
        
        serializer = MatchingSerializer(queryset, data=request.data, partial=True)

        if serializer.is_greenlight_male and serializer.is_greenlight_female:

            kakao_chattingroom_url = KakaoChatting.objects.filter(is_used=False).first()
            kakao_chattingroom_url.is_used = True
            kakao_chattingroom_url.save()
            successful_matching_data = {
                "kakao_chattingroom": kakao_chattingroom_url
            # kakao 채팅방을 최대 50개를 준비해놓고 ChattingRoom 이런 model에 저장해놓은 다음 filter 해서 할당되지 않은 첫번째
            # url을 할당하는 것도 괜찮을 것 같네요 (50개는 우리가 매주 admin으로 입력해놓고)
            }

            serializer = MatchingSerializer(queryset, data=successful_matching_data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

    def delete(self, request, format=None):
        if request.data["trial_time"] > 0:
            Matching.objects.filter(trial_time=request.data["trial_time"], is_matched=False).delete()
        else:
            Matching.objects.all().delete()
        return Response(status=status.HTTP_202_ACCEPTED)

class CurrentMeeting(APIView):
    def get(self, request, format=None):
        print(str(request.user) + "로그인성공여부:" + str(request.user.is_authenticated))
        # 미팅일자가 현재보다 미래인 경우 + 가장 빨리 디가오는 미팅 순으로 정렬해서 + 가장 앞에 있는 미팅일정 1개만 쿼리셋에 담기
        queryset = Meeting.objects.filter(meeting_time__gte=timezone.now()).order_by('meeting_time').first()
        if queryset is not None:
            serializer = MeetingSerializer(queryset)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def post(self, request, format=None):
        serializer = MeetingSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # 프론트에서 Join 시간이 종료되면 호출되며 cutline을 설정
    def patch(self, request, format=None):
        # current meeting 
        queryset = Meeting.objects.filter(meeting_time__gte=timezone.now()).order_by('meeting_time').first()
        
        # 남, 여 각각 미팅에 참여한 인원
        joined_male_last_rank = JoinedUser.objects.filter(profile__is_male=True).order_by('rank').last().rank
        joined_female_last_rank = JoinedUser.objects.filter(profile__is_male=False).order_by('rank').last().rank

        cutline = joined_male_last_rank if joined_male_last_rank > joined_female_last_rank else joined_female_last_rank
        

        # Serializer가 필요하지 않아보이므로 우선 queryset.save()로 구현 
        # 추후 Serializer로 통일하는 것이 좋을 것으로 판단되면 수정
        if cutline is not None:
            queryset.cutline = cutline
            queryset.save()
            return Response(status=status.HTTP_202_ACCEPTED)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class Join(APIView):
    current_meeting = Meeting.objects.filter(meeting_time__gte=timezone.now()).order_by('meeting_time').first()

    def get(self, request, format=None):
        my_profile = request.user.profile
        queryset = JoinedUser.objects.filter(profile=my_profile, meeting=self.current_meeting).last()
        if queryset is not None:
            serializer = JoinSerializer(queryset)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def post(self, request, format=None):
        my_profile = request.user.profile
        joined_user = JoinedUser.objects.filter(profile=my_profile, meeting=self.current_meeting).first()

        if my_profile is not None and self.current_meeting is not None and joined_user is None:
            # 사용자와 같은 성별중 이미 Join완료한 안원수를 카운트함(이는 바로 직전에 Join한 사람의 rank이기도 함) 그리고 1을 더함
            my_ranking = JoinedUser.objects.filter(profile__is_male = my_profile.is_male).count() + 1
            new_join = {
                "profile": my_profile.id,
                "meeting": self.current_meeting.id,
                "rank": my_ranking
            }
            serializer = JoinSerializer(data=new_join)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, format=None):
        my_profile = request.user.profile
        joined_user = JoinedUser.objects.filter(profile=my_profile, meeting=self.current_meeting).first()

        # 참고로 매치여부 업뎃은 프론트에서 request.data안에 is_matched: True로 보내줘야할 듯함
        if my_profile is not None and self.current_meeting is not None and joined_user is not None:
            queryset = joined_user
            serializer = JoinSerializer(queryset, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, format=None):
        my_profile = request.user.profile
        joined_user = JoinedUser.objects.filter(profile=my_profile, meeting=self.current_meeting).first()
        if my_profile is not None and self.current_meeting is not None and joined_user is not None:
            joined_user.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class CounterProfile(APIView):
    def get(self, request, format=None):
        my_profile = request.user.profile
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
            serializer = ProfileSerializer(queryset)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)

class Profile(APIView):
    def get(self, request, format=None):
        if request.user.is_authenticated:
            queryset = request.user.profile
            if queryset is not None:
                serializer = ProfileSerializer(queryset)
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(status=status.HTTP_404_NOT_FOUND)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)

    # models.py에서 user와 연동하여 profile을 만들어주고 있으므로 현재로선 Post 불필요
    # def post(self, request, format=None):

    def patch(self, request, format=None):
        queryset = request.user.profile
        serializer = ProfileSerializer(queryset, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, format=None):
        if request.user.profile is not None:
            request.user.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
