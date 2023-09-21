import { TextField, styled } from "@mui/material";

export const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
        color: '#A0AAB4',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: '#B2BAC2',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#0f4b55',
            borderRadius: 0
        },
        '&:hover fieldset': {
            borderColor: '#0f4b55',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#6F7E8C',
        },
        '& .MuiOutlinedInput-input': {
            '&::placeholder': {
                color: '#0f4b55',
                opacity: 1
            }
        }
    },
  });