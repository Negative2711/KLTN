# Generated by Django 4.2.3 on 2024-02-29 08:08

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Rental', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='rentalpost',
            old_name='details',
            new_name='chi_tiet',
        ),
        migrations.RenameField(
            model_name='rentalpost',
            old_name='created_at',
            new_name='ngay_khoi_tao',
        ),
        migrations.RenameField(
            model_name='rentalpost',
            old_name='title',
            new_name='tieu_de',
        ),
        migrations.RenameField(
            model_name='rentalpost',
            old_name='status',
            new_name='trang_thai',
        ),
        migrations.RemoveField(
            model_name='rentalpost',
            name='allows_pet',
        ),
        migrations.RemoveField(
            model_name='rentalpost',
            name='image_desc2',
        ),
        migrations.RemoveField(
            model_name='rentalpost',
            name='image_desc3',
        ),
        migrations.RemoveField(
            model_name='rentalpost',
            name='image_desc4',
        ),
        migrations.RemoveField(
            model_name='rentalpost',
            name='image_desc5',
        ),
    ]