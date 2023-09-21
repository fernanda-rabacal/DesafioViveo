import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment } from "@mui/material";
import { InputProps } from "@/@types/types";
import { CssTextField } from "./styles";
import { Controller } from "react-hook-form";

export function PasswordInput({ errorMessage, control, name, ...props } : InputProps) {
    const [showPassword, setShowPassword] = useState(false)
    
    const handleClickShowPassword = () => {
        setShowPassword(prevState => !prevState)
    }

    return (
      <Controller
        name={name}
        control={control}
        render={({
          field: { onChange }
        }) => (
            <CssTextField 
              onChange={onChange}
              type={showPassword ? 'text' : 'password'}
              inputProps={{...props}}
              error={!!errorMessage}
              helperText={errorMessage ? errorMessage : ''}
              InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                          aria-label="Mudar visibilidade da senha"
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                )
              }} 
            />
        )}
    />
  )
}