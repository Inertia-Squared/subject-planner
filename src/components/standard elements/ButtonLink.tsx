import Link, {LinkProps} from "next/link";
import {ReactNode, RefObject} from "react";

interface ButtonLinkProps extends LinkProps {
    children?: ReactNode;
    className?: string;
    ref?: RefObject<any>;
    onMouseLeave?: () => void;
}



export const ButtonLink = (props: ButtonLinkProps) => {
    return (
        <Link ref={props.ref} {...props} className={`p-1.5 rounded border-2 border-amber-500 bg-amber-200 text-lg 
        font-semibold drop-shadow-md hover:bg-amber-300 hover:border-amber-600 hover:drop-shadow-none ease-out 
        hover:translate-y-[1px] duration-300 
        hover:bg-[linear-gradient(90deg,rgb(250,50,50)0%,rgb(250,150,50)10%,rgb(250,250,0)35%,rgb(50,250,50)50%,rgb(100,100,255)65%,rgb(180,80,255)80%,rgb(250,50,50)100%)] 
        hover:animate-gradient hover:bg-[length:200%_auto] focus:animate-gradient-fast focus:bg-[length:1600%_auto]
        focus:bg-[linear-gradient(90deg,rgb(250,50,50)0%,rgb(250,150,50)10%,rgb(250,250,0)35%,rgb(50,250,50)50%,rgb(100,100,255)65%,rgb(180,80,255)80%,rgb(250,50,50)100%)] 
         ${props.className}`}>{props.children}</Link>
    )

}
