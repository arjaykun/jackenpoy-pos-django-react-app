from rest_framework.generics import (
    ListAPIView,
    ListCreateAPIView,
    CreateAPIView,
    RetrieveUpdateDestroyAPIView)
from django.db.models.functions import TruncMonth, TruncDay, TruncYear
from django.db.models import Sum, Count
from .models import Item, Category, Order, OrderItem
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializers import (ItemSerializer,
                          CategorySerializer,
                          CategorySerializer2,
                          OrderSerializer,
                          OrderItemSerializer,
                          SalesSerializer
                          )


class ItemList(ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Item.objects.all()
    serializer_class = ItemSerializer


class ItemRetrieveUpdate(RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Item.objects.all()
    serializer_class = ItemSerializer


class CategoryList(ListAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class CategoryCreate(CreateAPIView):
    permission_classes = [AllowAny]
    queryset = Category.objects.all()
    serializer_class = CategorySerializer2


class CategoryUpdate(RetrieveUpdateDestroyAPIView):
    permission_classes = [AllowAny]
    queryset = Category.objects.all()
    serializer_class = CategorySerializer2


class OrderItemCreate(ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemSerializer


class OrderListCreate(ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Order.objects.all()
    serializer_class = OrderSerializer


class OrderUpdate(RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Order.objects.all()
    serializer_class = OrderSerializer


class DailySales(ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = SalesSerializer
    queryset = Order.objects.all()

    def get_queryset(self):
        queryset = self.queryset
        data = queryset.filter(is_completed=True).annotate(
            date=TruncDay('ordered_date')).values('date').annotate(
            sales=Sum('total_price'), count=Count('id')).order_by()
        return data


class MonthlySales(ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = SalesSerializer
    queryset = Order.objects.all()

    def get_queryset(self):
        queryset = self.queryset
        data = queryset.filter(is_completed=True).annotate(
            date=TruncMonth('ordered_date')).values('date').annotate(
            sales=Sum('total_price'), count=Count('id')).order_by()
        return data


class YearlySales(ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = SalesSerializer
    queryset = Order.objects.all()

    def get_queryset(self):
        queryset = self.queryset
        data = queryset.filter(is_completed=True).annotate(
            date=TruncYear('ordered_date')).values('date').annotate(
            sales=Sum('total_price'), count=Count('id')).order_by()
        return data
