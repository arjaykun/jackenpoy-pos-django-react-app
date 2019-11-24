from rest_framework import serializers
from .models import Item, Category, Order, OrderItem


class ItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = Item
        fields = "__all__"


class CategorySerializer(serializers.ModelSerializer):
    items = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Category
        fields = ["id", "category", "items", 'color']


class CategorySerializer2(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = "__all__"


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ['item', 'quantity', 'order', 'discounted_price', 'subtotal']


class OrderSerializer(serializers.ModelSerializer):
    order_items = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Order
        fields = ['order_items', 'id', 'user', 'total_price',
                  'discounted_price', 'ordered_date', 'is_completed', 'or_number']
