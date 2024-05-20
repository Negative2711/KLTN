import { useFormContext, Controller } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers';
import { Stack, TextField, MenuItem } from '@mui/material';
import { RHFSelect, RHFTextField } from '../../../../components/hook-form';
import { useState } from 'react';

const STATUS_OPTIONS = ['chờ duyệt', 'đang tiến hành', 'đã tiến hành', 'thành công'];

export default function InvoiceNewEditStatusDate() {
  const { control, watch } = useFormContext(); // Lấy hàm watch từ useFormContext
  const values = watch(); // Sử dụng watch để lấy giá trị của các trường trong form
  const [status, setStatus] = useState(STATUS_OPTIONS[0]);

  return (
    <Stack
      spacing={2}
      direction={{ xs: 'column', sm: 'row' }}
      sx={{ p: 3, bgcolor: 'background.neutral' }}
    >
      <RHFTextField
        disabled
        name="invoiceNumber"
        label="Invoice number"
        value={`INV-${values.invoiceNumber}`} // Sử dụng giá trị từ watch
      />

      <RHFSelect  
        fullWidth 
        name='status'
        label="Trạng thái" 
        InputLabelProps={{ shrink: true }}
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        {STATUS_OPTIONS.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </RHFSelect>

      <Controller
        name="createDate"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <DatePicker
            label="Ngày khởi tạo"
            value={field.value}
            onChange={(newValue) => field.onChange(newValue)}
            renderInput={(params) => (
              <TextField {...params} fullWidth error={!!error} helperText={error?.message} />
            )}
          />
        )}
      />

      <Controller
        name="dueDate"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <DatePicker
            label="Ngày thực hiện"
            value={field.value}
            onChange={(newValue) => field.onChange(newValue)}
            renderInput={(params) => (
              <TextField {...params} fullWidth error={!!error} helperText={error?.message} />
            )}
          />
        )}
      />
    </Stack>
  );
}
