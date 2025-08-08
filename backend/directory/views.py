from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from .models import Industry, Organization, Contact
from .serializers import IndustrySerializer, OrganizationSerializer, ContactSerializer

from rest_framework.permissions import IsAuthenticated
from .permissions import IsAdminRole, IsUserRole

class IndustryViewSet(viewsets.ModelViewSet):
    queryset = Industry.objects.all()
    serializer_class = IndustrySerializer
    permission_classes = [IsAuthenticated, IsAdminRole]  # Only admins

class OrganizationViewSet(viewsets.ModelViewSet):
    queryset = Organization.objects.all()
    serializer_class = OrganizationSerializer
    permission_classes = [IsAuthenticated]  # Any logged-in user

class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
    permission_classes = [IsAuthenticated, IsUserRole]  # Only normal users
