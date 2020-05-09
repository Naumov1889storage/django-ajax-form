from django.http import JsonResponse
from django.shortcuts import render, redirect
from base.forms import ContactForm

def contact(request):
    form = ContactForm()

    if request.is_ajax():
        form = ContactForm(request.POST)
        if form.is_valid():
            data = {
                'name': form.cleaned_data['name'],
                'phone': form.cleaned_data['phone'],
                'email': form.cleaned_data['email'],
                'message': form.cleaned_data['message']
            }

            return JsonResponse({'success': data})
        else:
            return JsonResponse({'errors': form.errors})

    return redirect(request.POST.get('url_form'))  # just so. Not really functional


def home_page(request):
    return render(request, 'base/base.html')
