from django.urls import path
from base.views import home_page, contact

urlpatterns = [
    path('', home_page, name="home_page"),
    path('contact/', contact, name="contact")
]
