from datetime import datetime
from django.utils.timezone import now
from rest_framework import viewsets, permissions, authentication
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import LotteryWinner, Lottery
from .serializers import LotterySerializer, LotteryWinnerSerializer


class LotteryViewSet(viewsets.ModelViewSet):
    serializer_class = LotterySerializer
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        filters = {}

        try:
            search_date_str = self.request.query_params.get("date")
            if search_date_str:
                search_date = datetime.fromisoformat(search_date_str).date()
                filters = {"created__date": search_date}
        except ValueError:
            pass

        today = now().date()
        return (
            Lottery.objects.all()
            .filter(**filters)
            .exclude(created__date=today)
            .order_by("-created")
        )

    @action(methods=["get"], detail=False)
    def active(self, request):
        serializer = self.get_serializer(Lottery.objects.active(), many=False)
        return Response(serializer.data)


class LotteryWinnerViewSet(viewsets.ModelViewSet):
    queryset = LotteryWinner.objects.all()
    serializer_class = LotteryWinnerSerializer
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]
