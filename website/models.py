from __future__ import unicode_literals

from django.db import models

# Create your models here.

class users(models.Model):
	name = models.CharField(max_length=200)

class properties(models.Model):
	meli_id = models.CharField(max_length=500)
	meli_link = models.CharField(max_length=500)
	title = models.CharField(max_length=500)
	price = models.FloatField()
	currency_id = models.CharField(max_length=200)
	pictures = models.CharField(max_length=10000)
	location = models.CharField(max_length=10000)
	publisher_name = models.CharField(max_length=500, null=True)
	publisher_phone = models.CharField(max_length=500, null=True)
	publisher_email = models.CharField(max_length=500, null=True)
	publisher_link = models.CharField(max_length=500, null=True)
	property_type = models.CharField(max_length=500)


				
		