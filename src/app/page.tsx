import {ButtonLink} from "@/components/standard elements/ButtonLink";


export default function Home() {
  return (
    <div className={`items-center justify-items-center min-h-screen p-0 font-[family-name:var(--font-geist-sans)] w-full bg-gradient-to-b from-blue-400 via-amber-50 to-amber-100 `}>
        <main className={`grid justify-items-center p-40 space-y-2 select-none`}>
                <h1>Studying is Hard.</h1>
                <h2 className={``}>Planning for your studies shouldn&apos;t be.</h2>
                <ButtonLink href={`/planner`}>Get Ahead</ButtonLink>
        </main>
        <footer className="flex items-center justify-center">
        © 2025 Oliver Middleton
      </footer>
    </div>
  );
}
