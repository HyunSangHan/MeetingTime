# Generated by Django 2.2.1 on 2019-07-24 09:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('meeting', '0008_auto_20190723_2303'),
    ]

    operations = [
        migrations.AddField(
            model_name='joineduser',
            name='already_met_one',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='joineduser',
            name='already_met_three',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='joineduser',
            name='already_met_two',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
