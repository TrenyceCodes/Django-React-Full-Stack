from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Note

#serializer.ModelSerializer allows us to serialize models from models like User and Notes
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"] #fields to serialize and return a user
        extra_kwargs = {"password": {"write_only" : True}} #tells django to accept password when creating a new user and not return it

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ["id", "title", "content", "created_at", "author"]
        extra_kwargs = {"author": { "read_only" : True}} #we should be able to read the author but not write the author since it will be manually set in the backend