import { paramCase } from 'change-case';
// next
import Head from 'next/head';
import { useRouter } from 'next/router';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// _mock_
import { _userList } from '../../../../_mock/arrays';
// layouts
import DashboardLayout from '../../../../layouts/dashboard';
// components
import { useSettingsContext } from '../../../../components/settings';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
// sections
import UserNewEditForm from '../../../../sections/@dashboard/user/UserNewEditForm';
// react
import { useCallback,useState,useEffect } from 'react';

//axios
import axios from 'axios';
//config
import { nameApp,linkIcon,API_ROOT } from 'src/config-global';

// ----------------------------------------------------------------------

UserEditPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function UserEditPage() {
  const { themeStretch } = useSettingsContext();

  const {
    query: { name },
  } = useRouter();
  const userID = name
  



  const API_GET_KHACHHANG = API_ROOT + `auth/khachhang/detail/${userID}/`;
  console.log(API_GET_KHACHHANG)
  const [currentUser, setCurrentUser] = useState(null);



  const getCurrentUser = useCallback(async () => {
    try {
      const response = await axios.get(API_GET_KHACHHANG);
      setCurrentUser(response.data.data);
      console.log(currentUser);
    } catch (error) {
      console.error(error);
    }
  }, [API_GET_KHACHHANG]);
  
  useEffect(() => {
    getCurrentUser();
  }, []);
  

  return (
    <>
      <Head>
        <title> Chỉnh sửa người dùng | {linkIcon}</title>
        <link rel='icon' href={linkIcon}/>
        
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Chỉnh sửa người dùng"
          links={[
            {
              name: 'Bảng điều khiển',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Người dùng',
              href: PATH_DASHBOARD.user.list,
            },
            { name: userID },
          ]}
        />

        <UserNewEditForm isEdit currentUser={currentUser} />
      </Container>
    </>
  );
}
