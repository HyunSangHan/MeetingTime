"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from meeting import views

router = routers.DefaultRouter()
router.register('meeting_info', views.MeetingInfoView, 'meeting_info')

urlpatterns = [
    path('oauth/', views.oauth, name='oauth'),
    path('get_code/', views.get_code, name='get_code'),
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
    path('join/', views.Join.as_view()),
    path('current_meeting/', views.CurrentMeeting.as_view()),
    path('counter_profile/', views.CounterProfile.as_view()),
    # url(r'^rest-auth/', include('rest_auth.urls')),
    # url(r'^rest-auth/registration/', include('rest_auth.registration.urls'))
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
]

urlpatterns += [
    path('rest-auth/kakao/', views.KakaoLogin.as_view())
    # url(r'^rest-auth/kakao/$', KakaoLogin.as_view(), name='kakao_login')
]