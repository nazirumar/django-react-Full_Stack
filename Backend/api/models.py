from django.db import models
from django.contrib.auth.models  import User

# Create your models here.


class Note(models.Model):
    title = models.CharField(max_length=100, db_index=True)
    content = models.TextField(db_index=True)
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, db_index=True, related_name="notes")


    def __str__(self):
        return self.title
    
