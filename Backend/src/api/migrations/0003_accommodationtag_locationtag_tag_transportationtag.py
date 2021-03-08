# Generated by Django 3.1.7 on 2021-03-08 08:22

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_auto_20210303_2007'),
    ]

    operations = [
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
        ),
        migrations.CreateModel(
            name='AccommodationTag',
            fields=[
                ('tag_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='api.tag')),
                ('accommodation_type', models.CharField(max_length=100)),
            ],
            bases=('api.tag',),
        ),
        migrations.CreateModel(
            name='LocationTag',
            fields=[
                ('tag_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='api.tag')),
                ('location_name', models.CharField(max_length=100)),
            ],
            bases=('api.tag',),
        ),
        migrations.CreateModel(
            name='TransportationTag',
            fields=[
                ('tag_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='api.tag')),
                ('transport_type', models.CharField(max_length=100)),
            ],
            bases=('api.tag',),
        ),
    ]