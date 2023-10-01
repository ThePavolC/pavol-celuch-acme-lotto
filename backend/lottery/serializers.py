from rest_framework import serializers
from .models import Lottery, LotteryWinner
from django.utils.timezone import now


class LotterySerializer(serializers.ModelSerializer):
    active = serializers.SerializerMethodField()

    class Meta:
        model = Lottery
        fields = ["id", "name", "prize", "ballot", "created", "active"]

    def get_active(self, obj):
        today = now().date()
        return obj.created.date == today


class LotteryWinnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = LotteryWinner
        fields = ["user", "lottery"]
