"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from .views import HabitListView, HabitDetailView, JournalEntriesListView, JournalEntryView, DailyLogDetailView, DailyLogsView, HabitLogView

urlpatterns = [
    path("habits/", HabitListView.as_view(), name="habit_list"),
    path("habits/<int:pk>", HabitDetailView.as_view(), name="habit_detail"),
    path("habit_log/<int:pk>", HabitLogView.as_view(), name="habit_log"),
    path("journal/", JournalEntriesListView.as_view(), name="journal_entries"),
    path("journal/<int:pk>", JournalEntryView.as_view(), name="journal_entry"),
    path("daily_log/<int:year>/<int:month>/<int:day>/", DailyLogDetailView.as_view(), name="daily_log_detail"),
    path("daily_log/", DailyLogsView.as_view(), name="daily_logs")
    
]
