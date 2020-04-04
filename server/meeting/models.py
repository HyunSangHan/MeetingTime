from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils import timezone
from allauth.account.signals import user_signed_up
#from django.contrib.humanize.templatetags.humanize import naturaltime


class Meeting(models.Model):
    prev_meeting_last_result_time = models.DateTimeField(null=True, help_text="지난번 미팅매칭 프로세스가 종료되었던 시간")
    open_time = models.DateTimeField(help_text="미팅 선착순이 열리는 시간")
    close_time = models.DateTimeField(help_text="미팅 선착순이 닫히는 시간")
    first_shuffle_time = models.DateTimeField(help_text="1번째 섞는 시간 / 즉, first met에서 second met으로 넘어가는 시간")
    second_shuffle_time = models.DateTimeField(help_text="2번째 섞는 시간 / 즉, second met에서 third met으로 넘어가는 시간")
    third_shuffle_time = models.DateTimeField(help_text="3번째 섞는 시간 / 즉, third met에서 last met으로 넘어가는 시간")
    last_result_time = models.DateTimeField(null=True, help_text="모든 미팅매칭 프로세스가 종료되는 시간")
    meeting_time = models.DateTimeField(help_text="실제 미팅 만나는 오프라인 약속 기준 시간")
    location = models.CharField(max_length=20, help_text="실제 미팅 만나는 오프라인 약속 기준 장소")
    cutline = models.IntegerField(null=True, blank=True, help_text="남 vs 여 중 적은 숫자의 매칭지원자수")
    description = models.CharField(max_length=20, null=True, blank=True, help_text="미팅 공지문")

    class Meta:
        verbose_name = '미팅 모집(Meeting)'
        verbose_name_plural = '미팅 모집(Meeting)'

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
            close_time = timezone.now()+timedelta(days=i)
            first_shuffle_time = timezone.now()+timedelta(days=i*2)
            second_shuffle_time = timezone.now()+timedelta(days=i*3)
            third_shuffle_time = timezone.now()+timedelta(days=i*4)
            last_result_time =  timezone.now()+timedelta(days=i*5)
            meeting_time = timezone.now()+timedelta(days=i*10)
            location = f'봉천{i}동'
            Meeting.objects.create(
                open_time=open_time,
                close_time=close_time,
                first_shuffle_time=first_shuffle_time,
                second_shuffle_time=second_shuffle_time,
                third_shuffle_time=third_shuffle_time,
                last_result_time=last_result_time,
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

    class Meta:
        verbose_name = '등록된 회사(Company)'
        verbose_name_plural = '등록된 회사(Company)'

    def __str__(self):
        return self.name

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    company = models.ForeignKey(Company, on_delete=models.SET_NULL, null=True)
    image_first = models.ImageField(null=True, blank=True)
    image_second = models.ImageField(null=True, blank=True)
    image_third = models.ImageField(null=True, blank=True)
    team_name = models.CharField(null=True, max_length=20)
    is_male = models.BooleanField(null=True)
    age_range = models.IntegerField(null=True, blank=True) #10, 20, 30, 40 예컨대 이런식
    created_at = models.DateTimeField(default=timezone.now)
    last_login_at = models.DateTimeField(default=timezone.now)
    team_introduce = models.TextField(blank=True, default="")
    last_intro_modified_at = models.DateTimeField(null=True, blank=True)
    is_validated = models.BooleanField(default=False)

    class Meta:
        verbose_name = '회원/팀정보(Profile)'
        verbose_name_plural = '회원/팀정보(Profile)'

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
    already_met_first = models.IntegerField(null=True, blank=True)
    already_met_second = models.IntegerField(null=True, blank=True)
    already_met_third = models.IntegerField(null=True, blank=True)

    class Meta:
        verbose_name = '미팅지원자 현황(JoinedUser)'
        verbose_name_plural = '미팅지원자 현황(JoinedUser)'

    def __str__(self):
        return f'{self.profile.user.username} (is_male: {self.profile.is_male})'

class KakaoChatting(models.Model):
    chattingroom_url = models.URLField(null=True, blank=True)
    is_used = models.BooleanField(default=False)

    class Meta:
        verbose_name = '카카오 채팅방 URL(KakaoChatting)'
        verbose_name_plural = '카카오 채팅방 URL(KakaoChatting)'

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

    class Meta:
        verbose_name = '미팅 모집 내 개별 각각의 매칭(Matching)'
        verbose_name_plural = '미팅 모집 내 각각의 개별 매칭(Matching)'

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

class Validation(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    code = models.IntegerField(null=True, blank=True)

    class Meta:
        verbose_name = '이메일 인증코드(Validation)'
        verbose_name_plural = '이메일 인증코드(Validation)'