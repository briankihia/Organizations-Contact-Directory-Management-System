from django.db import models
from django.contrib.auth.models import User

from django.db.models.signals import post_save
from django.dispatch import receiver

class Industry(models.Model):
    name = models.CharField(max_length=50, unique=True)
    description = models.TextField(blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Organization(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    industry = models.ForeignKey(Industry, null=True, on_delete=models.SET_NULL)
    website = models.URLField(blank=True)
    logo_url = models.URLField(blank=True)
    founded_date = models.DateField(null=True, blank=True)
    tax_id = models.CharField(max_length=30, blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Contact(models.Model):
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    job_title = models.CharField(max_length=100, blank=True)
    department = models.CharField(max_length=50, blank=True)
    is_primary_contact = models.BooleanField(default=False)
    notes = models.TextField(blank=True)
    email = models.EmailField(blank=True)
    office_phone_number = models.CharField(max_length=50, blank=True)
    mobile_phone_number = models.CharField(max_length=50, blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)



