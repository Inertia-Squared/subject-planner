'use client'
import {InfoPanel} from "@/components/Planner Items/InfoPanel";
import {CourseLineup} from "@/components/Planner Items/CourseLineup";
import {generateDummyStudyPeriod} from "@/app/util";
import {StudyPeriodProps} from "@/components/Planner Items/StudyPeriod";
import {useState} from "react";

export const Planner = ()=>{

    const [studyPeriods, setStudyPeriods] = useState<StudyPeriodProps[]>([generateDummyStudyPeriod(0),generateDummyStudyPeriod(1),generateDummyStudyPeriod(2),generateDummyStudyPeriod(3)]);
    function updateStudyPeriods(periods: StudyPeriodProps[]){
        setStudyPeriods([...periods]);
    }

    return (
        <div className={`flex w-full space-x-4 h-full`}>
            <CourseLineup studyPeriods={studyPeriods} onUpdateStudyPeriods={updateStudyPeriods}/>
            <InfoPanel studyPeriodData={studyPeriods} className={`hidden sm:block relative w-full`}/>
        </div>
    );
}