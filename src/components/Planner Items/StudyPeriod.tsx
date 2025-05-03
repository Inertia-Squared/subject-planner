'use client'

import {Ref, useEffect, useRef, useState} from "react";
import {SubjectData, SubjectSlot} from "@/components/Planner Items/SubjectSlot";
import {
    LucideChevronDown,
    LucideChevronRight,
    LucideTrash
} from "lucide-react";

export interface StudyPeriodProps {
    id: string,

    year: number,
    periodName: string,

    onRemoveStudyPeriod: (studyId: string) => void,
    updatePos: (id: string, rect: HTMLDivElement) => void,

    subjects?: SubjectData[],
}

export const StudyPeriod = (props: StudyPeriodProps) => {
    const [subjects, setSubjects] = useState<SubjectData[]>(props.subjects || [])
    const [expanded, setExpanded] = useState<boolean>(true)
    const subjectsRef = useRef<HTMLDivElement>(null);
    const [heightTimer, setHeightTimer] = useState<NodeJS.Timeout>();
    const [collapseTimer, setCollapseTimer] = useState<NodeJS.Timeout>();
    const [expandTimer, setExpandTimer] = useState<NodeJS.Timeout>();
    const [lastHeight, setLastHeight] = useState(0);
    const [showSubjects, setShowSubjects] = useState<boolean>(expanded);
    const [collapsing, setCollapsing] = useState<boolean>(false);
    const [expanding, setExpanding] = useState(false);
    const [onFinishedAnimating, setOnFinishedAnimating] = useState<(() => void)[]>([]);
    const expandedRef = useRef(expanded);


    useEffect(()=>{
        addEventListener('scroll',()=>{
            updatePos();
        })
        setLastHeight((!expanded ? (subjectsRef.current?.scrollHeight || 0) + 5 : 0));
        subjectsRef.current?.style.setProperty('height', (expanded ? (subjectsRef.current?.scrollHeight || 0) + 5 : 0) + 'px');
        return ()=>{
            removeEventListener('scroll',()=>{
                updatePos();
            })
        }
    },[])

    function updatePos(){
        if(subjectsRef.current) props.updatePos(props.id,subjectsRef.current);
    }

    useEffect(() => {
        expandedRef.current = expanded;
        if(expanded) {
            clearTimeout(collapseTimer);
            setShowSubjects(expanded);
            setCollapsing(false);
            setExpanding(true);
            setExpandTimer(setTimeout(()=>{
                setExpanding(false);
                //console.log(onFinishedAnimating)
                for (const task of onFinishedAnimating) task();
                setOnFinishedAnimating([]);
            },700));
        }
        else {
            clearTimeout(expandTimer);
            setExpanding(false);
            setCollapsing(true);
            setCollapseTimer(setTimeout(() => {
                setShowSubjects(expanded);
                setCollapsing(false);
                for (const task of onFinishedAnimating) task();
                setOnFinishedAnimating([]);
            }, 700));
        }
    }, [expanded]);

    useEffect(() => {
        updatePos();
    }, [subjectsRef.current?.style.height]);

    function animateExpandHeight(height: number) {
        subjectsRef.current?.style.setProperty('height', height + 'px');
    }

    function renderSubjects() {
        return subjects.map((subject, index) => {
            return <SubjectSlot {...subject} key={index}/>
        })
    }

    function allowOverflow(){
        // hover:!h-auto
        //console.log('Mouse Enter!');
        if(expanding || collapsing) {
            let tempArray = onFinishedAnimating;
            tempArray.push(()=>{
                subjectsRef.current?.style.setProperty('height', 'auto');
            })
            setOnFinishedAnimating(tempArray);
            return;
        }
        if(heightTimer) clearTimeout(heightTimer);
        subjectsRef.current?.style.setProperty('height', 'auto');
    }

    function stopOverflow() {
        //console.log('Mouse Leave!')
        if(expanding || collapsing) {
            let tempArray = onFinishedAnimating;
            tempArray.push(()=>{
                subjectsRef.current?.style.setProperty('height', (expandedRef.current ? subjectsRef.current?.scrollHeight + 4 : 0) + 'px');
            })
            setOnFinishedAnimating(tempArray);
            return;
        }
        setHeightTimer(setTimeout(()=> {
            //console.log('Setting Height to ', expanded ? (subjectsRef.current?.scrollHeight || 0) + 4 : 0);
            subjectsRef.current?.style.setProperty('height', (expandedRef.current ? subjectsRef.current?.scrollHeight + 4 : 0) + 'px');
        },700));
    }

    // todo has bug where collapsing the chevron while a subject is collapsing causes the animation to skip, can't be bothered to fix so it's a later problem :D
    return <div suppressHydrationWarning={true} id={props.id} className={`p-1 rounded w-full ${expanded ? '' : 'border bg-gray-50'} study-period`}>
        <div className={`flex w-full`}>
            <button onClick={() => {
                animateExpandHeight(lastHeight);
                setLastHeight((expanded ? (subjectsRef.current?.scrollHeight || 0) + 4 : 0));
                setExpanded(!expanded);
            }}>
                {expanded ? <LucideChevronDown/> : <LucideChevronRight/>}
            </button>
            <div className={`semester-title`}>
                Year {props.year} - {props.periodName}
            </div>
            <div className={`flex-grow`}/>
            <button onClick={()=>props.onRemoveStudyPeriod(props.id)} className={`ml-1`}>
                <LucideTrash size={17}/>
            </button>
            {/*<div className={`flex-grow`}/>*/}
        </div>
        <div ref={subjectsRef} onMouseEnter={allowOverflow} onMouseLeave={stopOverflow} className={`semester-body toggle-expand hover:!overflow-y-none ${(expanded) ? 'semester-body-expanded' : 'semester-body-collapsed'}`}>
            {showSubjects && renderSubjects()}
        </div>
    </div>
}
