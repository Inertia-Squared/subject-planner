'use client'

import {useEffect, useRef, useState} from "react";
import {SubjectSlot} from "@/components/Planner Items/SubjectSlot";
import {
    LucideArrowRight,
    LucideArrowRightFromLine,
    LucideChevronDown,
    LucideChevronRight,
    LucideTrash
} from "lucide-react";

interface StudyPeriodProps {
    index: number,

    year: number;
    name: string;

    onRemoveStudyPeriod: (studyId: number) => void;
}

export const StudyPeriod = (props: StudyPeriodProps) => {
    const [subjects, setSubjects] = useState([1,2,3,4])
    const [expanded, setExpanded] = useState<boolean>(true)
    const subjectsRef = useRef<HTMLDivElement>(null);

    function renderSubjects() {
        return subjects.map((subject, index) => {
            return <SubjectSlot key={index}/>
        })
    }



    return <>
        <div className={`flex w-full`}>
            <button onClick={() => {
                setExpanded(!expanded)
                subjectsRef.current?.style.setProperty('height', (!expanded ? subjectsRef.current?.scrollHeight : 0) + 'px');
            }}>
                {expanded ? <LucideChevronDown/> : <LucideChevronRight/>}
            </button>
            <div className={`semester-title`}>
                {props.year} - {props.name}
            </div>
            <button onClick={()=>props.onRemoveStudyPeriod(props.index)} className={`ml-1`}>
                <LucideTrash size={17}/>
            </button>
            <div className={`flex-grow`}/>
        </div>
        <div ref={subjectsRef} className={`semester-body toggle-expand`}>
            {expanded && renderSubjects()}
        </div>
    </>
}
