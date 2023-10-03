from django.db import models
from django.contrib.auth.models import User
from django.utils.timezone import now

from lottery.models import Lottery


class Ballot(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    lottery = models.ForeignKey(
        Lottery, on_delete=models.CASCADE, related_name="lottery"
    )
    created = models.DateTimeField(default=now)

    def __str__(self):
        return f"ID:{self.id} - {self.user.username} in {self.lottery.name}"
