import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box } from '@mui/material';
import logoimg from '../assets/images/logo.svg'



// ----------------------------------------------------------------------

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};


export default function Logo({ disabledLink = false, sx }) {

  // OR
  const logo = <Box component="img" src={logoimg} sx={{ width: 150, height: 100, ...sx }} />

  if (disabledLink) {
    return <>{logo}</>;
  }

  return <RouterLink to="/">{logo}</RouterLink>;
}
