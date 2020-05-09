from django import forms

class ContactForm(forms.Form):
    name = forms.CharField(max_length=100, min_length=2)
    phone = forms.CharField(max_length=70, min_length=1)
    email = forms.EmailField(max_length=100, min_length=4)
    message = forms.CharField(widget=forms.Textarea, max_length=2000)

    def clean(self):
        cleaned_data = super().clean()

        if cleaned_data.get('name') == 'Максим':
            self.add_error('name', 'Ну и имя, введи другое')

        return cleaned_data
