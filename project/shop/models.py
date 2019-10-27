from django.db import models
from django.conf import settings

# Create your models here.


class Category(models.Model):
    CATEGORY_COLOR_CHOICES = [
        ('P', 'Blue'),
        ('I', 'Light Blue'),
        ('W', 'Yellow'),
        ('S', 'Green'),
        ('DK', 'Black'),
        ('SE', 'Gray'),
        ('DR', 'Red')
    ]
    category = models.CharField(max_length=100)
    color = models.CharField(
        max_length=2, choices=CATEGORY_COLOR_CHOICES, default='P')

    def __str__(self):
        return self.category


class Item(models.Model):
    name = models.CharField(max_length=100)
    price = models.FloatField()
    category = models.ForeignKey(
        Category, related_name="items", on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.BooleanField(default=True)

    def __str__(self):
        return self.name


class Order(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
    total_price = models.FloatField()
    discounted_price = models.FloatField()
    ordered_date = models.DateTimeField(auto_now_add=True)
    is_completed = models.BooleanField(default=False)

    def __str__(self):
        return f"Order worth {self.total_price} completed by {self.user.username}"


class OrderItem(models.Model):
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)
    order = models.ForeignKey(Order, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.item.name} - {self.quantity} pcs."
