from django.shortcuts import render
from rest_framework import viewsets, status
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from .serializers import MeetingSerializer, JoinSerializer
from django.contrib.auth.models import User
from .models import Meeting, JoinedUser, Profile
from django.utils import timezone

class MeetingInfoView(viewsets.ModelViewSet):
    serializer_class = MeetingSerializer
    queryset = Meeting.objects.all()

class Join(APIView):
    # authentication_classes = [SessionAuthentication, BasicAuthentication]
    # permission_classes = [IsAuthenticated]

    # =========Just for test (START)=========
    user = User.objects.get(username="user_female")
    # =========Just for test (END)=========
    # user = request.data.user # request에 user가 있다고 가정하고. 그런데 session관리는 어떻게 해야하는지 고민 필요. 혹시 토큰으로?
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