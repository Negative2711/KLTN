// ----------------------------------------------------------------------

const LICENSES = ['Dịch vụ lẻ', 'Định kỳ', 'Kết nối từ bài viết'];

export const _homePlans = [
  {
    license: 'Dịch vụ lẻ',
    commons: ['Nấu ăn', 'Trông trẻ', 'Dọn dẹp nhà cửa','hỗ trợ 24/7'], // Nội dung cho Dịch vụ lẻ
    options: [],
    icons: [],
  },
  {
    license: 'Định kỳ',
    commons: ['Dọn dẹp hàng tuần', 'Giúp việc theo tháng',], // Nội dung cho Định kỳ
    options: [],
    icons: [],
  },
  {
    license: 'Kết nói từ bài viết',
    commons: ['Khách hàng có thể tìm người giúp việc theo yêu cầu', 'Người lao động có thể tìm kiếm công việc phù hợp',], // Nội dung cho Kết nói từ bài viết
    options: [],
    icons: [],
  },
];


export const _pricingPlans = [
  {
    subscription: 'basic',
    price: 0,
    caption: 'forever',
    lists: [
      { text: '3 prototypes', isAvailable: true },
      { text: '3 boards', isAvailable: true },
      { text: 'Up to 5 team members', isAvailable: false },
      { text: 'Advanced security', isAvailable: false },
      { text: 'Permissions & workflows', isAvailable: false },
    ],
    labelAction: 'current plan',
  },
  {
    subscription: 'starter',
    price: 4.99,
    caption: 'saving $24 a year',
    lists: [
      { text: '3 prototypes', isAvailable: true },
      { text: '3 boards', isAvailable: true },
      { text: 'Up to 5 team members', isAvailable: true },
      { text: 'Advanced security', isAvailable: false },
      { text: 'Permissions & workflows', isAvailable: false },
    ],
    labelAction: 'choose starter',
  },
  {
    subscription: 'premium',
    price: 9.99,
    caption: 'saving $124 a year',
    lists: [
      { text: '3 prototypes', isAvailable: true },
      { text: '3 boards', isAvailable: true },
      { text: 'Up to 5 team members', isAvailable: true },
      { text: 'Advanced security', isAvailable: true },
      { text: 'Permissions & workflows', isAvailable: true },
    ],
    labelAction: 'choose premium',
  },
];
