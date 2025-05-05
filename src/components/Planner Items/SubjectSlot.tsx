'use client'

import {useEffect, useRef, useState} from "react";
import {LucideTrash} from "lucide-react";

export interface SubjectData {
    code: string,

    name: string,
    school: string,

    runsDuring?: string[],
    description?: string,
    mode?: modes,
}

export enum modes {
    DEFAULT = 0,
    SIMPLE
}


export const SubjectSlot = (props: SubjectData) => {
    const bodyRef = useRef<HTMLDivElement>(null);
    const [expanded, setExpanded] = useState(false);

    let {code, name, school, runsDuring, description} = props;
    runsDuring = runsDuring ?? ['Runs during these semesters'];


    function collapse() {
        setExpanded(false);
    }

    function expand() {
        setExpanded(true);
    }

    useEffect(()=>{
        // console.log(props)
    },[])

    return <>
        <div onMouseOver={expand} onMouseLeave={collapse} className={`row-item flex resize-y ${props.mode === modes.SIMPLE ? '!border-none' : ''}`}>
            <div>
                <div className={`row-title`}>
                    {name}
                </div>
                <div className={`row-subtitle`}>
                    {code && school ? `${code} | ${school}` : (description) ? 'Hover to read more' : ' '}
                </div>
                <div ref={bodyRef} style={{height: (expanded ? bodyRef.current?.scrollHeight : 0) + 'px'}}
                     className={`row-body hover-expand`}>
                    {description}
                </div>
            </div>
            <div className={`flex-grow`}/>
            {props.mode === 0 && <button><LucideTrash size={16}/></button>}
        </div>
    </>
}
