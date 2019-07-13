from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils import timezone

class Meeting(models.Model):
    open_time = models.DateTimeField(blank=False, null=False)
    first_shuffle_time = models.DateTimeField()
    second_shuffle_time = models.DateTimeField()
    third_shuffle_time = models.DateTimeField()
    location = models.CharField(max_length=20, blank=True)
    cutline = models.IntegerField()

    def __str__(self):
        return self.open_time

class Company(models.Model):
    name = models.CharField(max_length=20, blank=True)
    domain = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return self.name

class Profile(models.Model):

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    company = models.ForeignKey(Company)
    image = models.ImageField(null=True)
    is_male = models.BooleanField(null=True)
    age_range = models.IntegerField(null=True)
    created_at = models.DateTimeField(default=timezone.now)
    last_login = models.DateTimeField(default=timezone.now)
    team_introduce = models.TextField(null=True, blank=True)
    last_int_modified = models.DateTimeField(default=timezone.now)
    last_img_modified = models.DateTimeField(default=timezone.now)

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
    match = models.ManyToManyField('self', through = 'Match', symmetrical=True)
    create_at = models.DateTimeField(default=timezone.now)
    is_matched = models.BooleanField(default=False)
    rank = models.IntegerField()

    def __str__(self):
        return self.profile



class Matching(models.Model):
    joined_male = models.ForeignKey(JoinedUser, on_delete=models.CASCADE)
    joined_female = models.ForeignKey(JoinedUser, on_delete=models.CASCADE)
    trial_time = models.IntegerField(default=1)
    is_greenlight_male = models.BooleanField(default=False)
    is_greenlight_female = models.BooleanField(default=False)
    is_gift_male = models.BooleanField(default=False)
    is_gift_female = models.BooleanField(default=False)
    kakao_chattingroom = models.URLField()

    def __str__(self):
        return 'male_id= %s, female_id= %s' % (self.joined_male, self.joined_female)
