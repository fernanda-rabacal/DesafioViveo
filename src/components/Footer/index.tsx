import Link from "next/link";
import { Facebook, Instagram, LinkedIn, YouTube } from "@mui/icons-material";
import { tv } from "tailwind-variants";

const link = tv({
    base: [
        'flex items-center text-blue-dark font-bwquinta-regular text-base',
        'lg:justify-center xl:justify-start hover:text-blue-primary transition'
      ],
})

const linkLabels = [
    'Nossas Empresas',
    'Notícias',
    'Compliance',
    'Sala de Imprensa',
    'Fornecedores',
    'Política de Privacidade'
]

const socialIcons = [
    {
        id: 1,
        icon: <LinkedIn fontSize="large" />
    },
    {
        id: 2,
        icon: <Instagram fontSize="large" />
    },
    {
        id: 3,
        icon: <Facebook fontSize="large" />
    },
    {
        id: 4,
        icon: <YouTube fontSize="large" />
    },
]

"text-sm uppercase text-turquoise-dark hover:text-turquoise-light" 

export function Footer() {
    return (
        <footer className="border-t border-slate-300 p-8 flex flex-col gap-12 lg:flex-row lg:justify-between">
            <nav>
                <ul className="grid grid-cols-2 gap-4 lg:flex lg:grid-flow-col">
                    {linkLabels.map(linkLabel => {
                        return (
                            <li key={linkLabel}>
                                <Link href="#" className={link()}>{linkLabel}</Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>
            <nav>
                <ul className="flex col-span-12 lg:justify-between">
                    {socialIcons.map(icon => {
                        return (
                            <li className="mr-5" key={icon.id}>
                                <Link href="#" className={link()}>
                                    {icon.icon}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </footer>
    )
}