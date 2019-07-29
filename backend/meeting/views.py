from django.shortcuts import render
from rest_framework import viewsets, status
from .models import Meeting, JoinedUser, Profile, Matching
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import MeetingSerializer, JoinSerializer, CurrentMeetingSerializer, CounterProfileSerializer
from django.contrib.auth.models import User
from django.utils import timezone
from allauth.socialaccount.providers.kakao.views import KakaoOAuth2Adapter
from rest_auth.registration.views import SocialLoginView
import requests
import json
from django.shortcuts import redirect
from backend.settings import KAKAO_AUTH_REST_API_KEY

def oauth(request):
    authorize_code = request.GET.get('code')
    DATA_FOR_GET_ACCESS_TOKEN = {
        'grant_type' : 'authorization_code',
        'client_id': KAKAO_AUTH_REST_API_KEY,
        'redirect_uri': 'http://localhost:8000/oauth',
        'code': authorize_code
        }
    access_token = requests.post('https://kauth.kakao.com/oauth/token', data=DATA_FOR_GET_ACCESS_TOKEN).json()['access_token']

    print(access_token)
    print(KAKAO_AUTH_REST_API_KEY)

    DATA_FOR_GET_USER_INFO = {
        'access_token': access_token,
        'code' : KAKAO_AUTH_REST_API_KEY
        }
    response = requests.post('http://localhost:8000/rest-auth/kakao/', data=DATA_FOR_GET_USER_INFO).json()['key']
    print('로그인된 유저의 Token값은 "'+ str(response)+'"이고, 이름은 "'+User.objects.filter(auth_token=response).first().username+'"입니다.')
    return redirect('http://localhost:3000/')

class KakaoLogin(SocialLoginView):
    adapter_class = KakaoOAuth2Adapter

class MeetingInfoView(viewsets.ModelViewSet):
    serializer_class = MeetingSerializer
    queryset = Meeting.objects.all()

class CurrentMeeting(APIView):
    def get(self, request, format=None):
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

class Join(APIView):
    # =========Just for test (START)=========
    user = User.objects.all().first() # 이후 테스트용
    # =========Just for test (END)=========
    # user = request.user # request에 user가 있다고 가정하고. 그런데 session관리는 어떻게 해야하는지 고민 필요. 혹시 토큰으로?
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