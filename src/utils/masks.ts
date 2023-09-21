export const maskCPF = (value: string | undefined) => {
    if(!value) {
        return ""
    }

    return value.replace(/\D/g, "")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2") 
}

export const maskPhone = (value: string | undefined) => {
    if(!value) {
        return ""
    }

    return value.replace(/\D/g,'')
        .replace(/(\d{2})(\d)/,"($1) $2")
        .replace(/(\d)(\d{4})$/,"$1-$2")
}