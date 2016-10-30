# -*- coding: utf-8 -*-
# Generated by Django 1.9.8 on 2016-10-30 08:07
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('website', '0008_auto_20161030_0035'),
    ]

    operations = [
        migrations.AddField(
            model_name='properties',
            name='bathrooms',
            field=models.FloatField(null=True),
        ),
        migrations.AddField(
            model_name='properties',
            name='bedrooms',
            field=models.FloatField(null=True),
        ),
        migrations.AddField(
            model_name='properties',
            name='built_square_meters',
            field=models.FloatField(null=True),
        ),
        migrations.AddField(
            model_name='properties',
            name='description',
            field=models.CharField(max_length=10000, null=True),
        ),
        migrations.AddField(
            model_name='properties',
            name='total_square_meters',
            field=models.FloatField(null=True),
        ),
    ]
