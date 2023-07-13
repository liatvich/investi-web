import React, {
  useState, useCallback,
} from 'react';
import { TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import debounce from 'lodash.debounce';
import s from './EmailTextbox.module.scss';
import { TextFieldMuiStyle } from '../../common/styleConsts';
import { emailValidation } from '../../common/general';

const CssTextField = styled(TextField)(TextFieldMuiStyle);

// eslint-disable-next-line react/prop-types, no-unused-vars
export function EmailTextbox({ onEmailChange, className }) {
  const [email, setEmail] = useState('');
  const [showEmailValidationError, setShowEmailValidationError] = useState(false);

  const handleEmailValidationChange = (value) => {
    if (emailValidation(value)) {
      setShowEmailValidationError(false);
      onEmailChange(value, true);
    } else {
      setShowEmailValidationError(true);
      onEmailChange(value, false);
    }
  };

  const onChangeMailValidation = useCallback(debounce(handleEmailValidationChange, 250), []);

  return (
    <>
      <CssTextField
        id="standard-error"
        value={email}
        onChange={(event) => {
          setEmail(event.target.value);
          onChangeMailValidation(event.target.value);
        }}
        placeholder="your email"
        error={showEmailValidationError}
        className={className}
      />
      {showEmailValidationError
        ? (
          <Typography variant="caption" component="div" className={s.error}>
            Please enter correct email
          </Typography>
        ) : <div className={s.emptyError} />}
    </>
  );
}

export default EmailTextbox;
