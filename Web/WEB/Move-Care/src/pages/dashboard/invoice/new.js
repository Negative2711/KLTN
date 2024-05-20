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
import InvoiceNewEditForm from '../../../sections/@dashboard/invoice/form';

// ----------------------------------------------------------------------

InvoiceCreatePage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function InvoiceCreatePage() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Head>
        <title> Invoices: Create a new invoice | Minimal UI</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Tạo giao dịch mới"
          links={[
            {
              name: 'Bảng điều khiển',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Giao dịcg',
              href: PATH_DASHBOARD.invoice.list,
            },
            {
              name: 'Tạo giao dịch mới',
            },
          ]}
        />

        <InvoiceNewEditForm />
      </Container>
    </>
  );
}
