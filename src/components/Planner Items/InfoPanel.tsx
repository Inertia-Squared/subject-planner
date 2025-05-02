'use client'
import {DetailedHTMLProps, useEffect, useState} from "react";
import Markdown from "react-markdown";
import {StudyPeriodProps} from "@/components/Planner Items/StudyPeriod";

interface InfoPanelProps extends DetailedHTMLProps<any, any> {
    studyPeriodData: StudyPeriodProps[]
}

export const InfoPanel = (props: InfoPanelProps) => {
    const [yTarget, setYTarget] = useState(0);
    const [contentValue, setContentValue] = useState('');
    const [maxScrollAmt, setMaxScrollAmt] = useState(0);
    const [studyPeriods, setStudyPeriods] = useState<StudyPeriodProps[]>(props.studyPeriodData);
    const [activeStudyPeriod, setActiveStudyPeriod] = useState(studyPeriods[0]);


    useEffect(()=>{
        setMaxScrollAmt(Math.max(document.body.scrollHeight, document.body.offsetHeight,
            document.documentElement.clientHeight, document.documentElement.scrollHeight,
            document.documentElement.offsetHeight) - window.innerHeight);
    },[document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight,
        document.documentElement.scrollHeight, document.documentElement.offsetHeight])

    useEffect(() => {
        addEventListener('scroll', ()=>onScroll());
        return () => {
            removeEventListener('scroll', ()=>onScroll());
        }
    }, []);

    function setActivePeriod(){
        const index = Math.round((Math.round(window.scrollY) / maxScrollAmt) * studyPeriods.length)
        setActiveStudyPeriod(studyPeriods[index])
    }

    function onScroll(){
        setYTarget(window?.scrollY);
        setActivePeriod();
    }

    function setContent(content: string){
        setContentValue(content);
    }


    return(<div {...props}>
        <div style={{top: `${yTarget}px`}} className={`absolute w-full h-[80vh] border-2 bg-gray-50 ease-out duration-300`}>
            <div>{`${window.scrollY}, ${maxScrollAmt}`}</div>
            <div>{Math.floor((Math.round(window.scrollY) / maxScrollAmt) * studyPeriods.length)}</div>
            <div>{activeStudyPeriod?.year ?? 'none' + ' - ' + activeStudyPeriod?.name ?? 'none'}</div>
        </div>
    </div>)
}