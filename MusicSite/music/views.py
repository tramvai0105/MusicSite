from django.shortcuts import render
from django.views import View
from django.http import JsonResponse

from .models import Song, Album, Author


def author_view(request, author_name):
    albums = Album.objects.filter(author__name=author_name)
    author = Author.objects.get(name=author_name)
    context = {
            "albums": albums,
            "author": author
    }
    return render(request, "music/authorpage.html", context)


def album_view(request, album_url):
    album = Album.objects.get(page_url=album_url)
    songs = album.song_set.all()
    context = {
            "album": album,
            "songs": songs
    }
    return render(request, 'music/albumpage.html', context)


def album_json(self, album_url):
    album = Album.objects.get(page_url=album_url)
    songs = album.song_set.all()
    data = list(songs.values())
    return JsonResponse(data, safe=False)

