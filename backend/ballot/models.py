from django.db import models
from django.contrib.auth.models import User

from lottery.models import Lottery


class Ballot(models.Model):
    user = models.ForeignKey(User, on_delete=models.DO_NOTHING)
    lottery = models.ForeignKey(
        Lottery, on_delete=models.DO_NOTHING, related_name="lottery"
    )

    def __str__(self):
        return f"ID:{self.id} - {self.user.username} in {self.lottery.name}"
