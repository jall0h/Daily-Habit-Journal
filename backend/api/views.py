from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from .models import  Habit, HabitLog, JournalEntry, DailyLog, User
from .serializers import HabitSerializer, HabitLogSerializer, JournalEntrySerializer, DailyLogSerializer
from rest_framework.generics import ListAPIView, RetrieveDestroyAPIView, CreateAPIView, RetrieveUpdateDestroyAPIView, RetrieveUpdateAPIView
from django.shortcuts import render, get_object_or_404
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
import datetime

# Create your views here.
class HabitListView(ListAPIView, CreateAPIView):
    serializer_class = HabitSerializer
    queryset = Habit.objects.all()
    lookup_field = 'user'

    def get_serializer_context(self):
        return {'request': self.request}

    def post (self, request):
        user = request.user
        body = request.data["name"]
        try:
            habit = Habit.objects.create(
                name = body,
                user = user
            )
            print(habit)
            # if not created: 
            #     print("yeah")
            #     return Response(status=status.HTTP_400_BAD_REQUEST, data={'error': 'Error creating a new habit, Please try another name!'})
            log, created = DailyLog.objects.get_or_create(user=user, date=datetime.date.today())
            habit_log = HabitLog.objects.create(habit = habit)
            if created:
                log.habit_logs.add(habit_log)
                log.save()
            else:
                log.habit_logs.add(habit_log)
                serializer = HabitLogSerializer(habit_log)
            return Response(status=status.HTTP_200_OK, data=serializer.data)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST, data={'error': f'{e} Error creating a new habit, Please try again!'})
    

class HabitDetailView(RetrieveUpdateDestroyAPIView):
    serializer_class = HabitSerializer

    def get_queryset(self):
        user = self.request.user
        habits = Habit.objects.filter(user=user)
        return habits


    def get_serializer_context(self):
        return {'request': self.request}
    
class HabitLogView(RetrieveUpdateAPIView):
    serializer_class = HabitLogSerializer
    queryset = HabitLog.objects.all()

    def get_serializer_context(self):
        return {'request': self.request}


class JournalEntriesListView(ListAPIView, CreateAPIView):
    serializer_class = JournalEntrySerializer
    queryset = JournalEntry.objects.all()
    lookup_field = 'user'

    def get_serializer_context(self):
        return {'request': self.request}
    
    def post (self, request):
        user = request.user
        body = request.data["entry"]
        try:
            JournalEntry.objects.create(
                entry = body,
                user = user
            )
            return Response(status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST, data={'error': 'Error creating a new journal entry, Please try again!'})


class JournalEntryView(RetrieveUpdateDestroyAPIView):
    serializer_class = JournalEntrySerializer

    def get_queryset(self):
        user = self.request.user
        entries = JournalEntry.objects.filter(user=user)
        return entries

    def get_serializer_context(self):
        return {'request': self.request}
    
    
class DailyLogDetailView(RetrieveDestroyAPIView):
    serializer_class = DailyLogSerializer

    def get_queryset(self):
        user = self.request.user
        log = DailyLog.objects.filter(user=user)
        return log
    
    def get(self, request, year, month, day):
        user = request.user
        print(user.date_joined)
        try:
            date = datetime.date(year,month,day)
            if date > datetime.date.today():
                return Response(status=status.HTTP_400_BAD_REQUEST, data = {'error': 'Error creating a new daily log.'})
            
            daily_log, created = self.get_queryset().get_or_create(date = date, user=user)
            if date < user.date_joined.date():
                return Response(status=status.HTTP_400_BAD_REQUEST, data={'error': 'You do not have a daily log for this day'})
            
            if created:
                self.create_habits_and_journal_entry_for_daily_log(user, daily_log, date)
            serializer = DailyLogSerializer(daily_log)
            return Response(data=serializer.data) 
        except Exception as e:
            print(e)
            return Response(status=status.HTTP_400_BAD_REQUEST, data={'error': 'Error creating a new habit, Please try again!'})
    
    def delete(self,request,year,month,day):
        date = datetime.date(year,month,day)
        daily_log = get_object_or_404(self.get_queryset(), date=date)
        if daily_log:
            daily_log.delete()
            return Response(status=status.HTTP_200_OK)
        return Response(status=status.HTTP_404_NOT_FOUND, data={"error": "Daily Log cannot be found"})


    def create_habits_and_journal_entry_for_daily_log(self, user: User,daily_log: DailyLog, date: datetime.date):
        habits = Habit.objects.filter(user=user)
        logs = []
        for habit in habits:
            if date >= habit.date_created:
                log = HabitLog.objects.create(habit = habit)
                logs.append(log)
        daily_log.habit_logs.set(logs)
        entry = JournalEntry.objects.create(
            user = user
        )
        daily_log.journal_entry=entry
        daily_log.save()
        

    def get_serializer_context(self):
        return {'request': self.request}

class DailyLogsView(ListAPIView):
    serializer_class = DailyLogSerializer
    
    def get_queryset(self):
        user = self.request.user
        log = DailyLog.objects.filter(user=user)
        return log
    
    def get_serializer_context(self):
        return {'request': self.request}
