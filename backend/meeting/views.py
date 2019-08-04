from django.shortcuts import render
from rest_framework import viewsets, status
from .models import Meeting, JoinedUser, Profile, Matching, KakaoChatting
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import MeetingSerializer, JoinSerializer, CurrentMeetingSerializer, CounterProfileSerializer, MatchingSerializer, ProfileSerializer
from django.contrib.auth.models import User
from django.contrib import auth
import random
from django.utils import timezone
from allauth.socialaccount.providers.kakao.views import KakaoOAuth2Adapter
from rest_auth.registration.views import SocialLoginView
import requests
import json
from django.shortcuts import redirect

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
        # for Debugging
        profile = User.objects.all().first().profile
        current_meeting = Meeting.objects.filter(meeting_time__gte=timezone.now()).order_by('meeting_time').first()
        joined_user = JoinedUser.objects.filter(meeting=current_meeting, profile=profile).last()

        if profile.is_male:
            matching = Matching.objects.filter(trial_time=3, joined_male=joined_user).first()
        else:
            matching = Matching.objects.filter(trial_time=3, joined_female=joined_user).last()


        if matching is not None:
            serializer = MatchingSerializer(matching)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def post(self, request, format=None):
        current_meeting = Meeting.objects.filter(meeting_time__gte=timezone.now()).order_by('meeting_time').first()
        cutline = current_meeting.cutline
        joined_users_male = list(JoinedUser.objects.filter(is_matched=False, profile__is_male=True, rank__lte=cutline))
        joined_users_female = list(JoinedUser.objects.filter(is_matched=False, profile__is_male=False, rank__lte=cutline))
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
        print(request.user)
        print(request.user.is_authenticated)
        # 미팅일자가 현재보다 미래인 경우 + 가장 빨리 디가오는 미팅 순으로 정렬해서 + 가장 앞에 있는 미팅일정 1개만 쿼리셋에 담기
        queryset = Meeting.objects.filter(meeting_time__gte=timezone.now()).order_by('meeting_time').first()
        if queryset is not None:
            serializer = CurrentMeetingSerializer(queryset)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def post(self, request, format=None):
        serializer = CurrentMeetingSerializer(data=request.data)
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
    # =========Just for test (START)=========
    user = User.objects.all().first() # 이후 테스트용
    # =========Just for test (END)=========
    # user = request.user
    my_profile = user.profile
    current_meeting = Meeting.objects.filter(meeting_time__gte=timezone.now()).order_by('meeting_time').first()
    joined_user = JoinedUser.objects.filter(profile=my_profile, meeting=current_meeting).first()

    def get(self, request, format=None):
        if self.my_profile is not None and self.current_meeting is not None:
            queryset = JoinedUser.objects.filter(profile=self.my_profile, meeting=self.current_meeting).first()
            serializer = JoinSerializer(queryset)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def post(self, request, format=None):
        if self.my_profile is not None and self.current_meeting is not None and self.joined_user is None:
            # TODO: 나중에는 토큰을 request로 받은 후, 토큰을 key로 profile을 찾아서 넣어야겠다.
            # TODO: 나중에는 rank를 넣어주고, 가져오기 위한 별도의 API를 만드는 게 나을 수 있겠다. 

            # 사용자와 같은 성별중 이미 Join완료한 안원수를 카운트함(이는 바로 직전에 Join한 사람의 rank이기도 함) 그리고 1을 더함
            my_ranking = JoinedUser.objects.filter(profile__is_male = self.my_profile.is_male).count() + 1

            new_join = {
                "profile": self.my_profile.id,
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
        # 참고로 매치여부 업뎃은 프론트에서 request.data안에 is_matched: True로 보내줘야할 듯함
        if self.my_profile is not None and self.current_meeting is not None and self.joined_user is not None:
            queryset = self.joined_user
            serializer = JoinSerializer(queryset, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, format=None):
        if self.my_profile is not None and self.current_meeting is not None and self.joined_user is not None:
            self.joined_user.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class CounterProfile(APIView):
    def get(self, request, format=None):
        # =========Just for test (START)=========
        user = User.objects.all().first()
        # =========Just for test (END)=========
        # user = request.user # request에 user가 있다고 가정하고. 그런데 session관리는 어떻게 해야하는지 고민 필요. 혹시 토큰으로?
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

class Profile(APIView):
    
    user = User.objects.all().first()
    my_profile = user.profile

    def get(self, request, format=None):
        queryset = self.my_profile
        if queryset is not None:
            serializer = ProfileSerializer(queryset)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)

    # Post는 User에서 구현하는 것으로!
    # def post(self, request, format=None):

    def patch(self, request, format=None):
        queryset = self.my_profile
        serializer = ProfileSerializer(queryset, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, format=None):
        if self.my_profile is not None:
            self.user.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
