from django.db import models


class Song(models.Model):
    author = models.CharField(blank=False, default="Author name", max_length=40)
    name = models.CharField(blank=False, default="Song name", max_length=40)
    songfile = models.FileField(blank=False, upload_to="songs")
    songcover = models.ImageField(blank=False, upload_to="images/songcovers/")
    albumname = models.CharField(blank=False, default="album name", max_length=40)
    album = models.ManyToManyField('Album')

    def __str__(self):
        return self.name


class Album(models.Model):
    author_name = models.CharField(blank=False, default="Author name", max_length=40)
    name = models.CharField(blank=False, default="album name", max_length=40, db_index=True)
    albumcover = models.ImageField(blank=False, upload_to="images/albumcovers/")
    page_url = models.CharField(blank=True, default='Albums page url', max_length=140)
    albumdisc = models.CharField(blank=False, default="best album", max_length=60)
    author = models.ManyToManyField('Author')

    def __str__(self):
        return self.name


class Author(models.Model):
    name = models.CharField(blank=False, default="Author name", max_length=40)
    authorcover = models.ImageField(blank=False, upload_to="images/authorcovers/")
    page_url = models.CharField(blank=True, default='Author page url', max_length=140)
    authordisc = models.CharField(blank=False, default="best musician", max_length=200)

    def __str__(self):
        return self.name
