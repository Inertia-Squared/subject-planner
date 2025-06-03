import {StudyPeriod} from "@/components/Planner Items/StudyPeriod";
import {modes, SubjectData} from "@/components/Planner Items/SubjectSlot";
import {ButtonLink} from "@/components/standard elements/ButtonLink";

export default function Home() {
    return (
        <div className="items-start justify-items-center min-h-screen p-0 font-[family-name:var(--font-geist-sans)] w-full bg-gradient-to-r from-blue-200 via-blue-50 to-cyan-50">
            <main className="items-start justify-start sm:items-start w-full h-full p-6 md:px-32 space-y-2">
                <h2 className={`text-start mt-12 text-lg`}>
                    What's next?
                </h2>
                <div className={`max-w-xl p-3 bg-gray-50 rounded-md`}>
                    This section provides some university-specific advice for students, resources, and what
                    waivers/people they'll need to talk to in order to ensure the lineup is allowed; This is only if a
                    student chooses to override the automatic guardrails that are used to guarantee a valid lineup.
                    <br/><br/>
                    Information in this page is specific to a student's chosen lineup, so it is not visible from navigation.
                </div>
                <div className={`max-w-xl p-3 bg-gray-50 rounded-md`}>
                    <div className={`text-lg font-semibold`}>Waivers:</div>
                    <ul className={`list-disc pl-12 space-y-1`}>
                        <li>For <strong>Subject A</strong> you need a rule waiver, as you do not meet one of the
                            prerequisites. The most likely person able to assist you in this matter is <a className={`underline`} href={`mailto:example@westernsydney.edu.au`}>example@westernsydney.edu.au</a>
                        </li>
                        <li>For <strong>2026 - Semester 2</strong> you need a rule waiver, as you are taking on too many subjects in this period. The most likely person able to assist you in this matter is <a className={`underline`} href={`mailto:example@westernsydney.edu.au`}>example@westernsydney.edu.au</a>
                        </li>
                    </ul>
                </div>
                <div className={`h-4`}/>
                <ButtonLink href={'/thankyou'}
                className={`px-4 py-2 border border-blue-700 rounded-lg bg-blue-200 m-2 cursor-pointer`}>Understood, all done here!</ButtonLink>
            </main>
            <footer className="flex items-center justify-center">
                © 2025 Oliver Middleton
            </footer>
        </div>
    );
}
