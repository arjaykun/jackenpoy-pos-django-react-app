from .serializers import ItemSerializer
from rest_framework import viewsets, permissions
from .models import Item


class ItemsViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
