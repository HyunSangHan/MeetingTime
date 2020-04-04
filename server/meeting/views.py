from django.shortcuts import render
from rest_framework import viewsets, status
from .models import Meeting, Profile, Matching, JoinedUser, KakaoChatting, Validation, Company
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import MeetingSerializer, ProfileSerializer, MatchingSerializer, JoinSerializer, CompanySerializer
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
from django.core.mail import send_mail
import random

def meeting_example():
    now = timezone.now()
    print(now)
    meeting_time = now + timedelta(days=1) - timedelta(hours=3)
    close_time = now + timedelta(hours=1) + timedelta(minutes=10)
    first_shuffle_time = close_time + timedelta(seconds=120)
    second_shuffle_time = first_shuffle_time + timedelta(seconds=120)
    third_shuffle_time = second_shuffle_time + timedelta(seconds=120)
    last_result_time = third_shuffle_time + timedelta(seconds=120)
    Meeting.objects.create(open_time=now, close_time = close_time, first_shuffle_time=first_shuffle_time, second_shuffle_time=second_shuffle_time, third_shuffle_time=third_shuffle_time, last_result_time=last_result_time, meeting_time=meeting_time, cutline=4)
    # 일단 항상 cutline을 4로 만들긴 하는데 이건 join할 때마다 patch로 수정해줘야 할 것 같다
    # 매주 수금 10시에 생성, 하루 후 저녁 7시 미팅
    # 수금 11시 10분에 셔플, 11시 10분에 받기 종료
    # 2분마다 셔플

def match_example():
    current_meeting = Meeting.objects.all().order_by('meeting_time').last()
    if Meeting.objects.filter(meeting_time__gte=timezone.now()).order_by('meeting_time').first() is not None:
        current_meeting = Meeting.objects.filter(meeting_time__gte=timezone.now()).order_by('meeting_time').first()
    if timezone.now() < current_meeting.first_shuffle_time:
        trial_time = 1
    elif timezone.now() < current_meeting.second_shuffle_time:
        trial_time = 2
    elif timezone.now() < current_meeting.third_shuffle_time:
        trial_time = 3
    else:
        trial_time = 4
    cutline = current_meeting.cutline
    joined_users_male = list(JoinedUser.objects.filter(meeting=current_meeting, is_matched=False, profile__is_male=True, rank__lte=cutline))
    joined_users_female = list(JoinedUser.objects.filter(meeting=current_meeting, is_matched=False, profile__is_male=False, rank__lte=cutline))
    numbers = list(range(len(joined_users_male)))
    random.shuffle(numbers)
    print(len(joined_users_male))
    # 일단 확인용으로 넣어둠 (Meeting에 속해있는 유저가 없을 때 0)

    for i in range(len(joined_users_male)):
        if trial_time == 1:
            Matching.objects.create(joined_male=joined_users_male[i], joined_female=joined_users_female[numbers[0]], trial_time=trial_time)
            joined_users_male[i].already_met_first = joined_users_female[numbers[0]].rank
            joined_users_female[numbers[0]].already_met_first = joined_users_male[i].rank
            joined_users_male[i].save()
            joined_users_female[numbers[0]].save()
            numbers.pop(0)
        elif trial_time == 2:
            runned = 1
            while runned < 10:
                if joined_users_male[i].already_met_first != joined_users_female[numbers[0]].rank:
                    Matching.objects.create(joined_male=joined_users_male[i], joined_female=joined_users_female[numbers[0]], trial_time=trial_time)
                    joined_users_male[i].already_met_second = joined_users_female[numbers[0]].rank
                    joined_users_female[numbers[0]].already_met_second = joined_users_male[i].rank
                    joined_users_male[i].save()
                    joined_users_female[numbers[0]].save()
                    numbers.pop(0)
                    break
                elif runned == 9:
                    Matching.objects.create(joined_male=joined_users_male[i], joined_female=joined_users_female[numbers[0]], trial_time=trial_time)
                    joined_users_male[i].already_met_second = joined_users_female[numbers[0]].rank
                    joined_users_female[numbers[0]].already_met_second = joined_users_male[i].rank
                    joined_users_male[i].save()
                    joined_users_female[numbers[0]].save()
                    numbers.pop(0)
                    break
                else:
                    random.shuffle(numbers)                            
                    runned += 1    
                    
        elif trial_time:
            runned = 1
            while runned < 10:
                if joined_users_male[i].already_met_first != joined_users_female[numbers[0]].rank and joined_users_male[i].already_met_second != joined_users_female[numbers[0]].rank:
                    Matching.objects.create(joined_male=joined_users_male[i], joined_female=joined_users_female[numbers[0]], trial_time=trial_time)
                    joined_users_male[i].already_met_third = joined_users_female[numbers[0]].rank
                    joined_users_female[numbers[0]].already_met_third = joined_users_male[i].rank
                    joined_users_male[i].save()
                    joined_users_female[numbers[0]].save()
                    numbers.pop(0)
                    break
                elif runned == 9:
                    Matching.objects.create(joined_male=joined_users_male[i], joined_female=joined_users_female[numbers[0]], trial_time=trial_time)
                    joined_users_male[i].already_met_third = joined_users_female[numbers[0]].rank
                    joined_users_female[numbers[0]].already_met_third = joined_users_male[i].rank
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
                if joined_users_male[i].already_met_first != joined_users_female[numbers[0]].rank and joined_users_male[i].already_met_second != joined_users_female[numbers[0]].rank and joined_users_male[i].already_met_third != joined_users_female[numbers[0]].rank:
                    Matching.objects.create(joined_male=joined_users_male[i], joined_female=joined_users_female[numbers[0]], trial_time=trial_time)
                    numbers.pop(0)
                    break
                elif runned == 9:
                    Matching.objects.create(joined_male=joined_users_male[i], joined_female=joined_users_female[numbers[0]], trial_time=trial_time)
                    numbers.pop(0)
                    break
                else:
                    random.shuffle(numbers)
                    runned += 1
    

