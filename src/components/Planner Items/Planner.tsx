'use client'
import {CourseLineup} from "@/components/Planner Items/CourseLineup";
import {generateDummyStudyPeriod} from "@/app/util";
import {StudyPeriodProps} from "@/components/Planner Items/StudyPeriod";
import {useState} from "react";

export const Planner = ()=>{

    const [studyPeriods, setStudyPeriods] = useState<StudyPeriodProps[]>(()=>[generateDummyStudyPeriod(0,4),generateDummyStudyPeriod(1,3),generateDummyStudyPeriod(2,4),generateDummyStudyPeriod(3,0)]);
    function updateStudyPeriods(periods: StudyPeriodProps[]){
        setStudyPeriods([...periods]);
    }

    return (
            <CourseLineup studyPeriods={studyPeriods} onUpdateStudyPeriods={updateStudyPeriods}/>
    );
}
