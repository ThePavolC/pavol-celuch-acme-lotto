# Generated by Django 4.2.5 on 2023-10-02 10:23

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("lottery", "0002_alter_lottery_ballot"),
    ]

    operations = [
        migrations.RenameField(
            model_name="lottery",
            old_name="ballot",
            new_name="ballots",
        ),
    ]
