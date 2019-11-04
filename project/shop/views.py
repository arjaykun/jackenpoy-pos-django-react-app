from rest_framework.generics import ListAPIView, ListCreateAPIView, CreateAPIView
from .models import Item, Category, Order, OrderItem
from .serializers import (ItemSerializer,
                          CategorySerializer,
                          OrderSerializer,
                          OrderItemSerializer
                          )


class ItemList(ListAPIView):
    queryset = Item.objects.filter(status=True)
    serializer_class = ItemSerializer


class CategoryList(ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class OrderItemCreate(CreateAPIView):
    queryset = OrderItem
    serializer_class = OrderItemSerializer


class OrderListCreate(ListCreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