def logout(request):
    auth.logout(request)
    return redirect('http://localhost:3000/')


class Email(APIView):
    def post(self, request, format=None):
        try:
            Validation.objects.get(user=request.user).delete()
        except:
            pass
        code = random.randrange(100000,999999)
        send_mail(
            '이메일 인증',
            str(code),
            'gustkd3@gmail.com',
            # 발송자 이메일에는 일단 제 이메일을 넣어두었습니다.
            [request.data["email"]],
            fail_silently=False,
        )
        Validation.objects.create(user=request.user, code=code)

        return Response(status=status.HTTP_201_CREATED)


class SentValidation(APIView):
    def post(self, request, format=None):
        try:
            if request.user.validation.code == int(request.data['code']):
                user = request.user
                user.profile.validated = True
                user.profile.save()
                Validation.objects.get(user=user).delete()
                return Response(status=status.HTTP_202_ACCEPTED)
            else:
                return Response(status=status.HTTP_401_UNAUTHORIZED)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)


def success_matching():
    current_meeting = Meeting.objects.all().order_by('meeting_time').last()
    if Meeting.objects.filter(meeting_time__gte=timezone.now()).order_by('meeting_time').first() is not None:
        current_meeting = Meeting.objects.filter(meeting_time__gte=timezone.now()).order_by('meeting_time').first()
    matchings = Matching.objects.filter(joined_male__meeting=current_meeting)
    for match in matchings:
        if match.is_greenlight_male and match.is_greenlight_female and (not match.joined_male.is_matched or not match.joined_female.is_matched):
            kakao_chatting = KakaoChatting.objects.filter(is_used=False).first()
            match.joined_male.is_matched = True
            match.joined_male.save()
            match.joined_female.is_matched = True
            match.joined_female.save()
            match.kakao_chattingroom = kakao_chatting
            match.save()
            kakao_chatting.is_used = True
            kakao_chatting.save()


