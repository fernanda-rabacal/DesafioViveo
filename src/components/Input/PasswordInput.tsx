import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment } from "@mui/material";
import { InputProps } from "@/@types/types";
import { CssTextField } from "./styles";
import { Controller } from "react-hook-form";

export function PasswordInput({ hasError, inputRef, control, name, ...props } : InputProps) {
    const [showPassword, setShowPassword] = useState(false)
    
    const handleClickShowPassword = () => {
        setShowPassword(prevState => !prevState)
    }

    console.log(hasError)

    return (
      <Controller
        name={name}
        control={control}
        render={({
          field: { onChange, value },
          fieldState: { error },
          formState,
        }) => (
            <CssTextField 
              inputRef={inputRef}
              onChange={onChange}
              type={showPassword ? 'text' : 'password'}
              inputProps={{...props}}
              error={hasError}
              helperText={hasError && "Preencha esse campo"}
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