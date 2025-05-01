'use client'
import {ButtonLink} from "@/components/standard elements/ButtonLink";
import {useRef} from "react";

export default function Home() {

  return (
    <div className={`flex flex-col w-screen h-screen items-center justify-items-center p-0 font-[family-name:var(--font-geist-sans)] bg-gradient-to-b from-blue-400 via-amber-50 to-cyan-100`}>
        <main className={`grid justify-items-center pt-[40vh] md:pt-[44vh] space-y-2 select-none`}>
                <h1>Studying is Hard.</h1>
                <h2 className={``}>Planning your studies shouldn't be.</h2>
                <ButtonLink className={'text-xl p-2.5'} href={`/planner`}>Get Ahead</ButtonLink>
        </main>
        <div className={`flex-grow`}/>
    </div>
  );
}