class KakaoLogin(SocialLoginView):
    adapter_class = KakaoOAuth2Adapter


class MeetingInfoView(viewsets.ModelViewSet):
    serializer_class = MeetingSerializer
    queryset = Meeting.objects.all()


class CurrentMatching(APIView):
    current_meeting = Meeting.objects.all().order_by('meeting_time').last()
    if Meeting.objects.filter(meeting_time__gte=timezone.now()).order_by('meeting_time').first() is not None:
        current_meeting = Meeting.objects.filter(meeting_time__gte=timezone.now()).order_by('meeting_time').first()

    if current_meeting is not None:
        if timezone.now() < current_meeting.first_shuffle_time:
            trial_time = 1
        elif timezone.now() < current_meeting.second_shuffle_time:
            trial_time = 2
        elif timezone.now() < current_meeting.third_shuffle_time:
            trial_time = 3
        else:
            trial_time = 4


    def get(self, request, format=None):
        current_meeting = Meeting.objects.all().order_by('meeting_time').last()
        if Meeting.objects.filter(meeting_time__gte=timezone.now()).order_by('meeting_time').first() is not None:
            current_meeting = Meeting.objects.filter(meeting_time__gte=timezone.now()).order_by('meeting_time').first()

        if current_meeting is not None:
            if timezone.now() < current_meeting.first_shuffle_time:
                trial_time = 1
            elif timezone.now() < current_meeting.second_shuffle_time:
                trial_time = 2
            elif timezone.now() < current_meeting.third_shuffle_time:
                trial_time = 3
            else:
                trial_time = 4

        my_profile = request.user.profile
        joined_user = JoinedUser.objects.filter(meeting=current_meeting, profile=my_profile).last()
        if my_profile.is_male:
            matching = Matching.objects.filter(trial_time=trial_time, joined_male=joined_user).last()
        else:
            matching = Matching.objects.filter(trial_time=trial_time, joined_female=joined_user).last()

        if matching is not None:
            serializer = MatchingSerializer(matching)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)


    def post(self, request, format=None):
        cutline = self.current_meeting.cutline
        joined_users_male = list(JoinedUser.objects.filter(meeting=self.current_meeting, is_matched=False, profile__is_male=True, rank__lte=cutline))
        joined_users_female = list(JoinedUser.objects.filter(meeting=self.current_meeting, is_matched=False, profile__is_male=False, rank__lte=cutline))
        numbers = list(range(len(joined_users_male)))
        random.shuffle(numbers)

        for i in range(len(joined_users_male)):
            if request.data["trial_time"] == 1:
                Matching.objects.create(joined_male=joined_users_male[i], joined_female=joined_users_female[numbers[0]], trial_time=request.data["trial_time"])
                joined_users_male[i].already_met_first = joined_users_female[numbers[0]].rank
                joined_users_female[numbers[0]].already_met_first = joined_users_male[i].rank
                joined_users_male[i].save()
                joined_users_female[numbers[0]].save()
                numbers.pop(0)
            elif request.data["trial_time"] == 2:
                runned = 1
                while runned < 10:
                    if joined_users_male[i].already_met_first != joined_users_female[numbers[0]].rank:
                        Matching.objects.create(joined_male=joined_users_male[i], joined_female=joined_users_female[numbers[0]], trial_time=request.data["trial_time"])
                        joined_users_male[i].already_met_second = joined_users_female[numbers[0]].rank
                        joined_users_female[numbers[0]].already_met_second = joined_users_male[i].rank
                        joined_users_male[i].save()
                        joined_users_female[numbers[0]].save()
                        numbers.pop(0)
                        break
                    elif runned == 9:
                        Matching.objects.create(joined_male=joined_users_male[i], joined_female=joined_users_female[numbers[0]], trial_time=request.data["trial_time"])
                        joined_users_male[i].already_met_second = joined_users_female[numbers[0]].rank
                        joined_users_female[numbers[0]].already_met_second = joined_users_male[i].rank
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
                    if joined_users_male[i].already_met_first != joined_users_female[numbers[0]].rank and joined_users_male[i].already_met_second != joined_users_female[numbers[0]].rank:
                        Matching.objects.create(joined_male=joined_users_male[i], joined_female=joined_users_female[numbers[0]], trial_time=request.data["trial_time"])
                        joined_users_male[i].already_met_third = joined_users_female[numbers[0]].rank
                        joined_users_female[numbers[0]].already_met_third = joined_users_male[i].rank
                        joined_users_male[i].save()
                        joined_users_female[numbers[0]].save()
                        numbers.pop(0)
                        break
                    elif runned == 9:
                        Matching.objects.create(joined_male=joined_users_male[i], joined_female=joined_users_female[numbers[0]], trial_time=request.data["trial_time"])
                        joined_users_male[i].already_met_third = joined_users_female[numbers[0]].rank
                        joined_users_female[numbers[0]].already_met_third = joined_users_male[i].rank
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
                    if joined_users_male[i].already_met_first != joined_users_female[numbers[0]].rank and joined_users_male[i].already_met_second != joined_users_female[numbers[0]].rank and joined_users_male[i].already_met_third != joined_users_female[numbers[0]].rank:
                        Matching.objects.create(joined_male=joined_users_male[i], joined_female=joined_users_female[numbers[0]], trial_time=request.data["trial_time"])
                        numbers.pop(0)
                        break
                    elif runned == 9:
                        Matching.objects.create(joined_male=joined_users_male[i], joined_female=joined_users_female[numbers[0]], trial_time=request.data["trial_time"])
                        numbers.pop(0)
                        break
                    else:
                        random.shuffle(numbers)
                        runned += 1

        queryset = Matching.objects.filter(trial_time=request.data["trial_time"], joined_male__meeting=self.current_meeting)
        serializer = MatchingSerializer(queryset, many=True)
        if queryset is not None:
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.data, status=status.HTTP_204_NO_CONTENT)


    def patch(self, request, format=None):

        my_profile = request.user.profile
        joined_user = JoinedUser.objects.get(profile=my_profile, meeting=self.current_meeting)
        if my_profile.is_male:
            queryset = Matching.objects.filter(joined_male=joined_user).last()
        else:
            queryset = Matching.objects.filter(joined_female=joined_user).last()
        serializer = MatchingSerializer(queryset, data=request.data, partial=True)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

        return Response(status=status.HTTP_400_BAD_REQUEST)


    def delete(self, request, format=None):
        if request.data["trial_time"] > 0:
            Matching.objects.filter(trial_time=request.data["trial_time"], is_matched=False).delete()
        else:
            Matching.objects.all().delete()
        return Response(status=status.HTTP_202_ACCEPTED)


