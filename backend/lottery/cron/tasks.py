import logging

from django_cron import CronJobBase, Schedule
from random import choice
from django.contrib.auth.models import User
from lottery.models import Lottery, LotteryWinner

logger = logging.getLogger(__name__)


class PickLotteryWinner(CronJobBase):
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
    RUN_AT_TIMES = ["00:01"]

    schedule = Schedule(run_at_times=RUN_AT_TIMES)
    code = "lottery.cron.task.StartNewLottery"

    def do(self):
        logger.info(f"Starting StartNewLottery task")
        new_lottery = Lottery.objects.create_new()
        active = Lottery.objects.active()

        if new_lottery == active:
            logger.error(
                "Error when starting a new lottery. There is already an active lottery."
            )
            return

        logger.info(f"New lottery created: {new_lottery}")
        logger.info(f"Finished StartNewLottery task")
