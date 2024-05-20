import { m } from 'framer-motion';
// @mui
import { styled } from '@mui/material/styles';
import { Stack, Container, Typography } from '@mui/material';
// components
import { MotionContainer, TextAnimate, varFade } from '../../components/animate';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  position: 'relative',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundImage: 'url(/assets/background/overlay_1.svg), url(/assets/images/about/hero.jpg)',
  padding: theme.spacing(10, 0),
  [theme.breakpoints.up('md')]: {
    height: 560,
    padding: 0,
  },
}));

const StyledContent = styled('div')(({ theme }) => ({
  textAlign: 'center',
  [theme.breakpoints.up('md')]: {
    bottom: 80,
    textAlign: 'left',
    position: 'absolute',
  },
}));

// ----------------------------------------------------------------------

export default function AboutHero() {
  return (
    <StyledRoot>
      <Container component={MotionContainer}>
        <StyledContent>
          <TextAnimate
            text="Chúng"
            sx={{
              color: 'primary.main',
            }}
            variants={varFade().inRight}
          />
          " "
          <TextAnimate
            text="tôi"
            sx={{
              color: 'primary.main',
            }}
            variants={varFade().inRight}
          />
          <br />
          <Stack spacing={2} display="inline-flex" direction="row" sx={{ color: 'common.white' }}>
            <TextAnimate text="là" />
            <TextAnimate text="ai?" />
          </Stack>
          <m.div variants={varFade().inRight}>
            <Typography
              variant="h4"
              sx={{
                mt: 5,
                color: 'common.white',
                fontWeight: 'fontWeightMedium',
              }}
            >
              Hãy cùng nhau làm việc và <br></br>
              tạo ra những điều tuyệt vời
            </Typography>
          </m.div>
        </StyledContent>
      </Container>
    </StyledRoot>
  );
}