class CurrentMeeting(APIView):
    def get(self, request, format=None):
        print(str(request.user) + "로그인성공여부:" + str(request.user.is_authenticated))
        queryset = Meeting.objects.all().order_by('meeting_time').last()
        # 미팅일자가 현재보다 미래인 경우 + 가장 빨리 디가오는 미팅 순으로 정렬해서 + 가장 앞에 있는 미팅일정 1개만 쿼리셋에 담기
        current_meeting = Meeting.objects.filter(meeting_time__gte=timezone.now()).order_by('meeting_time').first()
        if current_meeting is not None:
            queryset = current_meeting

        if queryset is not None:
            serializer = MeetingSerializer(queryset)
            return Response(serializer.data, status=status.HTTP_200_OK)

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
        current_meeting = Meeting.objects.filter(meeting_time__gte=timezone.now()).order_by('meeting_time').first()

        # 남, 여 각각 미팅에 참여한 인원
        joined_male_last_rank = JoinedUser.objects.filter(profile__is_male=True).order_by('rank').last().rank
        joined_female_last_rank = JoinedUser.objects.filter(profile__is_male=False).order_by('rank').last().rank
        cutline = joined_male_last_rank if joined_male_last_rank > joined_female_last_rank else joined_female_last_rank

        if cutline is not None:
            current_meeting.cutline = cutline
            current_meeting.save()
            return Response(status=status.HTTP_202_ACCEPTED)

        return Response(status=status.HTTP_400_BAD_REQUEST)


