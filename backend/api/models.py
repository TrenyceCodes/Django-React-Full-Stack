from django.db import models
from django.contrib.auth.models import User

#create, edit, delete, and update user user note
class Note(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notes") #if we update user we would delete all notes connected to user

    #returns note title
    def __str__(self):
        return self.title