from django.shortcuts import render
from django.views import View
from django.http import JsonResponse

from .models import Song, Album

class LspView(View):
    def get(self, request):
        albums = Album.objects.all()
        context = {
            "albums": albums
        }
        return render(request, "music/authorpage.html", context)

class MagicCityView(View):

    def get(self, request):
        album = Album.objects.get(name="Magic City")
        songs = album.song_set.all()
        context = {
            "songs": songs
        }
        return render(request, 'music/albumpage.html', context)

class MagicCityJson(View):
    def get(self, request):
        album = Album.objects.get(name="Magic City")
        songs = album.song_set.all()
        data = list(songs.values())
        return JsonResponse(data, safe=False)

