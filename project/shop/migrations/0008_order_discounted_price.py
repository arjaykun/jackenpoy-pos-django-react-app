# Generated by Django 2.2.6 on 2019-10-25 13:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0007_auto_20191024_2056'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='discounted_price',
            field=models.FloatField(default=0),
            preserve_default=False,
        ),
    ]