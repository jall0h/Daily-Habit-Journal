from rest_framework import serializers
from .models import User, Habit, HabitLog, JournalEntry, DailyLog
from djoser.serializers import UserCreateSerializer as BaseUserRegistrationSerializer

class UserCreateSerializer(BaseUserRegistrationSerializer):
    class Meta(BaseUserRegistrationSerializer.Meta):
        fields = ['pk', 'username', 'password', 'first_name', 'last_name', 'email']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["pk", "username"]


class HabitSerializer(serializers.ModelSerializer):
    user = UserSerializer(many=False, read_only = True)
    class Meta:
        model = Habit
        fields = ["pk", "name", "date_created", "user"]

class HabitLogSerializer(serializers.ModelSerializer):
    habit = HabitSerializer(many=False, read_only=True)
    class Meta:
        model = HabitLog
        fields = ["pk", "habit", "completed"]

class JournalEntrySerializer(serializers.ModelSerializer):
    user = UserSerializer(many=False, read_only=True)
    class Meta:
        model = JournalEntry
        fields = ["pk", "entry", "user"]

class DailyLogSerializer(serializers.ModelSerializer):
    user = UserSerializer(many=False, read_only=True)
    habit_logs = HabitLogSerializer(many=True, read_only=True)
    journal_entry = JournalEntrySerializer(many=False, read_only=True )
    class Meta:
        model = DailyLog
        fields = ["pk", "journal_entry", "habit_logs", "date", "user"]