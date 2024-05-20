// next
import Head from 'next/head';
import NextLink from 'next/link';
// @mui
import { Link, Typography } from '@mui/material';
// routes
import { PATH_AUTH } from '../../routes/paths';
// layouts
import CompactLayout from '../../layouts/compact';
// components
import Iconify from '../../components/iconify';
// sections
import AuthResetPasswordForm from '../../sections/auth/AuthResetPasswordForm';
// assets
import { PasswordIcon } from '../../assets/icons';

//config
import { nameApp } from 'src/config-global';

// ----------------------------------------------------------------------

ResetPasswordPage.getLayout = (page) => <CompactLayout>{page}</CompactLayout>;

// ----------------------------------------------------------------------

export default function ResetPasswordPage() {
  return (
    <>
      <Head>
        <title> Quên mật khẩu | {nameApp}</title>
      </Head>

      <PasswordIcon sx={{ mb: 5, height: 96 }} />

      <Typography variant="h3" paragraph>
        Bạn quên mật khẩu?
      </Typography>

      <Typography sx={{ color: 'text.secondary', mb: 5 }}>
        Vui lòng nhập địa chỉ email và chúng tôi sẽ gửi cho bạn thông tin khôi phục tài khoản.
      </Typography>

      <AuthResetPasswordForm />

      <Link
        component={NextLink}
        href={PATH_AUTH.login}
        color="inherit"
        variant="subtitle2"
        sx={{
          mt: 3,
          mx: 'auto',
          alignItems: 'center',
          display: 'inline-flex',
        }}
      >
        <Iconify icon="eva:chevron-left-fill" width={16} />
        Quay lại trang đăng nhập
      </Link>
    </>
  );
}
