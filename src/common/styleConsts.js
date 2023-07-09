import { createTheme, responsiveFontSizes } from '@mui/material/styles';

export const TextFieldMuiStyle = {
  '.MuiTextField-root': {
    borderColor: '#104C43',
    borderWidth: '2px',
  },
  '& label.Mui-focused': {
    color: '#104C43',
    borderWidth: '2px',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#104C43',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#104C43',
      borderWidth: '2px',
    },
    '&:hover fieldset': {
      borderColor: '#104C43',
      borderWidth: '2px',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#104C43',
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
