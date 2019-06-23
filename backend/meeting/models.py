from django.db import models

class MeetingMatching(models.Model):
    starting_date = models.DateTimeField()
    mid_date = models.DateTimeField()
    final_date = models.DateTimeField()
    meeting_date = models.DateTimeField()
    location = models.CharField(max_length=20) #for test
    cutline = models.IntegerField(default=0)
    current_process = models.IntegerField(default=0)

    def __str__(self):
        return self.location