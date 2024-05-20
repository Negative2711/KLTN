// next
import Head from 'next/head';
// @mui
import { useTheme } from '@mui/material/styles';
import { Container, Grid, Button } from '@mui/material';
// auth
import { useAuthContext } from '../../auth/useAuthContext';
// layouts
import DashboardLayout from '../../layouts/dashboard';
// _mock_
import {
  _ecommerceNewProducts,
  _ecommerceSalesOverview,
  _ecommerceBestSalesman,
  _ecommerceLatestProducts,
} from '../../_mock/arrays';
// components
import { useSettingsContext } from '../../components/settings';
// sections
import {
  EcommerceNewProducts,
  EcommerceYearlySales,
  
  EcommerceSaleByGender,
  EcommerceWidgetSummary,

} from '../../sections/@dashboard/general/e-commerce';

// assets
import { MotivationIllustration } from '../../assets/illustrations';
import { nameApp } from 'src/config-global';

// ----------------------------------------------------------------------

GeneralEcommercePage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function GeneralEcommercePage() {
  const { user } = useAuthContext();

  const theme = useTheme();

  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Head>
        <title> Chung: Thống kê | {nameApp}</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <EcommerceWidgetSummary
              title="Tổng giao dịch"
              percent={2.6}
              total={765}
              chart={{
                colors: [theme.palette.primary.main],
                series: [22, 8, 35, 50, 82, 84, 77, 12, 87, 43],
              }}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <EcommerceWidgetSummary
              title="Tổng thu"
              percent={-0.1}
              total={18765}
              chart={{
                colors: [theme.palette.info.main],
                series: [56, 47, 40, 62, 73, 30, 23, 54, 67, 68],
              }}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <EcommerceWidgetSummary
              title="Lợi nhuận"
              percent={0.6}
              total={4876}
              chart={{
                colors: [theme.palette.warning.main],
                series: [40, 70, 75, 70, 50, 28, 7, 64, 38, 27],
              }}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <EcommerceSaleByGender
              title="Doanh số theo nhóm khách hàng"
              total={2324}
              chart={{
                series: [
                  { label: 'Người lao động', value: 44 },
                  { label: 'Người Thuê', value: 75 },
                ],
              }}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <EcommerceYearlySales
              title="Doanh thu hàng năm"
              subheader="(+43%) so với năm ngoái"
              chart={{
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
                series: [
                  {
                    year: '2023',
                    data: [
                      { name: 'Tổng thu nhập', data: [10, 41, 35, 151, 49, 62, 69, 91, 48] },
                      { name: 'Tổng chi phí', data: [10, 34, 13, 56, 77, 88, 99, 77, 45] },
                    ],
                  },
                  {
                    year: '2024',
                    data: [
                      { name: 'Tổng thu nhập', data: [148, 91, 69, 62, 49, 51, 35, 41, 10] },
                      { name: 'Tổng chi phí', data: [45, 77, 99, 88, 77, 56, 13, 34, 10] },
                    ],
                  },
                ],
              }}
            />
          </Grid>

         

    

          <Grid item xs={12} md={6} lg={8}>
          
          </Grid>

        
        </Grid>
      </Container>
    </>
  );
}
