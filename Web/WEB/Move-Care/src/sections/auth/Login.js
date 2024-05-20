// next
import NextLink from 'next/link';
// @mui
import { Alert, Tooltip, Stack, Typography, Link, Box } from '@mui/material';
// auth
import { useAuthContext } from '../../auth/useAuthContext';
// layouts
import LoginLayout from '../../layouts/login';
// routes
import { PATH_AUTH } from '../../routes/paths';
//
import AuthLoginForm from './AuthLoginForm';
import { nameApp } from 'src/config-global';

//Main Login Form  ( right)

// ----------------------------------------------------------------------

export default function Login() {
  const { method } = useAuthContext();

  return (
    <LoginLayout>
      <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
        <Typography variant="h4">Đăng nhập với tài khoản {nameApp}</Typography>
        <Typography
          variant="h9"
          sx={{
            color: 'red', // Thay đổi màu sắc thành đỏ
          }}
        >
          * Trang này chỉ dành cho nhân viên
        </Typography>

        <Stack direction="row" spacing={0.5}>
          <Typography variant="body2">Người dùng mới ? </Typography>

          <Link component={NextLink} href={"#"} variant="subtitle2">
            Liên hệ quản lí của bạn
          </Link>
        </Stack>
        {/* 
        <Tooltip title={method} placement="left">
          <Box
            component="img"
            alt={method}
            src={`/assets/icons/auth/ics_${method}.png`}
            sx={{ width: 32, height: 32, position: 'absolute', right: 0 }}
          />
        </Tooltip> */}
      </Stack>

      <Alert severity="info" sx={{ mb: 3 }}>
        Use email : <strong>admin@admin</strong> / password :<strong>123456</strong>
      </Alert>

      <AuthLoginForm />
    </LoginLayout>
  );
}
