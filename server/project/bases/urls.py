from django.urls import include, path
from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'vagas', views.VagaViewSet)
router.register(r'candidaturas', views.CandidaturaViewSet)
router.register(r'familias', views.FamiliaViewSet)
router.register(r'agencias', views.AgenciaViewSet)
router.register(r'au-pairs', views.AuPairViewSet)
router.register(r'caracteristicas', views.CaracteristicaViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
