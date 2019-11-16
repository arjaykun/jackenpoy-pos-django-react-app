from rest_framework.generics import (ListAPIView,
                                     ListCreateAPIView,
                                     CreateAPIView)
from .models import Item, Category, Order, OrderItem
from rest_framework.permissions import IsAuthenticated
from .serializers import (ItemSerializer,
                          CategorySerializer,
                          OrderSerializer,
                          OrderItemSerializer
                          )


class ItemList(ListAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Item.objects.filter(status=True)
    serializer_class = ItemSerializer


class CategoryList(ListAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class OrderItemCreate(CreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemSerializer


class OrderListCreate(ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
