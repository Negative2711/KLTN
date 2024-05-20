import PropTypes from 'prop-types';
import { m } from 'framer-motion';
import { useRef } from 'react';
// @mui
import { useTheme, alpha } from '@mui/material/styles';
import { Box, Stack, Card, Button, Container, Typography, IconButton } from '@mui/material';
// _mock_
import { _carouselsMembers, _socials } from '../../_mock/arrays';
// components
import Image from '../../components/image';
import Iconify from '../../components/iconify';
import Carousel, { CarouselArrows } from '../../components/carousel';
import { MotionViewport, varFade } from '../../components/animate';


// ----------------------------------------------------------------------

export default function AboutTeam() {
  const carouselRef = useRef(null);

  const theme = useTheme();

  const carouselSettings = {
    infinite: false,
    arrows: false,
    slidesToShow: 4,
    rtl: Boolean(theme.direction === 'rtl'),
    responsive: [
      {
        breakpoint: 1279,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 959,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  const handlePrev = () => {
    carouselRef.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current?.slickNext();
  };

  return (
    <Container component={MotionViewport} sx={{ pb: 10, textAlign: 'center' }}>
 
      <m.div variants={varFade().inUp}>
        <Typography variant="h2" sx={{ my: 3 }}>
          Đội ngũ chuyên nghiệp
        </Typography>
      </m.div>

      <m.div variants={varFade().inUp}>
        <Typography
          sx={{
            mx: 'auto',
            maxWidth: 640,
            color: 'text.secondary',
          }}
        >
          Với kinh nghiệm nhiều năm trong lĩnh vực giúp việc, và dọn dẹp chúng tôi có thể hỗ trợ bạn tốt nhất.
        </Typography>
      </m.div>

      <Box sx={{ position: 'relative' }}>
        <CarouselArrows
          filled
          shape="rounded"
          onNext={handleNext}
          onPrevious={handlePrev}
          leftButtonProps={{
            sx: {
              left: 24,
              ...(_carouselsMembers.length < 5 && { display: 'none' }),
            },
          }}
          rightButtonProps={{
            sx: {
              right: 24,
              ...(_carouselsMembers.length < 5 && { display: 'none' }),
            },
          }}
        >
          <Carousel ref={carouselRef} {...carouselSettings}>
            {_carouselsMembers.map((member) => (
              <Box
                key={member.id}
                component={m.div}
                variants={varFade().in}
                sx={{ px: 1.5, py: 10 }}
              >
                <MemberCard member={member} />
              </Box>
            ))}
          </Carousel>
        </CarouselArrows>
      </Box>

   
    </Container>
  );
}

// ----------------------------------------------------------------------

MemberCard.propTypes = {
  member: PropTypes.shape({
    avatar: PropTypes.string,
    name: PropTypes.string,
    role: PropTypes.string,
  }),
};

function MemberCard({ member }) {
  const { name, role, avatar } = member;

  return (
    <Card key={name}>
      <Typography variant="subtitle1" sx={{ mt: 2, mb: 0.5 }}>
        {name}
      </Typography>

      <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
        {role}
      </Typography>

      <Box sx={{ px: 1 }}>
        <Image alt={name} src={avatar} ratio="1/1" sx={{ borderRadius: 2 }} />
      </Box>

      <Stack direction="row" alignItems="center" justifyContent="center" sx={{ p: 2 }}>
        {_socials.map((social) => (
          <IconButton
            key={social.name}
            sx={{
              color: social.color,
              '&:hover': {
                bgcolor: alpha(social.color, 0.08),
              },
            }}
          >
            <Iconify icon={social.icon} />
          </IconButton>
        ))}
      </Stack>
    </Card>
  );
}
