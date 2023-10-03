# Generated by Django 4.2.5 on 2023-10-03 13:49

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("lottery", "0003_rename_ballot_lottery_ballots"),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name="lotterywinner",
            unique_together={("user", "lottery")},
        ),
    ]
