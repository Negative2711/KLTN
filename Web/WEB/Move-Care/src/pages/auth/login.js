// next
import Head from 'next/head';
// auth
import GuestGuard from '../../auth/GuestGuard';
// sections
import Login from '../../sections/auth/Login';
// import Login from '../../sections/auth/LoginAuth0';

// config
import { nameApp, linkIcon } from 'src/config-global';

// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <>
      <Head>
        <title> Đăng nhập | {nameApp}</title>
        <link rel='icon' href={linkIcon}/>
      </Head>

      <GuestGuard>
        <Login />
      </GuestGuard>
    </>
  );
}
