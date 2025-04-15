'use client'

import {useState} from "react";
import {StudyPeriod} from "@/components/Planner Items/StudyPeriod";

export const CourseLineup = () => {
    const [studyPeriods, setStudyPeriods] = useState([1,2,3,4])

    function renderStudyPeriods() {
        return studyPeriods.map((study, index) => {
            return <div className={`flex flex-col items-center`}>
                <StudyPeriod key={index}/>
                {index<studyPeriods.length-1 &&
                    <div className={`w-0 border-2 border-dashed h-16 mb-[-26px]`}/>
                }
            </div>
        })
    }

    return <>
        <div>
            {renderStudyPeriods()}
        </div>
    </>
}
