'use client'

import {useEffect, useRef, useState} from "react";
import {modes, SubjectData, SubjectSlot} from "@/components/Planner Items/SubjectSlot";
import {
    LucideChevronDown,
    LucideChevronRight,
    LucideTrash
} from "lucide-react";
import {ConstrainedAction, DialogueOptions} from "@/components/Interactive Elements/ConstrainedAction";
import {generateDummySubject} from "@/app/util";

export interface StudyPeriodProps {
    id: string,
    className?: string,

    year?: number,
    title: string,

    onRemoveStudyPeriod?: (studyId: string) => void,
    updatePos?: (id: string, rect: HTMLDivElement) => void,

    startCollapsed?: boolean,

    mode?: modes,

    subjects?: SubjectData[],
    addSubject: (studyPeriodId: string, subject: SubjectData) => void,
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
    const [expanding, setExpanding] = useState(!props.startCollapsed);
    const [onFinishedAnimating, setOnFinishedAnimating] = useState<(() => void)[]>([]);
    const expandedRef = useRef(expanded);


    useEffect(()=>{
        console.log(props)
        console.log("Value being passed as mode:", modes.SIMPLE);
        console.log("Recieved: ", props.mode)
        addEventListener('scroll',()=>{
            updatePos();
        })
        setLastHeight((!expanded ? (subjectsRef.current?.scrollHeight || 0) + 5 : 0));
        subjectsRef.current?.style.setProperty('height', (expanded ? (subjectsRef.current?.scrollHeight || 0) + 5 : 0) + 'px');

        if (props.startCollapsed) {
            animateExpandHeight(lastHeight);
            setLastHeight((expanded ? (subjectsRef.current?.scrollHeight || 0) + 4 : 0));
            setExpanded(!expanded);
        }
        return ()=>{
            removeEventListener('scroll',()=>{
                updatePos();
            })
        }
    },[])

    function updatePos(){
        if(subjectsRef.current && props.updatePos) props.updatePos(props.id,subjectsRef.current);
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
            return <SubjectSlot {...subject} key={index} mode={props.mode}/>
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

    function addSubject() {
        const subject = generateDummySubject(Math.round(Math.random()*16), subjects.length);
        setSubjects([...subjects, subject]);
        props.addSubject(props.id, subject);
        updatePos();
    }

    function isConstrained(){
        return subjects.length>=4;
    }

    const tooManySubjects = () => {
        return {message: 'There are too many subjects! You may need a rule waiver to do this.', accept: 'I\'ll get a rule waiver', decline: 'Nevermind!'}
    }

    // todo has bug where collapsing the chevron while a subject is collapsing causes the animation to skip, can't be bothered to fix so it's a later problem :D
    return <div suppressHydrationWarning={true} id={props.id} className={`p-1 rounded w-full ${expanded ? '' : 'border bg-gray-50'} study-period ${props.className}`}>
        <div className={`flex w-full`}>
            <button onClick={() => {
                animateExpandHeight(lastHeight);
                setLastHeight((expanded ? (subjectsRef.current?.scrollHeight || 0) + 4 : 0));
                setExpanded(!expanded);
            }}>
                {expanded ? <LucideChevronDown/> : <LucideChevronRight/>}
            </button>
            <div className={`semester-title`}>
                {props.year ? `Year ${props.year} - ${props.title}` : props.title}
            </div>
            <div className={`flex-grow`}/>
            {!(props.mode === modes.SIMPLE) && <button onClick={() => {
                if(props.onRemoveStudyPeriod) props.onRemoveStudyPeriod(props.id);
            }}
                     className={`ml-1`}>
                <LucideTrash size={17}/>
            </button>}
            {/*<div className={`flex-grow`}/>*/}
        </div>
        <div ref={subjectsRef} onMouseEnter={allowOverflow} onMouseLeave={stopOverflow}
             className={`semester-body toggle-expand hover:!overflow-y-none ${(expanded) ? 'semester-body-expanded' : 'semester-body-collapsed'}`}>
            {showSubjects && renderSubjects()}
            <div className={`flex`}>
                <div className={`flex-grow`}/>
                <ConstrainedAction className={`pt-1.5`} action={'add'} onClick={addSubject} onConstrained={() => {
                }} isConstrained={isConstrained} onAddWhileConstrained={tooManySubjects} onDoAnyway={addSubject}
                                   canAddWhileConstrained={true} size={32}/>
                <div className={`flex-grow`}/>
            </div>
        </div>

    </div>
}
