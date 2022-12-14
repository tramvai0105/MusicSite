# Generated by Django 4.0.4 on 2022-09-19 15:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('music', '0003_song_album_alter_song_author_alter_song_name'),
    ]

    operations = [
        migrations.CreateModel(
            name='Album',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('author', models.CharField(default='Author name', max_length=40)),
                ('name', models.CharField(default='Song name', max_length=40)),
                ('albumcover', models.ImageField(upload_to='images/albumcovers/')),
            ],
        ),
    ]
