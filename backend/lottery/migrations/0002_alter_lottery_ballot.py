# Generated by Django 4.2.5 on 2023-10-02 10:20

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("ballot", "0003_alter_ballot_lottery"),
        ("lottery", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="lottery",
            name="ballot",
            field=models.ManyToManyField(
                related_name="ballots",
                through="ballot.Ballot",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
    ]