from rest_framework import serializers
from django.utils.timezone import now

from access.serializers import UserSerializer

from .models import Lottery, LotteryWinner


class LotterySerializer(serializers.ModelSerializer):
    active = serializers.SerializerMethodField()
    num_ballots = serializers.SerializerMethodField()

    class Meta:
        model = Lottery
        fields = ["id", "name", "prize", "created", "active", "num_ballots"]

    def get_active(self, obj):
        today = now().date()
        return obj.created.date() == today

    def get_num_ballots(self, obj):
        return obj.ballots.count()


class LotteryMinSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lottery
        fields = ["id", "name", "prize"]


class LotteryWinnerSerializer(serializers.ModelSerializer):
    lottery = LotteryMinSerializer(read_only=True)
    user = UserSerializer(read_only=True)

    class Meta:
        model = LotteryWinner
        fields = ["user", "lottery"]
