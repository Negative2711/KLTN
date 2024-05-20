import { m } from 'framer-motion';
// @mui
import { Button, Typography, TextField, Stack } from '@mui/material';
// components
import { MotionViewport, varFade } from '../../components/animate';

// ----------------------------------------------------------------------

export default function ContactForm() {
  return (
    <Stack component={MotionViewport} spacing={5}>
      <m.div variants={varFade().inUp}>
        <Typography variant="h3">
          Bạn có thể liên lạc với chúng tôi <br />
          Luôn lắng nghe bạn
        </Typography>
      </m.div>

      <Stack spacing={3}>
        <m.div variants={varFade().inUp}>
          <TextField fullWidth label="Tên" />
        </m.div>

        <m.div variants={varFade().inUp}>
          <TextField fullWidth label="Email" />
        </m.div>

        <m.div variants={varFade().inUp}>
          <TextField fullWidth label="Chủ đề" />
        </m.div>

        <m.div variants={varFade().inUp}>
          <TextField fullWidth label="Nhập vào tin nhắn" multiline rows={4} />
        </m.div>
      </Stack>

      <m.div variants={varFade().inUp}>
        <Button size="large" variant="contained">
          Gửi
        </Button>
      </m.div>
    </Stack>
  );
}
