'use client'

import {useEffect, useRef, useState} from "react";
import {modes, SubjectData, SubjectSlot} from "@/components/Planner Items/SubjectSlot";
import {
    LucideChevronDown,
    LucideChevronRight,
    LucideTrash
} from "lucide-react";
import {ConstrainedAction, DialogueActions} from "@/components/Interactive Elements/ConstrainedAction";
import {generateDummySubject} from "@/app/util";

export interface StudyPeriodProps {
    id: string,
    className?: string,

    year?: number,
    title: string,

    onRemoveStudyPeriod?: (studyId: string) => void,
    updatePos?: (id: string, rect: HTMLDivElement) => void,
    updateEventHandler?: (periodId: string) => StudyPeriodProps

    startCollapsed?: boolean,

    mode?: modes,

    subjects?: SubjectData[],
    addSubject?: (studyPeriodId: string, subject: SubjectData) => void,
    popSubject?: (studyPeriodId: string) => void
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
            });
        }
    },[])

    useEffect(() => {
        setSubjects(props.subjects || []);
        allowOverflow()
        stopOverflow(5)
    }, [props.subjects]);

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
            return <>
                <SubjectSlot {...subject} key={props.id+subject.code} mode={props.mode}/>
                {index != (subjects.length - 1) && <hr className={'mb-[-1px]'}/>
                    /* We use a -mb here to ensure that there are no gaps between items - helps preserve animation transition smoothness */
                }
            </>
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

    function stopOverflow(amt?: number) {
        const amount = amt ?? 4;
        //console.log('Mouse Leave!')
        if(expanding || collapsing) {
            let tempArray = onFinishedAnimating;
            tempArray.push(()=>{
                subjectsRef.current?.style.setProperty('height', (expandedRef.current ? subjectsRef.current?.scrollHeight + amount : 0) + 'px');
            })
            setOnFinishedAnimating(tempArray);
            return;
        }
        setHeightTimer(setTimeout(()=> {
            //console.log('Setting Height to ', expanded ? (subjectsRef.current?.scrollHeight || 0) + 4 : 0);
            subjectsRef.current?.style.setProperty('height', (expandedRef.current ? subjectsRef.current?.scrollHeight + amount : 0) + 'px');
        },700));
    }

    function isSubjectCompatible(subject: SubjectData) {
        let flags = [] as boolean[];
        flags.push(subjects.every(testSubject => {
            if (subject.code === testSubject.code) return true;
            return !testSubject.incompatibleSubjects?.includes(subject.code);
        }));
        flags.push(subjects.length < 4);
        return flags.every(f=>f);
    }

    function addSubject(actions?: DialogueActions) {
        const subject = generateDummySubject((props.year??0)*2 - (props.title === 'Autumn' ? 2 : 1), subjects.length);
        if(isSubjectCompatible(subject)) {
            setSubjects([...subjects, subject]);
            if(props.addSubject) props.addSubject(props.id, subject);
            updatePos();
        } else {
            actions?.openDialogue(subject);
        }
    }

    function addAnyway(subject?: SubjectData) {

        if (!subject) {
            subject = generateDummySubject((props.year??0)*2 - (props.title === 'Autumn' ? 2 : 1), subjects.length);
            setSubjects([...subjects, subject]);
        }
        if(props.addSubject && subject) props.addSubject(props.id, subject);
        updatePos();
    }

    function onCancel() {
        let newSubjects = subjects;
        //newSubjects.pop();
        // if(props.popSubject) props.popSubject(props.id);
        setSubjects([...newSubjects]);
        updatePos();
    }

    function isConstrained(tempSubject?: SubjectData, showReasons?: boolean) {
        let constrained = false;
        let reasons: string[] = [];

        if(subjects.length>=4){
            constrained = true;
            reasons.push("There are too many subjects");
        }
        let subjectData = subjects;
        if (tempSubject) {
            subjectData.push(tempSubject);
        }
        const incompatibleSubjects = subjectData.map(subject => {
            let incompatible = [];
            for (const testSubject of subjectData) {
                //if (subject.code === testSubject.code) continue;
                if(subject.incompatibleSubjects?.includes(testSubject.code)) {
                    incompatible.push([subject.code, testSubject.code]);
                }
            }
            return incompatible;
        });
        for (const incompatible of incompatibleSubjects) {
            if(incompatible.length > 0) {
                reasons.push(`${incompatible[0][0]} is incompatible with ${incompatible[0][1]}`); // this is fucked, but it works so will fix later :D
            }
        }
        return {constrained, reasons}
    }

    const constrainedMessage = (subject: SubjectData | undefined, showReasons?: boolean) => {
        const constrainedReasons = isConstrained(subject).reasons;
        const msg = `Warning for the following:\n- ${constrainedReasons.join('\n- ')}\n\n You will need ~${constrainedReasons.length} rule waiver${constrainedReasons.length > 1 ? 's' : ''} for this semester`
        return {message: msg, accept: 'I\'ll get a rule waiver', decline: 'Nevermind!'}
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
            {props.mode === 0 &&
                <button onClick={() => { if(props.onRemoveStudyPeriod) props.onRemoveStudyPeriod(props.id) }} className={`ml-1`}>
                    <LucideTrash size={18}/>
                </button>
            }
            {/*<div className={`flex-grow`}/>*/}
        </div>
        <div ref={subjectsRef} onMouseEnter={allowOverflow} onMouseLeave={()=>stopOverflow(4)}
             className={`semester-body toggle-expand hover:!overflow-y-none ${(expanded) ? 'semester-body-expanded' : 'semester-body-collapsed'}`}>
            {showSubjects && renderSubjects()}
            {props.mode === 0 && <div className={`flex`}>
                <div className={`flex-grow`}/>
                <ConstrainedAction className={`pt-1.5`} action={'add'} onClick={(actions)=>addSubject(actions)} onConstrained={()=>{}} isConstrained={(bool?: boolean)=>isConstrained(undefined, bool)} onAddWhileConstrained={(subject?: SubjectData, bool?: boolean)=>constrainedMessage(subject)} onDoAnyway={(subject?: SubjectData)=>addAnyway(subject)} onCancel={onCancel}
                                   canAddWhileConstrained={true} size={32}/>
                <div className={`flex-grow`}/>
            </div>}
        </div>

    </div>
}
