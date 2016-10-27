from django.conf.urls import include, url

from django.contrib import admin
admin.autodiscover()

import website.views

# Examples:
# url(r'^$', 'gettingstarted.views.home', name='home'),
# url(r'^blog/', include('blog.urls')),

urlpatterns = [
	url(r'^$', website.views.homePage, name='website_home'),
    url(r'^admin/', include(admin.site.urls))
]
