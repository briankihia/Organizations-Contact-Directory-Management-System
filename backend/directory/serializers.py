from rest_framework import serializers
from .models import Industry, Organization, Contact
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class IndustrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Industry
        fields = '__all__'

class OrganizationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organization
        fields = '__all__'

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = '__all__'



class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add role claim based on is_superuser
        token['role'] = 'admin' if user.is_superuser else 'normal'
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        # Add role in the response data
        data['role'] = 'admin' if self.user.is_superuser else 'normal'
        return data