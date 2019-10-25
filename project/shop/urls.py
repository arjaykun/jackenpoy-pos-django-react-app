# from rest_framework import routers
# from .api import ItemsViewSet


# router = routers.DefaultRouter()
# router.register('items', ItemsViewSet, 'items')

# urlpatterns = router.urls

from django.urls import path
from .views import ItemList, CategoryList

app_name = "shop"

urlpatterns = [
    path('items/', ItemList.as_view(), name="item-list"),
    path('categories/', CategoryList.as_view(), name="category-list"),
]
