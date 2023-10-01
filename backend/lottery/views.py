from rest_framework import viewsets, permissions, authentication
from .models import LotteryWinner, Lottery
from .serializers import LotterySerializer, LotteryWinnerSerializer
from rest_framework.decorators import action
from rest_framework.response import Response


class LotteryViewSet(viewsets.ModelViewSet):
    queryset = Lottery.objects.all()
    serializer_class = LotterySerializer
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    @action(methods=["get"], detail=False)
    def active(self, request):
        serializer = self.get_serializer(Lottery.objects.active(), many=True)
        return Response(serializer.data)


class LotteryWinnerViewSet(viewsets.ModelViewSet):
    queryset = LotteryWinner.objects.all()
    serializer_class = LotteryWinnerSerializer
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]
