from ballot import views as ballot_viewsets
from django.contrib import admin
from django.urls import include, path, re_path
from django.views.generic import TemplateView
from lottery import views as lottery_viewsets
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.register(r"ballot", ballot_viewsets.BallotViewSet, basename="ballot")
router.register(r"lottery", lottery_viewsets.LotteryViewSet, basename="lottery")
router.register(
    r"lottery-winner", lottery_viewsets.LotteryWinnerViewSet, basename="lottery-winner"
)

urlpatterns = router.urls

urlpatterns = [
    path("admin/", admin.site.urls),
    path("access/", include("access.urls")),
    path("api/", include(urlpatterns)),
    re_path(
        r".*",
        TemplateView.as_view(template_name="frontend/index.html"),
        name="frontend",
    ),
]
