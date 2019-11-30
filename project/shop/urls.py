# from rest_framework import routers
# from .api import ItemsViewSet


# router = routers.DefaultRouter()
# router.register('items', ItemsViewSet, 'items')

# urlpatterns = router.urls

from django.urls import path
from .views import (ItemList, CategoryList, AllItemList,
                    OrderListCreate, OrderItemCreate, ItemRetrieveUpdate,
                    OrderUpdate, CategoryCreate, CategoryUpdate, DailySales,
                    MonthlySales, YearlySales)

app_name = "shop"

urlpatterns = [
    path('items/', ItemList.as_view(), name="item-list"),
    path('aitems/', AllItemList.as_view(), name="all_item-list"),
    path('items/<int:pk>', ItemRetrieveUpdate.as_view()),
    path('categories/', CategoryList.as_view(), name="category-list"),
    path('categories/<int:pk>', CategoryUpdate.as_view(),
         name="category-update"),
    path('category/', CategoryCreate.as_view(), name="category-create"),
    path('orders/', OrderListCreate.as_view(), name="order-list-create"),
    path('orders/<int:pk>', OrderUpdate.as_view()),
    path('orderitems/', OrderItemCreate.as_view(), name="orderitem-create"),
    path('dsales/', DailySales.as_view()),
    path('msales/', MonthlySales.as_view()),
    path('ysales/', YearlySales.as_view()),
]
