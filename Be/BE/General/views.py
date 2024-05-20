from rest_framework import status
from rest_framework.views import APIView
from ultis.api_helper import api_decorator
from ultis.helper import get_full_image_url
from .models import Location, Vehicle, Demand, VehicleStatus, VersionRelease
from .serializers import CitySerializer, DemandSerializer, StatusSerializer, VersionReleaseSerializer



class CityAPIView(APIView):
    @api_decorator
    def get(self, request):
        cities = Location.objects.all()
        serializer = CitySerializer(cities, many=True)
        data = serializer.data

        main_group = []
        sub_group = []

        for item in data:
            if item['division_type'] == 'trung ương':
                item['image_url'] = get_full_image_url(request, item["image_url"])
                main_group.append(item)
            else:
                item.pop('image_url', None)
                sub_group.append(item)

        result = {
            'main_group': sorted(main_group, key=lambda x: x['position']),
            'sub_group': sorted(sub_group, key=lambda x: x['name'])
        }

        return result, "Retrieve data successfully", status.HTTP_200_OK


class VehicleAPIView(APIView):
    @api_decorator
    def get(self, request):
        vehicle = Vehicle.objects.all()
        serializer = CitySerializer(vehicle, many=True)
        data = serializer.data
        for x in data:
            x['image_url'] = get_full_image_url(request, x["image_url"])

        data = sorted(data, key=lambda x: x['position'])

        return data, "Retrieve data successfully", status.HTTP_200_OK


class DemandAPIView(APIView):
    @api_decorator
    def get(self, request):
        demands = Demand.objects.all()
        serializer = DemandSerializer(demands, many=True)
        data = serializer.data
        return data, "Retrieve data successfully", status.HTTP_200_OK


class StatusAPIView(APIView):
    @api_decorator
    def get(self, request):
        demands = VehicleStatus.objects.all()
        serializer = StatusSerializer(demands, many=True)
        data = serializer.data
        data = sorted(data, key=lambda x: x['position'])
        return data, "Retrieve data successfully", status.HTTP_200_OK


class CurrentLocationAPIView(APIView):
    pass
    # @api_decorator
    # def get(self, request):
    #     try:
    #         latitude = self.request.data.get('latitude')
    #         longitude = self.request.data.get('longitude')
    #
    #         latitude = float(latitude)
    #         longitude = float(longitude)
    #
    #         # Sử dụng thư viện geopy để chuyển đổi tọa độ thành địa chỉ
    #         geolocator = Nominatim(user_agent="location_api")
    #         location = geolocator.reverse((latitude, longitude), language='vi')
    #
    #         # Lấy thông tin về tỉnh/thành phố từ đối tượng location
    #         # Cái này nó trả về lung tung
    #         address_info = location.raw.get('address', {})
    #
    #         # Trả về tên tỉnh/thành phố
    #         # Mỗi tỉnh thành sẽ có mỗi thuộc tính khác nhau nên xu li
    #         city_name = (address_info.get('city') or
    #                      address_info.get('state') or
    #                      address_info.get('town') or
    #                      address_info.get('village'))
    #         response_data = {
    #             'location': city_name,
    #             'postcode': address_info.get('postcode')
    #         }
    #         return response_data, "Retrieve data successfully", status.HTTP_200_OK
    #
    #     except ValueError:
    #         return {}, "Invalid latitude or longitude", status.HTTP_400_BAD_REQUEST


class VersionReleaseAPIView(APIView):
    @api_decorator
    def get(self, request):
        version = VersionRelease.objects.all()
        serializer = VersionReleaseSerializer(version, many=True)
        data = serializer.data
        return data, "Retrieve data successfully", status.HTTP_200_OK


class UpdateVersionReleaseAPIView(APIView):
    @api_decorator
    def post(self, request, pk):
        version = VersionRelease.objects.get(id=pk)

        version.version_ios = request.data.get('version_ios')
        version.version_apk = request.data.get('version_apk')
        version.url_ios = request.data.get('url_ios')
        version.url_apk = request.data.get('url_apk')
        version.save()
        return {}, "Update data successfully", status.HTTP_200_OK
