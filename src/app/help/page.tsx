
import {StudyPeriod, StudyPeriodProps} from "@/components/Planner Items/StudyPeriod";
import {modes, SubjectData} from "@/components/Planner Items/SubjectSlot";

export default function Home() {
    return (
        <div className="items-center justify-items-center min-h-screen p-0 font-[family-name:var(--font-geist-sans)] w-full bg-gradient-to-r from-blue-200 via-blue-50 to-cyan-50">
            <main className="items-center justify-center sm:items-start w-full h-full p-6 md:px-32">
                <h2 className={`mt-12 mb-2 text-lg`}>Help/FAQ:</h2>
                <StudyPeriod mode={1} startCollapsed={false} className={``} id={'1'} title={'Question Category 1'}
                             subjects={[{
                                 code: '1',
                                 name: 'Question A',
                                 description: 'Answer to Question!'
                             } as SubjectData,
                             {
                                 code: '2',
                                 name: 'Question B',
                                 description: 'Answer to Question!'
                             } as SubjectData
                             ]}/>
                <StudyPeriod mode={1} startCollapsed={false} className={`mt-12`} id={'2'}
                             title={'Question Category 2'}
                             subjects={[{
                                 code: '2',
                                 name: 'Question',
                                 description: 'Answer to question!'
                             } as SubjectData]}/>
            </main>
            <footer className="flex items-center justify-center">
                © 2025 Oliver Middleton
            </footer>
        </div>
    );
}
