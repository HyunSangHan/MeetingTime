from meeting.views import CurrentMeeting, CurrentMatching
from meeting.models import JoinedUser

def schedule():
    example_meeting = {
        "open_time": "2019-08-12T22:02:29+09:00",
        "first_shuffle_time": "2019-08-13T22:02:29+09:00",
        "second_shuffle_time": "2019-08-14T22:02:29+09:00",
        "third_shuffle_time": "2019-08-15T22:02:29+09:00",
        "meeting_time": "2019-09-05T22:02:29+09:00",
        "location": "봉천1동"
    }
    c_r = CurrentMeeting()
    c_r.post(example_meeting)
    print("schedule!!!!!!!!!!!!!!!!!!!!!!!")
    pass

def match():
    example_male = {
        "joined_male": "user1 (is_male: True)",
        "joined_female": "user13 (is_male: False)"
    }
    match = CurrentMatching()
    match.post(example_male)
    pass

