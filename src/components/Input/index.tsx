import { InputProps } from "@/@types/types";
import { TextField } from "@mui/material";
import { CssTextField } from "./styles";

export function Input({ hasError, inputRef, ...props } : InputProps) {
    return (
        <CssTextField 
              inputRef={inputRef}
              inputProps={{...props}}
              error={hasError}
              helperText={hasError && "Preencha esse campo"}
            />
    )
}