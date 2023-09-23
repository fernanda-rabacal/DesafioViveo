import Image from "next/image";
import Link from "next/link";
import { QuestionMarkTwoTone } from "@mui/icons-material";

export function Header() {
    return(
        <header className="w-full bg-blue-primary p-4">
            <nav className="flex justify-between">
               <Link href="/">
                    <Image 
                        width={150} 
                        height={150} 
                        src="/images/viveo-logo.svg" 
                        alt="Viveo Logo"
                        className="w-24" 
                    />
               </Link>

                <Link href="#" className="text-lg flex items-center gap-1">
                    Ajuda 
                    <QuestionMarkTwoTone className="text-lg"/>
                </Link>
            </nav>
        </header>
    )
}