from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import IndustryViewSet, OrganizationViewSet, ContactViewSet

router = DefaultRouter()
router.register('industries', IndustryViewSet)
router.register('organizations', OrganizationViewSet)
router.register('contacts', ContactViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
