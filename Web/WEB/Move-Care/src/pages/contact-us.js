// next
import Head from 'next/head';
// @mui
import { Container, Box } from '@mui/material';
// layouts
import MainLayout from '../layouts/main';
// _mock
import { _mapContact } from '../_mock/arrays';
// sections
import { ContactHero, ContactForm, ContactMap } from '../sections/contact';
import { nameApp } from 'src/config-global';

// ----------------------------------------------------------------------

ContactPage.getLayout = (page) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function ContactPage() {
  return (
    <>
      <Head>
        <title> Liên hệ | {nameApp}</title>
        <link rel="icon" type="image/png" href="/favicon/favicon-32x32.png"/> 
      </Head>

      <ContactHero />

      <Container sx={{ py: 10 }}>
        <Box
          gap={10}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            md: 'repeat(2, 1fr)',
          }}
        >
          <ContactForm />

        
        </Box>
      </Container>
    </>
  );
}