class Join(APIView):
    current_meeting = Meeting.objects.all().order_by('meeting_time').last()
    if Meeting.objects.filter(meeting_time__gte=timezone.now()).order_by('meeting_time').first() is not None:
        current_meeting = Meeting.objects.filter(meeting_time__gte=timezone.now()).order_by('meeting_time').first()

    def get(self, request, format=None):
        if not request.user.is_anonymous:
            my_profile = request.user.profile
            queryset = JoinedUser.objects.filter(profile=my_profile, meeting=self.current_meeting).last()
            serializer = JoinSerializer(queryset)
            if queryset is not None:
                return Response(serializer.data, status=status.HTTP_200_OK)

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
                
        return Response(status=status.HTTP_400_BAD_REQUEST)


    def delete(self, request, format=None):
        my_profile = request.user.profile
        user2delete = JoinedUser.objects.get(profile=my_profile, meeting=self.current_meeting)
        # 취소자보다 rank 높은 모든 사람들 
        after_joined_users = JoinedUser.objects.filter(rank__gte=user2delete.rank, meeting=self.current_meeting, profile__is_male = my_profile.is_male)

        if self.current_meeting.cutline is None:
            for after_joined_user in after_joined_users:
                after_joined_user.rank -= 1
        
        if my_profile is not None and self.current_meeting is not None and user2delete is not None:
            user2delete.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)

        return Response(status=status.HTTP_400_BAD_REQUEST)


class CounterProfile(APIView):
    def get(self, request, format=None):
        if not request.user.is_anonymous:
            my_profile = request.user.profile
            current_meeting = Meeting.objects.all().order_by('meeting_time').last()
            if Meeting.objects.filter(meeting_time__gte=timezone.now()).order_by('meeting_time').first() is not None:
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
        return Response(status=status.HTTP_404_NOT_FOUND)


class CurrentProfile(APIView):
    def get(self, request, format=None):
        if request.user.is_authenticated:
            queryset = request.user.profile
            if queryset is not None:
                serializer = ProfileSerializer(queryset)
                return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_404_NOT_FOUND)

    # models.py에서 user와 연동하여 profile을 만들어주고 있으므로 현재로선 Post 불필요
    # def post(self, request, format=None):

    def patch(self, request, format=None):
        queryset = request.user.profile

        if request.data.get('team_name'):
            queryset.last_intro_modified_at = timezone.now()

        serializer = ProfileSerializer(queryset, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            email = request.data["email"]
            company_name = request.data["company"]
            if Company.objects.filter(name=company_name).count() > 0:
                queryset.user.email = email
                queryset.user.save()
                company = Company.objects.get(name=company_name)
                queryset.company = company
                queryset.save()
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        return Response(status=status.HTTP_400_BAD_REQUEST)


    def delete(self, request, format=None):
        current_meeting = Meeting.objects.filter(meeting_time__gte=timezone.now()).order_by('meeting_time').first()
        my_profile = request.user.profile
        user2delete = JoinedUser.objects.get(profile=my_profile, meeting=current_meeting)

        if user2delete is not None:
            # 취소자보다 rank 높은 모든 사람들 
            after_joined_users = JoinedUser.objects.filter(rank__gte=user2delete.rank, meeting=self.current_meeting, profile__is_male = my_profile.is_male)
            if current_meeting.cutline is None:
                for after_joined_user in after_joined_users:
                    after_joined_user.rank -= 1
        
            if my_profile is not None and current_meeting is not None and user2delete is not None:
                user2delete.delete()

        if my_profile is not None:
            request.user.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)

        return Response(status=status.HTTP_400_BAD_REQUEST)


class CompanyRegistrationView(viewsets.ModelViewSet):
    serializer_class = CompanySerializer
    queryset = Company.objects.all()