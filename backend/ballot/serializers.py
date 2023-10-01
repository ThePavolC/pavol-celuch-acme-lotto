from rest_framework import serializers
from .models import Ballot


class BallotSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ballot
        fields = ["user", "lottery"]
