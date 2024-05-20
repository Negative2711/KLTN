// next
import Head from 'next/head';
// @mui
import { Box } from '@mui/material';
// layouts
import MainLayout from '../layouts/main';
// components
import ScrollProgress from '../components/scroll-progress';

// link icon
import { linkIcon } from 'src/config-global';
// sections

import {
  HomeHero,
  HomeMinimal,
  HomeForDesigner,
  HomePricingPlans,
  HomeAdvertisement,
 

} from '../sections/home';
// config
import { nameApp } from 'src/config-global';
// ----------------------------------------------------------------------

HomePage.getLayout = (page) => <MainLayout> {page} </MainLayout>;

// ----------------------------------------------------------------------

export default function HomePage() {
  return (
    <>
      <Head>
        <title> Trang chủ | {nameApp}</title>
        

        <link rel="icon" type="image/png" href={linkIcon}/>        
        
      </Head>

      <ScrollProgress />

      <HomeHero />

      <Box
        sx={{
          overflow: 'hidden',
          position: 'relative',
          bgcolor: 'background.default',
        }}
      >
        <HomeMinimal />
        <HomeForDesigner />
        <HomePricingPlans />
        <HomeAdvertisement />
      </Box>
    </>
  );
}
