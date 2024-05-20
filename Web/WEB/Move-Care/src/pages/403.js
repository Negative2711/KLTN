import { m } from 'framer-motion';
// next
import Head from 'next/head';
import NextLink from 'next/link';
// @mui
import { Button, Typography } from '@mui/material';
// layouts
import CompactLayout from '../layouts/compact';
// components
import { MotionContainer, varBounce } from '../components/animate';
// assets
import { ForbiddenIllustration } from '../assets/illustrations';
//link con
import { linkIcon,nameApp } from 'src/config-global';
// ----------------------------------------------------------------------

Page403.getLayout = (page) => <CompactLayout>{page}</CompactLayout>;

// ----------------------------------------------------------------------

export default function Page403() {
  return (
    <>
      <Head>
        <title> 403 Cấm | {nameApp}</title>
        <link rel="icon" type="image/png" href="/favicon/favicon-32x32.png"/> 
      </Head>

      <MotionContainer>
        <m.div variants={varBounce().in}>
          <Typography variant="h3" paragraph>
            Bạn không có quyền truy cập trang này
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <Typography sx={{ color: 'text.secondary' }}>
            Trang bạn đang cố truy cập có quyền truy cập bị hạn chế.
            <br />
            Vui lòng tham khảo quản trị viên hệ thống của bạn
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <ForbiddenIllustration sx={{ height: 260, my: { xs: 5, sm: 10 } }} />
        </m.div>

        <Button component={NextLink} href="/" size="large" variant="contained">
          Đi đến trang chủ
        </Button>
      </MotionContainer>
    </>
  );
}
