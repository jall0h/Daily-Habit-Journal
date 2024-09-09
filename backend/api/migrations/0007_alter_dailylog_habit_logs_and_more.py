# Generated by Django 4.2.13 on 2024-08-23 17:44

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_alter_dailylog_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='dailylog',
            name='habit_logs',
            field=models.ManyToManyField(null=True, to='api.habitlog'),
        ),
        migrations.AlterField(
            model_name='dailylog',
            name='journal_entry',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='api.journalentry'),
        ),
    ]
