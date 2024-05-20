from django.core.exceptions import ValidationError
from rest_framework import status
from rest_framework.views import APIView

from api.services.firebase import send_push_notification
from Authentication.models import User
from Bidding.models import Proposal
from Bidding.serializers import CreateProposalSerializer, ProposalListSerializer, ProposalDetailSerializer
from Booking.models import BaiThue


from Rental.models import Brand
from ultis.api_helper import api_decorator
from ultis.helper import CustomPagination
from Notification.serializers import NotificationSerializer




class CreateProposalAPIView(APIView):
    @api_decorator
    def post(self, request):
        booking_post_id = request.data.get('booking_post_id', None)
        user_id = request.data.get('user_id', None)
        vehicle_id = request.data.get('vehicle_id', None)
        vehicle_status_id = request.data.get('vehicle_status_id', None)
        brand_id = request.data.get('brand_id', None)
        model_id = request.data.get('model_id', None)

        booking_post = BaiThue.objects.get(id=booking_post_id)
        user = User.objects.get(id=user_id)
        brand = Brand.objects.get(id=brand_id)


        serializer = CreateProposalSerializer(data=request.data, context={'request': request})
        if serializer.is_valid(raise_exception=True):
            # if len(Proposal.objects.filter(bookingPost=booking_post)) >= 5:
            #     raise ValidationError(f'Số lượt tham gia đấu giá không được lớn hơn 5')
            #
            # if Proposal.objects.filter(user=user).exists():
            #     raise ValidationError(f'Người dùng đã tham gia báo giá bài viết này')
            #
            # if user.points < 30:
            #     raise ValidationError(f'Tài khoản không đủ điểm để tham gia báo giá (số dư hiện tại: {user.points}đ)')
            #
            # if str(user.id) == str(booking_post.user.id):
            #     raise ValidationError(f'Người dùng không thể tham gia đấu giá bài viết họ đã tạo')

            new_proposal = serializer.save(user=user,

                                           brand=brand,

                                           booking_post=booking_post,
                                          )

            user.points -= 30
            user.save()

            # trans = Transaction.objects.create(user=user, points_change=-30, description='Bidding')
            # trans.save()

            if booking_post.user.device_token:
                title = "Có người báo giá yêu cầu của bạn"
                body = f"{user.__str__()} đã gửi báo giá đến yêu cầu của bạn"

                data = {

                    "router": "postBookingProposal",
                    "index": "0",
                    "type": "booking",
                    "content_id": str(booking_post.id)
                }



                send_push_notification(booking_post.user.device_token, title, body,data,booking_post.user)


            if new_proposal.user.device_token:
                title = "Bạn đã báo giá thành công"
                body = f"Báo giá {booking_post.title} của bạn đã thành công. Số điểm hiện tại của bạn là {user.points} điểm."

                data = {

                    "router": "proposalManager",
                    "index": "0",
                    "type": "booking",
                    "content_id": str(booking_post.id)
                }

                send_push_notification(new_proposal.user.device_token, title, body,data,new_proposal.user)


            data = serializer.data
            return data, "Create proposal successfully", status.HTTP_201_CREATED


class ProposalHistoryAPIView(APIView):
    @api_decorator
    def get(self, request, pk):
        user = User.objects.get(id=pk)
        proposals = Proposal.objects.filter(user=user).order_by('-created_at')
        paginator = CustomPagination()
        result_page = paginator.paginate_queryset(proposals, request)
        serializer = ProposalListSerializer(result_page, many=True, context={'request': request})
        data = paginator.get_paginated_response(serializer.data).data

        return data, "Retrieve data successfully", status.HTTP_200_OK


class ProposalByBookingAPIView(APIView):
    @api_decorator
    def get(self, request, pk):
        booking_post = BaiThue.objects.get(id=pk)
        proposals = Proposal.objects.filter(booking_post=booking_post).order_by('-created_at')
        paginator = CustomPagination()
        result_page = paginator.paginate_queryset(proposals, request)
        serializer = ProposalListSerializer(result_page, many=True, context={'request': request})
        data = paginator.get_paginated_response(serializer.data).data

        return data, "Retrieve data successfully", status.HTTP_200_OK


class ProposalDetailAPIView(APIView):
    @api_decorator
    def get(self, request, pk):
        proposals = Proposal.objects.get(id=pk)
        serializer = ProposalDetailSerializer(proposals, context={'request': request})
        return serializer.data, "Retrieve data successfully", status.HTTP_200_OK


class ProposalApproveAPIView(APIView):
    @api_decorator
    def post(self, request):
        proposal_id = request.data.get('proposal_id', None)

        proposal = Proposal.objects.get(id=proposal_id)
        proposal.status = 'successful'
        proposal.booking_post.status = 'approved'
        proposal.booking_post.save()
        proposal.save()

        if proposal.user.device_token:
            title = f"{proposal.booking_post.user.__str__()} đã đồng ý với báo giá của bạn"
            body = f"Báo giá {proposal.booking_post.title} của bạn đã thành công. Hãy liên hệ với khách hàng để bắt đầu chuyến đi !"

            data = {

                "router": "proposalManager",
                "index": "1",
                "type": "booking",
                "content_id": str(proposal.booking_post.id)
            }


            send_push_notification(proposal.user.device_token, title, body,data,proposal.user)



        others_proposal = Proposal.objects.filter(booking_post=proposal.booking_post)
        for p in [x for x in others_proposal if x != proposal]:
            p.status = 'failed'
            p.save()

            if p.user.device_token:
                title = f"Báo giá của bạn đã bị từ chối"
                body = f"Báo giá {p.booking_post.title} của bạn đến khách hàng đã bị từ chối"

                data = {

                    "router": "proposalManager",
                    "index": "2",
                    "type": "booking",
                    "content_id": str(p.booking_post.id)
                }

                send_push_notification(p.user.device_token, title, body,data,p.user)


        return {}, "Approve proposal successfully", status.HTTP_200_OK


class ProposalRejectAPIView(APIView):
    @api_decorator
    def post(self, request):
        proposal_id = request.data.get('proposal_id', None)

        proposal = Proposal.objects.get(id=proposal_id)
        proposal.status = 'failed'
        proposal.save()

        if proposal.user.device_token:
            title = f"Báo giá của bạn đã bị từ chối"
            body = f"Báo giá {proposal.booking_post.title} của bạn đến khách hàng đã bị từ chối"

            data={}
            send_push_notification(proposal.user.device_token, title, body,proposal.user)


        return {}, "Reject proposal successfully", status.HTTP_200_OK




