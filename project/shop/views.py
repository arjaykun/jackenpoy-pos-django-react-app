from rest_framework.generics import (
    ListAPIView,
    ListCreateAPIView,
    CreateAPIView,
    RetrieveUpdateDestroyAPIView)
from django.db.models.functions import TruncMonth, TruncDay, TruncYear
from django.db.models import Sum, Count
from .models import Item, Category, Order, OrderItem
from rest_framework.permissions import IsAuthenticated, AllowAny
from django_filters import rest_framework as rfilters
from django_filters import FilterSet, BooleanFilter, CharFilter, DateFromToRangeFilter
from rest_framework import filters
from rest_framework import pagination
from .serializers import (ItemSerializer,
                          CategorySerializer,
                          CategorySerializer2,
                          OrderSerializer,
                          OrderItemSerializer,
                          SalesSerializer
                          )


class StandardResultsSetPagination(pagination.PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 1000


class ItemList(ListCreateAPIView):
    permission_classes = [AllowAny]
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    filter_backends = (rfilters.DjangoFilterBackend, filters.SearchFilter,
                       filters.OrderingFilter)
    filterset_fields = ('category', 'status')
    search_fields = ['name']
    ordering_fields = ['name', 'id', 'price']
    ordering = ['-id']
    pagination_class = StandardResultsSetPagination


class AllItemList(ListAPIView):
    permission_classes = [AllowAny]
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    filter_backends = (rfilters.DjangoFilterBackend, filters.SearchFilter,
                       filters.OrderingFilter)
    filterset_fields = ('category',)
    search_fields = ['name']
    ordering_fields = ['name']
    ordering = ['name']


class ItemRetrieveUpdate(RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Item.objects.all()
    serializer_class = ItemSerializer


class CategoryList(ListAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    filter_backends = (filters.SearchFilter,)
    search_fields = ['category']


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


class OrderFilter(FilterSet):
    is_dine = BooleanFilter(field_name='is_dine')
    is_completed = BooleanFilter(field_name='is_completed')
    user = CharFilter(field_name='user__username')
    date = DateFromToRangeFilter(field_name="ordered_date")

    class Meta:
        model = Order
        fields = ['is_dine', 'is_completed', 'user', 'date']


class OrderListCreate(ListCreateAPIView):
    permission_classes = [AllowAny]
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    filter_backends = (rfilters.DjangoFilterBackend,
                       filters.SearchFilter, filters.OrderingFilter)
    filter_class = OrderFilter
    search_fields = ['or_number', 'user__username']
    ordering_fields = ['ordered_date']
    ordering = ['-ordered_date']
    pagination_class = StandardResultsSetPagination


class OrderUpdate(RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Order.objects.all()
    serializer_class = OrderSerializer


class SalesFilter(FilterSet):
    date = DateFromToRangeFilter(field_name="date")

    class Meta:
        model = Order
        fields = ['date']


class DailySales(ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = SalesSerializer
    queryset = Order.objects.all()
    filter_backends = (rfilters.DjangoFilterBackend,
                       filters.SearchFilter, filters.OrderingFilter)
    filter_class = SalesFilter
    search_fields = ['date']
    ordering_fields = ['date', 'sales', 'count']

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
