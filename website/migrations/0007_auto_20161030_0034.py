# -*- coding: utf-8 -*-
# Generated by Django 1.9.8 on 2016-10-30 00:34
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('website', '0006_auto_20161030_0032'),
    ]

    operations = [
        migrations.AlterField(
            model_name='properties',
            name='price',
            field=models.FloatField(),
        ),
    ]
