from datetime import datetime
from django.utils.timezone import now
from rest_framework import viewsets, permissions, authentication, mixins
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
            # create filter used to filter by date
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


class LotteryWinnerViewSet(mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    queryset = LotteryWinner.objects.all()
    serializer_class = LotteryWinnerSerializer
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def retrieve(self, request, *args, **kwargs):
        lottery_id = kwargs.get("pk")
        lottery = Lottery.objects.get(id=lottery_id)

        obj = self.get_queryset().filter(lottery=lottery).get()
        serializer = self.get_serializer(obj)

        return Response(serializer.data)
