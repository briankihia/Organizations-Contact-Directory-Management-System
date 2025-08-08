from rest_framework.permissions import BasePermission

class IsAdminRole(BasePermission):
    """
    Allow access only to users with role='admin'
    """
    def has_permission(self, request, view):
        return (
            request.user.is_authenticated and 
            hasattr(request.user, 'profile') and 
            request.user.profile.role == 'admin'
        )

class IsUserRole(BasePermission):
    """
    Allow access only to users with role='user'
    """
    def has_permission(self, request, view):
        return (
            request.user.is_authenticated and 
            hasattr(request.user, 'profile') and 
            request.user.profile.role == 'user'
        )
