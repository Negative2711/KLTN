// next
import NextLink from 'next/link';
// @mui
import { Stack, Typography, Link } from '@mui/material';
// layouts
import LoginLayout from '../../layouts/login';
// routes
import { PATH_AUTH } from '../../routes/paths';
//

import AuthRegisterForm from './AuthRegisterForm';

// ----------------------------------------------------------------------

export default function  Register() {
  return (
    <LoginLayout title="Manage the job more effectively with Minimal">
      <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
        <Typography variant="h4">Get started absolutely free.</Typography>

        <Stack direction="row" spacing={0.5}>
          <Typography variant="body2"> Bạn đã có tài khoản? </Typography>

          <Link component={NextLink} href={PATH_AUTH.login} variant="subtitle2">
            Đăng nhập
          </Link>
        </Stack>
      </Stack>

      <AuthRegisterForm />



    </LoginLayout>
  );
}
