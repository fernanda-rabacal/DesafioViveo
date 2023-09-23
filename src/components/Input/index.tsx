import { InputProps } from "@/@types/types";
import { CssTextField } from "./styles";
import { Controller } from "react-hook-form";

export function Input({ 
    errorMessage, 
    inputRef, 
    control, 
    name, 
    className, 
    ...props 
} : InputProps) {
    return (
        <Controller
            name={name}
            control={control}
            render={({
                field: { onChange, value },
            }) => (
                <CssTextField 
                    className={className}
                    onChange={onChange}
                    inputRef={inputRef}
                    value={value}
                    inputProps={{...props}}
                    error={!!errorMessage}
                    helperText={errorMessage ? errorMessage : ""}
                    
                    />
                )
            }
        />
    )
}