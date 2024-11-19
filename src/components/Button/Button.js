import React from 'react';
import { Button as MUIButton } from '@mui/material';

function Button({ label, onClick, variant = 'contained', color = 'primary' }) {
  return (
    <MUIButton variant={variant} color={color} onClick={onClick}>
      {label}
    </MUIButton>
  );
}

export default Button;
