from rest_framework.generics import ListAPIView
from .models import Item, Category
from .serializers import ItemSerializer, CategorySerializer


class ItemList(ListAPIView):
    queryset = Item.objects.filter(status=True)
    serializer_class = ItemSerializer


class CategoryList(ListAPIView):
	queryset = Category.objects.all()
	serializer_class = CategorySerializer