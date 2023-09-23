import { QuestionMarkTwoTone } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";

export function Header() {
    return(
        <header className="w-full bg-blue-primary flex justify-between p-6">
            <Image 
                width={150} 
                height={150} 
                src="/images/viveo-logo.svg" 
                alt="Viveo Logo"
                className="w-24 md:w-32" 
            />

            <Link href="#" className="text-xl flex items-center gap-1">
                Ajuda 
                <QuestionMarkTwoTone className="text-lg"/>
            </Link>
        </header>
    )
}