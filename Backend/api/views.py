from django.shortcuts import render
from rest_framework import generics

from api.models import Note
from .serializer import UserSerializer,NoteSerializer
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated, AllowAny


class CreateUserView(generics.CreateAPIView):
    """Create a new user in the system"""
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (AllowAny,)





class NoteListCreate(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    # permission_classes = (IsAuthenticated,)
    
    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
            print(serializer)
        else:
           print(serializer.errors)
        return 

class NoteDelete(generics.DestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = (IsAuthenticated,)
    
    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)