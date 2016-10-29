from django.shortcuts import render

# Create your views here.
@xframe_options_exempt
def homePage(request):
	return render(request, 'index.html')