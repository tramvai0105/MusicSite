# Generated by Django 4.0.4 on 2022-09-19 13:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('music', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='song',
            name='title',
        ),
        migrations.AddField(
            model_name='song',
            name='author',
            field=models.CharField(default='loh', max_length=40),
        ),
        migrations.AddField(
            model_name='song',
            name='name',
            field=models.CharField(default='pidor', max_length=40),
        ),
        migrations.AddField(
            model_name='song',
            name='songcover',
            field=models.ImageField(default='lsp', upload_to='images/songcovers/'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='song',
            name='songfile',
            field=models.FileField(default='lsp', upload_to='songs/'),
            preserve_default=False,
        ),
    ]
