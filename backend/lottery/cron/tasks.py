import logging

from django_cron import CronJobBase, Schedule
from random import choice
from django.contrib.auth.models import User
from lottery.models import Lottery, LotteryWinner

logger = logging.getLogger(__name__)


class PickLotteryWinner(CronJobBase):
    """Task to get a currently active lottery and pick the winner.

    We find the today's active lottery, get all it's ballot users
    and randomly pick the winner.
    The winner is then stored in LotteryWinner.
    """

    RUN_AT_TIMES = ["23:59"]

    schedule = Schedule(run_at_times=RUN_AT_TIMES)
    code = "lottery.cron.task.PickLotteryWinner"

    def do(self):
        logger.info(f"Starting PickLotteryWinner task")
        active_lottery = Lottery.objects.active()

        users = active_lottery.ballots.values_list("pk", flat=True)
        random_user_id = choice(users)
        winner = User.objects.filter(user__id=random_user_id)

        lw = LotteryWinner.objects.create(user=winner, lotter=active_lottery)
        lw.save()

        logger.info(f"PickLotteryWinner: {lw}")
        logger.info(f"Finished PickLotteryWinner task")


class StartNewLottery(CronJobBase):
    """Task to create a new Lottery for the day."""

    RUN_AT_TIMES = ["00:01"]

    schedule = Schedule(run_at_times=RUN_AT_TIMES)
    code = "lottery.cron.task.StartNewLottery"

    def do(self):
        logger.info(f"Starting StartNewLottery task")

        new_lottery = Lottery.objects.create_new()

        logger.info(f"New lottery created: {new_lottery}")
        logger.info(f"Finished StartNewLottery task")
