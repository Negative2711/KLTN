# v1
FROM python:3.9

# Cập nhật pip lên phiên bản mới nhất
RUN python -m pip install --upgrade pip

# Tạo thư mục làm việc /app trong container
WORKDIR /app

# Sao chép tệp requirements.txt vào thư mục /app
COPY requirements.txt /app/

# Cài đặt các gói phụ thuộc từ requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Sao chép mã nguồn Django vào thư mục /app
COPY . /app/

# Tạo virtual environment và activate nó
RUN python -m venv venv
RUN . venv/bin/activate

# Thực hiện migrate cho cơ sở dữ liệu
RUN python manage.py migrate

# Expose port 8000 (hoặc port bạn muốn sử dụng cho Django)
EXPOSE 8000

# Khởi động ứng dụng Django
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
