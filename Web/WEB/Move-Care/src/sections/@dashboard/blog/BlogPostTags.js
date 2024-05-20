import PropTypes from 'prop-types';
// @mui
import { Chip, Avatar, Checkbox, Stack, FormControlLabel } from '@mui/material';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
// components
import Iconify from '../../../components/iconify';
import { CustomAvatarGroup } from '../../../components/custom-avatar';

// ----------------------------------------------------------------------

BlogPostTags.propTypes = {
  post: PropTypes.object,
};

export default function BlogPostTags({ post }) {
  const { favorite, tags, favoritePerson } = post;

  return (
    <>
    

      <Stack direction="row" alignItems="center">
        <FormControlLabel
          control={
            <Checkbox
              defaultChecked
              size="small"
              color="error"
              icon={<Iconify icon="eva:heart-fill" />}
              checkedIcon={<Iconify icon="eva:heart-fill" />}
            />
          }
          label={fShortenNumber(favorite)}
        />

      </Stack>
    </>
  );
}
