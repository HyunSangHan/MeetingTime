from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils import timezone
from allauth.account.signals import user_signed_up

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

    def seed(num_of_seed):
        from datetime import timedelta
        import random
        NUM_OF_SEED_FOR_BASE = num_of_seed
        NUM_OF_SEED_FOR_ACCOUNT = num_of_seed*20
        NUM_OF_SEED_FOR_ADD = num_of_seed*15

        for i in range(1, NUM_OF_SEED_FOR_BASE+1):
            # Company
            company_name = f'Company{i}'
            company_domain = f'@{i}.com'
            Company.objects.create(name=company_name, domain=company_domain)
            open_time = timezone.now()

            # Meeting
            first_shuffle_time = timezone.now()+timedelta(days=i)
            second_shuffle_time = timezone.now()+timedelta(days=i*2)
            third_shuffle_time = timezone.now()+timedelta(days=i*3)
            meeting_time = timezone.now()+timedelta(days=i*4)
            location = f'봉천{i}동'
            Meeting.objects.create(
                open_time=open_time,
                first_shuffle_time=first_shuffle_time,
                second_shuffle_time=second_shuffle_time,
                third_shuffle_time=third_shuffle_time,
                meeting_time=meeting_time,
                location=location
            )

        for j in range(1, NUM_OF_SEED_FOR_ACCOUNT+1):
            # User
            username = f'user{j}'
            password = '1234'
            email = f'{j}@{j}.com'
            user = User.objects.create_user(
                username = username,
                password = password,
                email = email
            )
            # Profile
            profile = user.profile
            profile.is_male = random.choice([True, False])
            profile.company = Company.objects.all().first()
            profile.age_range = 20
            profile.save()


        for k in range(1, NUM_OF_SEED_FOR_ADD+1):
            # JoinedUser
            joined_user = JoinedUser.objects.create(
                        profile_id=k,
                        meeting_id=random.randrange(1, NUM_OF_SEED_FOR_BASE+1)
                    )
            if joined_user.profile.is_male:
                joined_user.rank = JoinedUser.objects.filter(profile__is_male=True).count()+1
            else:
                joined_user.rank = JoinedUser.objects.filter(profile__is_male=False).count()+1                
            joined_user.save()


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
    team_introduce = models.TextField(blank=True, default="")
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

    @receiver(user_signed_up)
    def populate_profile(sociallogin, user, **kwargs):
        if sociallogin.account.provider == 'kakao':
            profile = user.profile
            kakao_data = user.socialaccount_set.filter(provider='kakao')[0].extra_data

            try:
                gender = kakao_data['kakao_account']['gender']
                if gender == 'male':
                    profile.is_male = True
                elif gender == 'female':
                    profile.is_male = False
            except:
                pass

            try:
                gender = kakao_data['kakao_account']['age_range']
                if gender == '10~19':
                    profile.age_range = 10
                elif gender == '20~29':
                    profile.age_range = 20
                elif gender == '30~39':
                    profile.age_range = 30
                elif gender == '40~49':
                    profile.age_range = 40
            except:
                pass
                
            profile.save()

class JoinedUser(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)
    meeting = models.ForeignKey(Meeting, on_delete=models.CASCADE)
    matching = models.ManyToManyField('self', through = 'Matching', symmetrical= False, blank=True)
    created_at = models.DateTimeField(default=timezone.now)
    is_matched = models.BooleanField(default=False)
    rank = models.IntegerField(null=True, blank=True)
    already_met_one = models.IntegerField(null=True, blank=True)
    already_met_two = models.IntegerField(null=True, blank=True)
    already_met_three = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return f'{self.profile.user.username} (is_male: {self.profile.is_male})'

class KakaoChatting(models.Model):
    chattingroom_url = models.URLField(null=True, blank=True)
    is_used = models.BooleanField(default=False)

    def __str__(self):
        return self.chattingroom_url

class Matching(models.Model):
    joined_male = models.ForeignKey(JoinedUser, related_name = 'joined_male', on_delete=models.CASCADE)
    joined_female = models.ForeignKey(JoinedUser, related_name = 'joined_female', on_delete=models.CASCADE)
    trial_time = models.IntegerField(default=1)
    is_greenlight_male = models.BooleanField(default=False)
    is_greenlight_female = models.BooleanField(default=False)
    is_gift_male = models.BooleanField(default=False)
    is_gift_female = models.BooleanField(default=False)
    kakao_chattingroom = models.ForeignKey(KakaoChatting, on_delete=models.CASCADE, null=True, blank=True)

    def seed(num_of_seed):
        import random

        for k in range(1, 4):
            joined_male = JoinedUser.objects.get(profile__is_male = True, rank=k)
            joined_female = JoinedUser.objects.get(profile__is_male = False, rank=k)

            Matching.objects.create(
                joined_male = joined_male, 
                joined_female = joined_female,
                trial_time = random.randint(1, 3),
                is_greenlight_male = random.choice([True, False]),
                is_greenlight_female = random.choice([True, False]),
                is_gift_male = random.choice([True, False]),
                is_gift_female = random.choice([True, False])
            )
            
    def __str__(self):
        return f'남: {str(self.joined_male)} / 여: {str(self.joined_female)} / 셔플 횟수: {str(self.trial_time)}'
