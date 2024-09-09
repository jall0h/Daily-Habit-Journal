from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator
from datetime import date
from django.db.models.signals import post_save
from django.dispatch import receiver


# Create your models here.
class User(AbstractUser):
    """Model used for user authentication, and team member related information."""

    username = models.CharField(
        max_length=30,
        unique=True,
        validators=[RegexValidator(
            regex=r'^@\w{3,}$',
            message='Username must consist of @ followed by at least three alphanumericals'
        )]
    )
    first_name = models.CharField(max_length=50, blank=False)
    last_name = models.CharField(max_length=50, blank=False)
    email = models.EmailField(unique=True, blank=False)

    class Meta:
        """Model options."""
        ordering = ['last_name', 'first_name']

    def full_name(self):
        """Return a string containing the user's full name."""
        return f'{self.first_name} {self.last_name}'
    

class Habit(models.Model):
    name = models.CharField(max_length=100, blank=False)
    date_created =  models.DateField(default=date.today)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

class HabitLog(models.Model):
    habit = models.ForeignKey(Habit, on_delete=models.CASCADE)
    completed = models.BooleanField(default=False)

class JournalEntry(models.Model):
    entry = models.CharField(max_length=10000,blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

class DailyLog(models.Model):
    habit_logs = models.ManyToManyField(HabitLog,null=True, blank=True)
    journal_entry = models.ForeignKey(JournalEntry, on_delete=models.SET_NULL, null=True, blank=True)
    date = models.DateField(default=date.today)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    
    class Meta:
        unique_together = ("user", "date")
