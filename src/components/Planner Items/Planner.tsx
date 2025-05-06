'use client'
import {CourseLineup} from "@/components/Planner Items/CourseLineup";
import {generateDummyStudyPeriod} from "@/app/util";
import {StudyPeriodProps} from "@/components/Planner Items/StudyPeriod";
import {useState} from "react";
import {modes} from "@/components/Planner Items/SubjectSlot";

interface PlannerProps {
    mode?: modes
}

export const Planner = (props: PlannerProps)=>{
    const partial = [generateDummyStudyPeriod(0,4),generateDummyStudyPeriod(1,4),generateDummyStudyPeriod(2,4),generateDummyStudyPeriod(3,2)];
    const full = [generateDummyStudyPeriod(0,4),generateDummyStudyPeriod(1,4),generateDummyStudyPeriod(2,4),generateDummyStudyPeriod(3,4)];
    const [studyPeriods, setStudyPeriods] = useState<StudyPeriodProps[]>(()=>props.mode !== 2 ? partial : full);
    function updateStudyPeriods(periods: StudyPeriodProps[]){
        setStudyPeriods([...periods]);
    }

    return (
            <CourseLineup studyPeriods={studyPeriods} onUpdateStudyPeriods={updateStudyPeriods} mode={props.mode}/>
    );
}
