import { createTheme, responsiveFontSizes } from '@mui/material/styles';

export const TextFieldMuiStyle = {
  '.MuiTextField-root': {
    borderColor: '#2C3D8F',
    borderWidth: '2px',
  },
  '& label.Mui-focused': {
    color: '#2C3D8F',
    borderWidth: '2px',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#2C3D8F',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#2C3D8F',
      borderWidth: '2px',
    },
    '&:hover fieldset': {
      borderColor: '#2C3D8F',
      borderWidth: '2px',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#2C3D8F',
      borderWidth: '2px',
    },
  },
};

export const manropeTheme = responsiveFontSizes(createTheme({
  typography: {
    fontFamily: "'Manrope', sans-serif",
  },
}));

export default {
  TextFieldMuiStyle,
  manropeTheme,
};
