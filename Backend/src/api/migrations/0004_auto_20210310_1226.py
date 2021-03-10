# Generated by Django 3.1.7 on 2021-03-10 18:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_auto_20210310_1217'),
    ]

    operations = [
        migrations.AddField(
            model_name='itinerary',
            name='accommodation_tag',
            field=models.TextField(choices=[('Hotel', 'Hotel'), ('Hostel', 'Hostel'), ('Condo', 'Condo'), ('Campsite', 'Camp')], default=''),
        ),
        migrations.AlterField(
            model_name='itinerary',
            name='transportation_tag',
            field=models.TextField(choices=[('CAR', 'Car'), ('TRAIN', 'Train'), ('PLANE', 'Plane'), ('MOTORCYCLE', 'Motorcycle'), ('BICYCLE', 'Bicycle')], default=''),
        ),
    ]
