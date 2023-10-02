from rest_framework import permissions


class BuyBallotUserPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method not in permissions.SAFE_METHODS:
            return request.user.id == request.data.get("user")
        return True
