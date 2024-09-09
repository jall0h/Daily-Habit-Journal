from django.contrib import admin
from .models import DailyLog, Habit, HabitLog, JournalEntry, User

# Register your models here.
admin.site.register(DailyLog)
admin.site.register(Habit)
admin.site.register(HabitLog)
admin.site.register(JournalEntry)
admin.site.register(User)
