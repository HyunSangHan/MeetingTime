from django.contrib import admin
from .models import Meeting, Company, Profile, Matching, JoinedUser

@admin.register(Company)
class CompanyAdmin(admin.ModelAdmin):
    list_display = [
        'name',
        'domain'
    ]

    list_display_links = [
        'name',
        'domain'
    ]

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = [
        'user',
        'is_male',
        'age_range',
        'company',
        'validated',
        'team_name',
        'team_introduce'
    ]

    list_display_links = [
        'user',
        'is_male',
        'age_range',
        'company',
        'validated',
        'team_name',
        'team_introduce'
    ]

@admin.register(JoinedUser)
class JoinedUserAdmin(admin.ModelAdmin):
    list_display = [
        'profile',
        'meeting',
        'rank',
        'is_matched'
    ]

    list_display_links = [
        'profile',
        'meeting',
        'rank',
        'is_matched'
    ]

@admin.register(Matching)
class MatchingAdmin(admin.ModelAdmin):
    list_display = [
        'trial_time',
        'joined_male',
        'joined_female',
        'is_greenlight_male',
        'is_greenlight_female',
        'is_gift_male',
        'is_gift_female'
    ]

    list_display_links = [
        'trial_time',
        'joined_male',
        'joined_female',
        'is_greenlight_male',
        'is_greenlight_female',
        'is_gift_male',
        'is_gift_female'
    ]

@admin.register(Meeting)
class MeetingAdmin(admin.ModelAdmin):
    list_display = [
        'meeting_time',
        'location',
        'cutline',
        'open_time',
        'close_time',
        'last_result_time'
    ]

    list_display_links = [
        'meeting_time',
        'location',
        'cutline',
        'open_time',
        'close_time',
        'last_result_time'
    ]
