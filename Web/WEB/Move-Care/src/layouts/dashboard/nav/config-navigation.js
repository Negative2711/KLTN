// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Label from '../../../components/label';
import Iconify from '../../../components/iconify';
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  blog: icon('ic_blog'),
  cart: icon('ic_cart'),
  chat: icon('ic_chat'),
  mail: icon('ic_mail'),
  user: icon('ic_user'),
  file: icon('ic_file'),
  lock: icon('ic_lock'),
  label: icon('ic_label'),
  blank: icon('ic_blank'),
  kanban: icon('ic_kanban'),
  folder: icon('ic_folder'),
 
  booking: icon('ic_booking'),
  invoice: icon('ic_invoice'),

  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  menuItem: icon('ic_menu_item'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'general',
    items: [
     
      { title: 'Thống kê', path: PATH_DASHBOARD.general.ecommerce, icon: ICONS.ecommerce },
    ],
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'management',
    items: [
      // USER
      {
        title: 'user',
        path: PATH_DASHBOARD.user.root,
        icon: ICONS.user,
        children: [
          { title: 'list', path: PATH_DASHBOARD.user.list },
          { title: 'create', path: PATH_DASHBOARD.user.new },
          { title: 'edit', path: PATH_DASHBOARD.user.demoEdit },
         
        ],
      },

      // E-COMMERCE
      // {
      //   title: 'ecommerce',
      //   path: PATH_DASHBOARD.eCommerce.root,
      //   icon: ICONS.cart,
      //   children: [
      //     { title: 'shop', path: PATH_DASHBOARD.eCommerce.shop },
      //     { title: 'product', path: PATH_DASHBOARD.eCommerce.demoView },
      //     { title: 'list', path: PATH_DASHBOARD.eCommerce.list },
      //     { title: 'create', path: PATH_DASHBOARD.eCommerce.new },
      //     { title: 'edit', path: PATH_DASHBOARD.eCommerce.demoEdit },
      //     { title: 'checkout', path: PATH_DASHBOARD.eCommerce.checkout },
      //   ],
      // },

      

      // BLOG thuê
      {
        title: 'Bài thuê',
        path: PATH_DASHBOARD.blog.root,
        icon: ICONS.blog,
        children: [
          { title: 'posts', path: PATH_DASHBOARD.blog.posts },
          { title: 'post', path: PATH_DASHBOARD.blog.demoView },
          { title: 'create', path: PATH_DASHBOARD.blog.new },
        ],
      },
      // BLOG tìm
      {
        title: 'Bài tìm việc',
        path: PATH_DASHBOARD.blog2.root,
        icon: ICONS.blog,
        children: [
          { title: 'posts', path: PATH_DASHBOARD.blog2.posts },
          { title: 'post', path: PATH_DASHBOARD.blog2.demoView },
          { title: 'create', path: PATH_DASHBOARD.blog2.new },
        ],
      },
      // INVOICE
      {
        title: 'Giao dịch',
        path: PATH_DASHBOARD.invoice.root,
        icon: ICONS.invoice,
        children: [
          { title: 'list', path: PATH_DASHBOARD.invoice.list },
          { title: 'details', path: PATH_DASHBOARD.invoice.demoView },
          { title: 'create', path: PATH_DASHBOARD.invoice.new },
          { title: 'edit', path: PATH_DASHBOARD.invoice.demoEdit },
        ],
      },
    ],
  },

  // APP
  // ----------------------------------------------------------------------
  {
    subheader: 'app',
    items: [
     
      {
        title: 'chat',
        path: PATH_DASHBOARD.chat.root,
        icon: ICONS.chat,
      },
    
   
    ],
  },

  // DEMO MENU STATES

];

export default navConfig;
