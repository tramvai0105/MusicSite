from django.contrib import admin
from .models import Song, Album, Author

admin.site.register([Song, Album, Author])


