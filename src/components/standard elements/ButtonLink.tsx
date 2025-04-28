import Link, {LinkProps} from "next/link";
import {ReactNode} from "react";

interface ButtonLinkProps extends LinkProps {
    children?: ReactNode;
    className?: string;
}

export const ButtonLink = (props: ButtonLinkProps) => {
    return (
        <Link className={`p-1.5 rounded border-2 border-amber-500 bg-amber-200 font-semibold drop-shadow-md hover:bg-amber-300 hover:border-amber-600 hover:drop-shadow-none ease-out hover:translate-y-[1px] duration-300 ${props.className}`} {...props}>{props.children}</Link>
    )

}
