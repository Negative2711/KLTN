// next
import Head from 'next/head';
import { useRouter } from 'next/router';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// _mock_
import { _invoices } from '../../../../_mock/arrays';
// layouts
import DashboardLayout from '../../../../layouts/dashboard';
// components
import { useSettingsContext } from '../../../../components/settings';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
// sections
import InvoiceDetails from '../../../../sections/@dashboard/invoice/details';
import { nameApp } from 'src/config-global';
import axios from 'axios'
import {useState,useEffect} from 'react'

import { API_ROOT } from 'src/config-global';


// ----------------------------------------------------------------------
//

InvoiceDetailsPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function InvoiceDetailsPage() {
  const { themeStretch } = useSettingsContext();
  const [currentInvoice, setCurrentInvoice] = useState(null)

  const {
    query: { id },
  } = useRouter();
  const API_INVO_DETAIL = API_ROOT + `transaction/giaodich/${id}/`


  useEffect(() => {
    const fetchInvoiceData = async () => {
      try {
        const response = await axios.get(API_INVO_DETAIL);
        setCurrentInvoice(response.data);
        console.log(response.data.id); // logging the invoice id from response data
      } catch (error) {
        console.error('Error fetching invoice data:', error);
      }
    };

    fetchInvoiceData();
  }, []); 

  return (
    <>
      <Head>
        <title> Giao dịch | {nameApp}</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Chi tiết giao dịch"
          links={[
            { name: 'Bảng điều khiển', href: PATH_DASHBOARD.root },
            {
              name: 'Giao dịch',
              href: PATH_DASHBOARD.invoice.root,
            },
            { name: `MGG: -${currentInvoice?.id}` },
          ]}
        />

        <InvoiceDetails invoice={currentInvoice} />
      </Container>
    </>
  );
}
