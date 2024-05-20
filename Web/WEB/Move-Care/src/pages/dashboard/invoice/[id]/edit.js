// next
import Head from 'next/head';
import { useRouter } from 'next/router';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// layouts
import DashboardLayout from '../../../../layouts/dashboard';
// _mock_
import { _invoices } from '../../../../_mock/arrays';
// components
import { useSettingsContext } from '../../../../components/settings';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
// sections
import InvoiceNewEditForm from '../../../../sections/@dashboard/invoice/form';

// ----------------------------------------------------------------------
import { API_ROOT,appName } from 'src/config-global';
InvoiceEditPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function InvoiceEditPage() {
  const { themeStretch } = useSettingsContext();

  const {
    query: { id },
  } = useRouter();

  const currentInvoice = _invoices.find((invoice) => invoice.id === id);

  return (
    <>
      <Head>
        <title> Giao dịch: Chỉnh sửa | {appName}</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Quản lý giao dịch"
          links={[
            {
              name: 'Bảng điều khiển',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Giao dịch',
              href: PATH_DASHBOARD.invoice.list,
            },
            { name: `GD-${currentInvoice?.invoiceNumber}` },
          ]}
        />

        <InvoiceNewEditForm isEdit currentInvoice={currentInvoice} />
      </Container>
    </>
  );
}
