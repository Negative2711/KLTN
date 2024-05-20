// routes
import { PATH_AUTH, PATH_DOCS, PATH_PAGE } from '../../../routes/paths';
// config
import { PATH_AFTER_LOGIN } from '../../../config-global';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

const navConfig = [
  {
    title: 'Trang chủ',
    icon: <Iconify icon="eva:home-fill" />,
    path: '/',
  },
  {
    title: 'Về chúng tôi',
    icon: <Iconify icon="ic:round-grain" />,
    path: PATH_PAGE.about,
  },
  {
    title: 'Liên hệ',
    icon: <Iconify icon="ic:round-grain" />,
    path: PATH_PAGE.contact,
  },
  {
    title: 'Pages',
    path: '/pages',
    icon: <Iconify icon="eva:file-fill" />,
    children: [
      {
        subheader: 'Other',
        items: [
          { title: 'Pricing', path: PATH_PAGE.pricing },
          { title: 'Payment', path: PATH_PAGE.payment },
        ],
      },
      {
        subheader: 'Authentication',
        items: [
          { title: 'Login', path: PATH_AUTH.loginUnprotected },
          { title: 'Register', path: PATH_AUTH.registerUnprotected },
          { title: 'Reset password', path: PATH_AUTH.resetPassword },
          { title: 'Verify code', path: PATH_AUTH.verify },
        ],
      },
      {
        subheader: 'Error',
        items: [
          { title: 'Page 403', path: PATH_PAGE.page403 },
          { title: 'Page 404', path: PATH_PAGE.page404 },
        
        ],
      },
      {
        subheader: 'Dashboard',
        items: [{ title: 'Dashboard', path: PATH_AFTER_LOGIN }],
      },
    ],
  },
 
];

export default navConfig;
