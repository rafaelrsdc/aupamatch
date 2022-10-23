from rest_framework import viewsets, decorators, response
from rest_framework import permissions
from .serializers import UserSerializer
from .models import User


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_permissions(self):
        """
        Instantiates and returns the list of permissions that this view requires.
        """
        if self.action == 'create':
            permission_classes = [permissions.AllowAny]
        else:
            permission_classes = self.permission_classes
        return [permission() for permission in permission_classes]

    @decorators.action(detail=False, methods=["get"])
    def verify_credentials(self, request):
        serializer = self.get_serializer(
            User.objects.get(pk=request.user.id)
        )

        return response.Response(data=serializer.data)

