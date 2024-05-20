// next
import Head from 'next/head';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// layouts
import DashboardLayout from '../../../layouts/dashboard';
// components
import { useSettingsContext } from '../../../components/settings';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
// sections
import { BlogNewPostForm } from '../../../sections/@dashboard/blog';
import { nameApp } from 'src/config-global';

// ----------------------------------------------------------------------

BlogNewPostPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function BlogNewPostPage() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Head>
        <title> Blog: Bài viết mới |{nameApp}</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Tạo bài viết mới"
          links={[
            {
              name: 'Bảng điều khiển',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Bài viết',
              href: PATH_DASHBOARD.blog.root,
            },
            {
              name: 'Tạo bài mới',
            },
          ]}
        />

        <BlogNewPostForm />
      </Container>
    </>
  );
}
