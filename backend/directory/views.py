from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from .models import Industry, Organization, Contact
from .serializers import IndustrySerializer, OrganizationSerializer, ContactSerializer

class IndustryViewSet(viewsets.ModelViewSet):
    queryset = Industry.objects.all()
    serializer_class = IndustrySerializer

class OrganizationViewSet(viewsets.ModelViewSet):
    queryset = Organization.objects.all()
    serializer_class = OrganizationSerializer

class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
