from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils import timezone
from faker import Faker #for debugging later

class Meeting(models.Model):
    open_time = models.DateTimeField()
    first_shuffle_time = models.DateTimeField()
    second_shuffle_time = models.DateTimeField()
    third_shuffle_time = models.DateTimeField()
    meeting_time = models.DateTimeField()
    location = models.CharField(max_length=20)
    cutline = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return f'미팅장소: {str(self.location)} / 오픈일자: {str(self.open_time).split(" ")[0]} / 미팅일자: {str(self.meeting_time).split(" ")[0]}'

class Company(models.Model):
    name = models.CharField(max_length=20, blank=True)
    domain = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return self.name

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    company = models.ForeignKey(Company, on_delete=models.SET_NULL, null=True)
    image = models.ImageField(null=True, blank=True)
    is_male = models.BooleanField(null=True)
    age_range = models.IntegerField(null=True, blank=True) #10, 20, 30, 40 예컨대 이런식
    created_at = models.DateTimeField(default=timezone.now)
    last_login_at = models.DateTimeField(default=timezone.now)
    team_introduce = models.TextField(blank=True)
    last_intro_modified_at = models.DateTimeField(null=True, blank=True)
    last_img_modified_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return self.user.username

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):  
    if created:
        Profile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):  
    instance.profile.save()

class JoinedUser(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)
    meeting = models.ForeignKey(Meeting, on_delete=models.CASCADE)
    matching = models.ManyToManyField('self', through = 'Matching', symmetrical= False)
    created_at = models.DateTimeField(default=timezone.now)
    is_matched = models.BooleanField(default=False)
    rank = models.IntegerField(null=True, blank=True)
    already_met_one = models.IntegerField(null=True, blank=True)
    already_met_two = models.IntegerField(null=True, blank=True)
    already_met_three = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return self.profile.user.username



class Matching(models.Model):
    joined_male = models.ForeignKey(JoinedUser, related_name = 'joined_male', on_delete=models.CASCADE)
    joined_female = models.ForeignKey(JoinedUser, related_name = 'joined_female', on_delete=models.CASCADE)
    trial_time = models.IntegerField(default=1)
    is_greenlight_male = models.BooleanField(default=False)
    is_greenlight_female = models.BooleanField(default=False)
    is_gift_male = models.BooleanField(default=False)
    is_gift_female = models.BooleanField(default=False)
    kakao_chattingroom = models.URLField(null=True, blank=True)

    def __str__(self):
        return f'남: {str(self.joined_male)} / 여: {str(self.joined_female)}'
