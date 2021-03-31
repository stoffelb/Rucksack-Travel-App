# Generated by Django 3.1.7 on 2021-03-15 17:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_auto_20210310_1226'),
    ]

    operations = [
        migrations.AddField(
            model_name='itinerary',
            name='location_tag',
            field=models.CharField(default='', max_length=20),
        ),
        migrations.AlterField(
            model_name='itinerary',
            name='budget',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='itinerary',
            name='duration_magnitude',
            field=models.IntegerField(default=0),
        ),
    ]
