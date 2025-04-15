'use client'

import {useState} from "react";
import {SubjectSlot} from "@/components/Planner Items/SubjectSlot";

export const StudyPeriod = () => {
    const [subjects, setSubjects] = useState([1,2,3,4])

    function renderSubjects() {
        return subjects.map((subject, index) => {
            return <SubjectSlot key={index}/>
        })
    }

    return <>
        <div className={`flex w-full`}>
            <div className={`semester-title`}>
                Year - Semester Name
            </div>
            <div className={`flex-grow`}/>
        </div>
        <div className={`semester-body`}>
            {renderSubjects()}
        </div>
    </>
}
