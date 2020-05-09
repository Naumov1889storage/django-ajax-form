from base.forms import ContactForm

def contact_processor(request):
    return {'contact_form': ContactForm}