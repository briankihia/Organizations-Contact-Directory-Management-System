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

        # Add custom claims inside the JWT token
        token['role'] = user.profile.role
        return token

    def validate(self, attrs):
        data = super().validate(attrs)

        # Add role to the response body (so frontend can store it easily)
        data['role'] = self.user.profile.role
        return data