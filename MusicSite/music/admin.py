from django.contrib import admin
from .models import Song, Album

admin.site.register([Song, Album])


