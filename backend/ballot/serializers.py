from rest_framework import serializers

from lottery.serializers import LotteryMinSerializer
from .models import Ballot


class BallotSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ballot
        fields = ["user", "lottery"]


class BallotDetailSerializer(serializers.ModelSerializer):
    lottery = LotteryMinSerializer(read_only=True)

    class Meta:
        model = Ballot
        fields = ["id", "user", "lottery", "created"]
