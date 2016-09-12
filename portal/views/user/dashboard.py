from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from portal.views.user.top_portfolios import get_top_portfolios
from django.middleware.csrf import rotate_token
@login_required
def dashboard(request):
  rotate_token(request)
  html = get_top_portfolios(request, 'user/dashboard.html')
  return HttpResponse(html)
