import sum from 'lodash/sum';
import { useCallback, useEffect } from 'react';
// form
import { useFormContext, useFieldArray } from 'react-hook-form';
// @mui
import { Box, Stack, Button, Divider, Typography, InputAdornment, MenuItem } from '@mui/material';
// utils
import { fCurrency } from '../../../../utils/formatNumber';
// components
import Iconify from '../../../../components/iconify';
import { RHFSelect, RHFTextField } from '../../../../components/hook-form';

// ----------------------------------------------------------------------

const SERVICE_OPTIONS = [
  { id: 1, name: 'Dọn dẹp nhà', price: 90.99 },
  { id: 2, name: 'backend development', price: 80.99 },
  { id: 3, name: 'ui design', price: 70.99 },
  { id: 4, name: 'ui/ux design', price: 60.99 },
  { id: 5, name: 'front end development', price: 40.99 },
];

// ----------------------------------------------------------------------

export default function InvoiceNewEditDetails() {
  const { control, setValue, watch, resetField } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const values = watch();

  const totalOnRow = values.items.map((item) => item.quantity * item.price);

  const totalPrice = sum(totalOnRow) - values.discount + values.taxes;

  useEffect(() => {
    setValue('totalPrice', totalPrice);
  }, [setValue, totalPrice]);

  const handleAdd = () => {
    append({
      title: '',
      description: '',
      service: '',
      quantity: 1,
      price: 0,
      total: 0,
    });
  };

  const handleRemove = (index) => {
    remove(index);
  };

  const handleClearService = useCallback(
    (index) => {
      resetField(`items[${index}].quantity`);
      resetField(`items[${index}].price`);
      resetField(`items[${index}].total`);
    },
    [resetField]
  );

  const handleSelectService = useCallback(
    (index, option) => {
      setValue(
        `items[${index}].price`,
        SERVICE_OPTIONS.find((service) => service.name === option)?.price
      );
      setValue(
        `items[${index}].total`,
        values.items.map((item) => item.quantity * item.price)[index]
      );
    },
    [setValue, values.items]
  );

  const handleChangeQuantity = useCallback(
    (event, index) => {
      setValue(`items[${index}].quantity`, Number(event.target.value));
      setValue(
        `items[${index}].total`,
        values.items.map((item) => item.quantity * item.price)[index]
      );
    },
    [setValue, values.items]
  );

  const handleChangePrice = useCallback(
    (event, index) => {
      setValue(`items[${index}].price`, Number(event.target.value));
      setValue(
        `items[${index}].total`,
        values.items.map((item) => item.quantity * item.price)[index]
      );
    },
    [setValue, values.items]
  );

  return (
    <Box sx={{ p: 3 }}>
      

      

      <Divider sx={{ my: 3, borderStyle: 'dashed' }} />

      <Stack
        spacing={2}
        direction={{ xs: 'column-reverse', md: 'row' }}
        alignItems={{ xs: 'flex-start', md: 'center' }}
      >
        <Button
          size="small"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={handleAdd}
          sx={{ flexShrink: 0 }}
        >
          Add Item
        </Button>

        <Stack
          spacing={2}
          justifyContent="flex-end"
          direction={{ xs: 'column', md: 'row' }}
          sx={{ width: 1 }}
        >
          <RHFTextField
            size="small"
            label="Discount"
            name="discount"
            onChange={(event) => setValue('discount', Number(event.target.value))}
            sx={{ maxWidth: { md: 200 } }}
          />

          <RHFTextField
            size="small"
            label="Taxes"
            name="taxes"
            onChange={(event) => setValue('taxes', Number(event.target.value))}
            sx={{ maxWidth: { md: 200 } }}
          />
        </Stack>
      </Stack>

      <Stack spacing={2} sx={{ mt: 3 }}>
        <Stack direction="row" justifyContent="flex-end">
          <Typography>Tổng :</Typography>
          <Typography sx={{ textAlign: 'right', width: 120 }}>
            {fCurrency(sum(totalOnRow)) || '-'}
          </Typography>
        </Stack>

        <Stack direction="row" justifyContent="flex-end">
          <Typography>Giảm giá :</Typography>
          <Typography
            sx={{ textAlign: 'right', width: 120, ...(values.discount && { color: 'error.main' }) }}
          >
            {values.discount ? `- ${fCurrency(values.discount)}` : '-'}
          </Typography>
        </Stack>

        <Stack direction="row" justifyContent="flex-end">
          <Typography>Thuế :</Typography>
          <Typography sx={{ textAlign: 'right', width: 120 }}>
            {values.taxes ? fCurrency(values.taxes) : '-'}
          </Typography>
        </Stack>

        <Stack direction="row" justifyContent="flex-end">
          <Typography variant="h6">Tổng thanh toán :</Typography>
          <Typography variant="h6" sx={{ textAlign: 'right', width: 120 }}>
            {fCurrency(totalPrice) || '-'}
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
}
