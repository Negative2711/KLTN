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
import { PageNotFoundIllustration } from '../assets/illustrations';

// config
import { nameApp } from 'src/config-global';

// ----------------------------------------------------------------------

Page404.getLayout = (page) => <CompactLayout>{page}</CompactLayout>;

// ----------------------------------------------------------------------

export default function Page404() {
  return (
    <>
      <Head>
        <title> 404 Không tìm thấy | {nameApp}</title>
        <link rel="icon" type="image/png" href="/favicon/favicon-32x32.png"/> 
      </Head>

      <MotionContainer>
        <m.div variants={varBounce().in}>
          <Typography variant="h3" paragraph>
            Xin lỗi trang bạn chọn không tồn tại !!!
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <Typography sx={{ color: 'text.secondary' }}>
          Xin lỗi, chúng tôi không thể tìm thấy trang bạn đang tìm kiếm. Có lẽ bạn đã gõ nhầm URL?.
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <PageNotFoundIllustration
            sx={{
              height: 260,
              my: { xs: 5, sm: 10 },
            }}
          />
        </m.div>

        <Button component={NextLink} href="/" size="large" variant="contained">
          Đi đến trang chủ
        </Button>
      </MotionContainer>
    </>
  );
}
