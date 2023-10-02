from django.db import models
from django.contrib.auth.models import User
from django.utils.timezone import now


class LotteryManager(models.Manager):
    def active(self):
        today = now().date()
        return self.get_queryset().filter(created__date=today)


class Lottery(models.Model):
    name = models.CharField(max_length=100)
    prize = models.CharField(max_length=100)
    ballots = models.ManyToManyField(
        User, through="ballot.Ballot", related_name="ballots"
    )
    created = models.DateTimeField(default=now)

    objects = LotteryManager()

    def __str__(self):
        return f"ID:{self.id} - {self.name}"


class LotteryWinner(models.Model):
    lottery = models.OneToOneField(Lottery, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"ID:{self.id} - {self.user.username} ({self.user.id}) in {self.lottery.name} ({self.lottery.id})"
