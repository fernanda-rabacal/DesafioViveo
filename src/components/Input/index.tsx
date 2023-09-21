import { InputProps } from "@/@types/types";
import { TextField } from "@mui/material";
import { CssTextField } from "./styles";
import { Controller } from "react-hook-form";

export function Input({ errorMessage, inputRef, control, name, ...props } : InputProps) {
    return (
        <Controller
            name={name}
            control={control}
            render={({
                field: { onChange },
            }) => (
                <CssTextField 
                    onChange={onChange}
                    inputRef={inputRef}
                    inputProps={{...props}}
                    error={!!errorMessage}
                    helperText={errorMessage ? errorMessage : ""}
                    />
                )
            }
        />
    )
}