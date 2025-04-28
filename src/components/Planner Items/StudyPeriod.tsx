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
    const [delayedCSS, setDelayedCSS] = useState('');

    function renderSubjects() {
        return subjects.map((subject, index) => {
            return <SubjectSlot key={index}/>
        })
    }

    function allowOverflow(){
        // hover:!h-auto
    }

    useEffect(()=>{
        subjectsRef.current?.style.setProperty('height', (expanded ? subjectsRef.current?.scrollHeight + 10 : 0) + 'px');
    },[subjectsRef.current?.scrollHeight])

    return <>
        <div className={`flex w-full`}>
            <button onClick={() => {
                setExpanded(!expanded);
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
        <div ref={subjectsRef} onMouseEnter={allowOverflow} className={`semester-body toggle-expand hover:!overflow-y-none ${(expanded) ? 'semester-body-expanded' : 'semester-body-collapsed'}`}>
            {expanded && renderSubjects()}
        </div>
    </>
}
