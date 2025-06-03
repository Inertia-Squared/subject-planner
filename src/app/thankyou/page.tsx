'use client'
import {ButtonLink} from "@/components/standard elements/ButtonLink";
import {useRef} from "react";

export default function Home() {

    return (
        <div className={`flex flex-col w-full h-[96.5vh] items-center justify-items-center p-0 font-[family-name:var(--font-geist-sans)] bg-gradient-to-b from-blue-400 via-amber-50 to-cyan-100`}>
            <main className={`grid justify-items-center pt-[40vh] md:pt-[42vh] space-y-2 select-none`}>
                <h1 className={`px-[10%]`}>Thank you for your attention during this demo!</h1>
                <h2 className={``}>Website by Oliver Middleton</h2>
            </main>
            <div className={`flex-grow`}/>
        </div>
    );
}
