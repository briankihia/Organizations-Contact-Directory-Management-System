from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth.models import User, auth
from django.urls import reverse
from django.contrib.auth import logout
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from django.contrib.auth import authenticate


@api_view(['POST'])
def user_login(request):
    data = request.data
    username = data.get('email')  # Use email as username
    password = data.get('password')

    user = authenticate(username=username, password=password)

    if user is not None:
        refresh = RefreshToken.for_user(user)
           # If role is a field in the user model
        role = getattr(user, 'role', None)  # This avoids errors if role doesn't exist

        # If using groups instead, you can get the first group name
        # role = user.groups.first().name if user.groups.exists() else None
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'user': {
                'username': user.username,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'email': user.email,
                'id': user.id,
                'role': role
            },
        }, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'Invalid email or password.'}, status=status.HTTP_400_BAD_REQUEST)


from django.contrib.auth.models import Group  # Import Group model



@api_view(['POST'])
def register(request):
    data = request.data
    try:
        # Create the user
        user = User.objects.create_user(
            username=data['email'],
            first_name=data['firstName'],
            last_name=data['lastName'],
            email=data['email'],
            password=data['password']
        )
        user.save()

        # # Assign the user to the "customer" group (optional)
        # customer_group, created = Group.objects.get_or_create(name='customer')
        # user.groups.add(customer_group)

        # # Create a Customer object for the user
        # Customer.objects.create(user=user, name=user.first_name, email=user.email)

        # Generate JWT tokens
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


def user_logout(request):
    logout(request)
    return redirect('store')


def check_authentication(request):
    if request.user.is_authenticated:
        return JsonResponse({'authenticated': True})
    else:
        return JsonResponse({'autheticated': False})