from django.contrib import admin
from .models import Meeting, Company, Profile, JoinedUser, Matching

admin.site.register(Meeting)
admin.site.register(Company)
admin.site.register(Profile)
admin.site.register(JoinedUser)
admin.site.register(Matching)