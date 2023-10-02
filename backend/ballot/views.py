from rest_framework import viewsets, permissions, authentication
from rest_framework.decorators import action
from .models import Ballot
from .serializers import BallotSerializer, BallotDetailSerializer
from .permissions import BuyBallotUserPermission


class BallotViewSet(viewsets.ModelViewSet):
    queryset = Ballot.objects.all()
    serializer_class = BallotSerializer
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated, BuyBallotUserPermission]

    @action(methods=["get"], detail=False)
    def my(self, request):
        queryset = self.paginate_queryset(
            Ballot.objects.filter(user=request.user).order_by("-created")
        )
        serializer = BallotDetailSerializer(queryset, many=True)
        return self.get_paginated_response(serializer.data)
