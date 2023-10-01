from rest_framework import viewsets, permissions, authentication
from .models import Ballot
from .serializers import BallotSerializer


class BallotViewSet(viewsets.ModelViewSet):
    queryset = Ballot.objects.all()
    serializer_class = BallotSerializer
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]