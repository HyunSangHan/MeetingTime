from meeting.views import meeting_example, match_example, success_matching

# def meeting():
#     # example_meeting = {
#     #     "open_time": "2019-08-12T22:02:29+09:00",
#     #     "first_shuffle_time": "2019-08-13T22:02:29+09:00",
#     #     "second_shuffle_time": "2019-08-14T22:02:29+09:00",
#     #     "third_shuffle_time": "2019-08-15T22:02:29+09:00",
#     #     "meeting_time": "2019-09-05T22:02:29+09:00",
#     #     "location": "봉천1동"
#     # }
#     # c_r = CurrentMeeting()
#     # c_r.post(example_meeting)
#     Meeting.objects.create(open_time="2019-08-12T22:02:29+09:00", first_shuffle_time="2019-08-13T22:02:29+09:00", second_shuffle_time="2019-08-13T22:02:29+09:00", third_shuffle_time="2019-08-13T22:02:29+09:00", meeting_time="2019-09-05T22:02:29+09:00")
#     pass

def meeting():
    meeting_example()
    pass

def match():
    match_example()
    pass

def kakao_for_success():
    success_matching()
    pass