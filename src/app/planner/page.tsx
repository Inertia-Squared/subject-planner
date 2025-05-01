import {CourseLineup} from "@/components/Planner Items/CourseLineup";
import {InfoPanel} from "@/components/Planner Items/InfoPanel";
import {Planner} from "@/components/Planner Items/Planner";

export default function Page() {
    return (
        <div className="items-center justify-items-center h-full p-2 pt-16 sm:p-8 sm:pb-36 sm:pt-16 font-[family-name:var(--font-geist-sans)]  bg-gradient-to-r from-blue-200 via-blue-50 to-cyan-50">
            <main className="h-full flex items-center justify-center sm:items-start">
                <div className={`h-full flex px-0 2xl:pl-14 gap-4`}>
                        <Planner/>
                </div>
            </main>
        </div>
    );
}
