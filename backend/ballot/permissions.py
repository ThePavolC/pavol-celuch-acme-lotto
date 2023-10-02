from rest_framework import permissions


class BuyBallotUserPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.id == request.data.get("user")
