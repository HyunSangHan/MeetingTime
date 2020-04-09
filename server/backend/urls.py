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
from django.conf.urls.static import static
from django.conf import settings


router = routers.DefaultRouter()
router.register('meeting_info', views.MeetingInfoView, 'meeting_info')
router.register('company_registration', views.CompanyRegistrationView, 'company_registration')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/join/', views.Join.as_view()),
    path('api/current_meeting/', views.CurrentMeeting.as_view()),
    path('api/counter_profile/', views.CounterProfile.as_view()),
    path('api/rest-auth/', include('rest_auth.urls')),
    path('api/rest-auth/registration/', include('rest_auth.registration.urls')),
    path('api/logout/', views.logout, name='logout'),
    path('api/', include(router.urls)),
    path('api/profile/', views.MyProfile.as_view()),
    path('api/email/', views.Email.as_view()),
    path('api/validation/', views.Validation.as_view()),
    path('api/current_matching/', views.CurrentMatching.as_view())
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += [
    path('api/rest-auth/kakao/', views.KakaoLogin.as_view())
]