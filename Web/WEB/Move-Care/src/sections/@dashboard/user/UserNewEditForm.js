import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo } from 'react';
import { Select, MenuItem } from '@mui/material';

// next
import { useRouter } from 'next/router';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, Switch, Typography, FormControlLabel } from '@mui/material';
// utils
import { fData } from '../../../utils/formatNumber';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// assets
import { countries } from '../../../assets/data';
// components
import Label from '../../../components/label';
import { useSnackbar } from '../../../components/snackbar';
import FormProvider, {
  RHFSelect,
  RHFSwitch,
  RHFTextField,
  RHFUploadAvatar,
} from '../../../components/hook-form';

//axios
import axios from 'axios';
import { API_ROOT } from 'src/config-global';
// ----------------------------------------------------------------------

UserNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentUser: PropTypes.object,
};

export default function UserNewEditForm({ isEdit = false, currentUser }) {
  const { push } = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('Tên là bắt buộc'),
    email: Yup.string().required('Email là bắt buộc').email('Địa chỉ Email phải đúng định dạng'),
    phoneNumber: Yup.string().required('Số điện thoại là bắt buộc'),
    address: Yup.string(),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentUser?.ho_ten || '',
      email: currentUser?.email || '',
      phoneNumber: currentUser?.phone_number || '',
      address: currentUser?.dia_chi || '',
      state: currentUser?.ngay_sinh || '',
      zipCode: currentUser?.gioi_tinh || '',
      avatarUrl: currentUser?.anh_dai_dien || null,
      isVerified: currentUser?.is_verify || true,
      status: currentUser?.is_staff ? 'Đã được kiểm duyệt' : 'Chưa được kiểm duyệt',
    }),

    [currentUser]
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (isEdit && currentUser) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentUser]);

  const onSubmit = async (data) => {
    try {
      if (!isEdit) {
        const postData = {
          email: data.email,
          phone_number: data.phoneNumber,
          password1: '123123',
          password2: '123123',
          ho_ten: data.name,
        };
        const url = API_ROOT + 'auth/khachhang/register/';
        axios
          .post(url, postData)
          .then((response) => {
            console.log('Dữ liệu nhận được sau khi gửi yêu cầu POST:', response.data);
          })
          .catch((error) => {
            console.error('Lỗi khi gửi yêu cầu POST:', error);
          });
      }
      else {
        const postData = {
          email: data.email,
          ho_ten: data.name,
        };
        const url = API_ROOT + `auth/khachhang/update-nonauth/${currentUser.idkh}/`;
        axios
          .put(url, postData)
          .then((response) => {
            console.log('Dữ liệu nhận được sau khi gửi yêu cầu POST:', response.data);
          })
          .catch((error) => {
            console.error('Lỗi khi gửi yêu cầu POST:', error);
          });
      }


      reset();
      enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
      push(PATH_DASHBOARD.user.list);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('avatarUrl', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ pt: 10, pb: 5, px: 3 }}>
            {isEdit && (
              <Label
                color={values.status === 'Chưa được kiểm duyệt' ? 'error' : 'success'}
                sx={{ textTransform: 'uppercase', position: 'absolute', top: 24, right: 24 }}
              >
                {values.status}
              </Label>
            )}

            <Box sx={{ mb: 5 }}>
              <RHFUploadAvatar
                name="avatarUrl"
                maxSize={3145728}
                onDrop={handleDrop}
                helperText={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 2,
                      mx: 'auto',
                      display: 'block',
                      textAlign: 'center',
                      color: 'text.secondary',
                    }}
                  ></Typography>
                }
              />
            </Box>

            {isEdit && (
              <FormControlLabel
                labelPlacement="start"
                control={
                  <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                      <Switch
                        {...field}
                        checked={field.value !== 'Chưa được kiểm duyệt'}
                        onChange={(event) =>
                          field.onChange(
                            event.target.checked ? 'Đã được kiểm duyệt' : 'Chưa được kiểm duyệt'
                          )
                        }
                      />
                    )}
                  />
                }
                label={
                  <>
                    <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                      Duyệt người dùng này
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      có thể nhận việc trên app
                    </Typography>
                  </>
                }
                sx={{ mx: 0, mb: 3, width: 1, justifyContent: 'space-between' }}
              />
            )}

            <RHFSwitch
              name="isVerified"
              labelPlacement="start"
              label={
                <>
                  <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                    Đã xác thực email
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Xác thực OTP qua email
                  </Typography>
                </>
              }
              sx={{ mx: 0, width: 1, justifyContent: 'space-between' }}
            />
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <RHFTextField name="name" label="Họ tên" />
              <RHFTextField name="email" label="Email" />
              <RHFTextField name="phoneNumber" label="Số điện thoại" />

              <RHFTextField name="state" label="Ngày sinh" />

              <RHFTextField name="address" label="Địa chỉ" />
              <RHFSelect
                name="zipCode"
                label="Giới tính"
                control={control} // Truyền control từ useForm vào
              >
                <MenuItem value="nam">Nam</MenuItem>
                <MenuItem value="nữ">Nữ</MenuItem>
                <MenuItem value="khác">Khác</MenuItem>
              </RHFSelect>
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Tạo tài khoản' : 'Thay đổi thông tin'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
