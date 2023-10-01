from django.contrib import admin

from .models import Lottery, LotteryWinner

admin.site.register(Lottery)
admin.site.register(LotteryWinner)
