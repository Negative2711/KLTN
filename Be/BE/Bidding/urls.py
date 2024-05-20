from django.urls import path

from Bidding.views import CreateProposalAPIView, ProposalHistoryAPIView, ProposalDetailAPIView, \
    ProposalByBookingAPIView, ProposalApproveAPIView,ProposalRejectAPIView

urlpatterns = [
    path('proposal/create/', CreateProposalAPIView.as_view()),
    path('proposal/history/<uuid:pk>/', ProposalHistoryAPIView.as_view()),
    path('proposal/booking/<uuid:pk>/', ProposalByBookingAPIView.as_view()),
    path('proposal/detail/<uuid:pk>/', ProposalDetailAPIView.as_view()),
    path('proposal/approve/', ProposalApproveAPIView.as_view()),
    path('proposal/reject/', ProposalRejectAPIView.as_view()),
]