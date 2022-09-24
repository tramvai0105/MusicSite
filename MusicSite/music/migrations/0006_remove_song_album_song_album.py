# Generated by Django 4.0.4 on 2022-09-19 16:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('music', '0005_album_page_url_song_albumname_alter_album_name_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='song',
            name='album',
        ),
        migrations.AddField(
            model_name='song',
            name='album',
            field=models.ManyToManyField(to='music.album'),
        ),
    ]
