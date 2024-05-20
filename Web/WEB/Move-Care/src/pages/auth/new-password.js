// next
import Head from 'next/head';
import NextLink from 'next/link';
// @mui
import { Link, Typography } from '@mui/material';
// layouts
import CompactLayout from '../../layouts/compact';
// routes
import { PATH_AUTH } from '../../routes/paths';
// components
import Iconify from '../../components/iconify';
// sections
import AuthNewPasswordForm from '../../sections/auth/AuthNewPasswordForm';
// assets
import { SentIcon } from '../../assets/icons';

import { nameApp } from 'src/config-global';

// ----------------------------------------------------------------------

NewPasswordPage.getLayout = (page) => <CompactLayout>{page}</CompactLayout>;

// ----------------------------------------------------------------------

export default function NewPasswordPage() {
  return (
    <>
      <Head>
        <title> Mật khẩu mới | {nameApp}</title>
      </Head>

      <SentIcon sx={{ mb: 5, height: 96 }} />

      <Typography variant="h3" paragraph>
        Yêu cầu được gửi thành công!
      </Typography>

      <Typography sx={{ color: 'text.secondary', mb: 5 }}>
      Chúng tôi đã gửi email xác nhận gồm 6 chữ số tới email của bạn.
        <br />
        Vui lòng nhập mã vào ô bên dưới để xác minh email của bạn.
      </Typography>

      <AuthNewPasswordForm />

      <Typography variant="body2" sx={{ my: 3 }}>
        Không nhận được mã ? 
        <Link variant="subtitle2"> Gửi lại</Link>
      </Typography>

      <Link
        component={NextLink}
        href={PATH_AUTH.login}
        color="inherit"
        variant="subtitle2"
        sx={{
          mx: 'auto',
          alignItems: 'center',
          display: 'inline-flex',
        }}
      >
        <Iconify icon="eva:chevron-left-fill" width={16} />
        Trở lại trang đăng nhập
      </Link>
    </>
  );
}
