from access.forms import NewUserForm
from rest_framework import generics, status
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.response import Response
from rest_framework.serializers import ValidationError


class GetTokenView(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(
            data=request.data, context={"request": request}
        )
        try:
            serializer.is_valid(raise_exception=True)
        except ValidationError:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        user = serializer.validated_data["user"]
        token, _ = Token.objects.get_or_create(user=user)
        return Response(
            {
                "token": token.key,
                "user_id": user.pk,
                "email": user.email,
                "username": user.username,
            }
        )


class CreateUserView(generics.CreateAPIView):
    def post(self, request, *args, **kwargs):
        form = NewUserForm(request.data)

        if form.is_valid():
            user = form.save()
            return Response(status=status.HTTP_201_CREATED)

        return Response(form.errors.as_json(), status=status.HTTP_400_BAD_REQUEST)
