from rest_framework import serializers

from lottery.serializers import LotteryMinSerializer
from .models import Ballot


class BallotSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ballot
        fields = ["lottery"]

    def create(self, validated_data):
        user_id = self.context.get("request").user.id
        updated_data = {**validated_data, **{"user_id": user_id}}
        return Ballot.objects.create(**updated_data)


class BallotDetailSerializer(serializers.ModelSerializer):
    lottery = LotteryMinSerializer(read_only=True)

    class Meta:
        model = Ballot
        fields = ["id", "user", "lottery", "created"]
