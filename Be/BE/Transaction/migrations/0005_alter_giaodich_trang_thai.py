# Generated by Django 4.2.3 on 2024-04-24 16:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Transaction', '0004_alter_giaodich_thoi_gian_lam_viec_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='giaodich',
            name='trang_thai',
            field=models.CharField(choices=[('waiting', 'Chờ xác nhận'), ('process', 'Đang tiến hành'), ('successful', 'Thành công'), ('cancel', 'Hủy bỏ')], default='Chờ xác nhận', max_length=20),
        ),
    ]