import {StudyPeriod} from "@/components/Planner Items/StudyPeriod";
import {modes, SubjectData} from "@/components/Planner Items/SubjectSlot";

export default function Home() {
    return (
        <div className="items-center justify-items-center min-h-screen p-0 font-[family-name:var(--font-geist-sans)] w-full">
            <main className="items-center justify-center sm:items-start w-full h-full p-12 pt-16">
                WIP
                <StudyPeriod mode={1} startCollapsed={true} className={`mt-12`} id={'1'} title={'This is a Question?'}
                             subjects={[{name:'This is an Answer!', description:'Sentence elaborating on answer and details'} as SubjectData]}/>
                <StudyPeriod mode={1} startCollapsed={true} className={`mt-12`} id={'1'} title={'This is a another Question'}
                             subjects={[{name:'This is an Answer!', description:'Sentence elaborating on answer and details'} as SubjectData]}/>
            </main>
            <footer className="flex items-center justify-center">
                © 2025 Oliver Middleton
            </footer>
        </div>
    );
}
