import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment } from "@mui/material";
import { InputProps } from "@/@types/types";
import { Controller } from "react-hook-form";
import { CssTextField } from "./styles";

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
          field: { onChange, value }
        }) => (
            <CssTextField 
              type={showPassword ? 'text' : 'password'}
              onChange={onChange}
              value={value}
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