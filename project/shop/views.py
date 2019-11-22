from rest_framework.generics import (
    ListCreateAPIView,
    CreateAPIView,
    RetrieveUpdateDestroyAPIView)
from .models import Item, Category, Order, OrderItem
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializers import (ItemSerializer,
                          CategorySerializer,
                          OrderSerializer,
                          OrderItemSerializer
                          )


class ItemList(ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Item.objects.all()
    serializer_class = ItemSerializer


class ItemRetrieveUpdate(RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Item.objects.all()
    serializer_class = ItemSerializer


class CategoryList(ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class OrderItemCreate(ListCreateAPIView):
    permission_classes = [AllowAny]
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemSerializer


class OrderListCreate(ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

class OrderUpdate(RetrieveUpdateDestroyAPIView):
    permission_classes = [AllowAny]
    queryset = Order.objects.all()
    serializer_class = OrderSerializer


