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
import UserNewEditForm from '../../../sections/@dashboard/user/UserNewEditForm';
import { nameApp } from 'src/config-global';

// ----------------------------------------------------------------------

UserCreatePage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function UserCreatePage() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Head>
        <title> Khách hàng: Tạo khách hàng mới | {nameApp}</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Tạo Khách hàng mới"
          links={[
            {
              name: 'Bảng điều khiển',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'User',
              href: PATH_DASHBOARD.user.list,
            },
            { name: 'Khách hàng mới' },
          ]}
        />
        <UserNewEditForm />
      </Container>
    </>
  );
}
