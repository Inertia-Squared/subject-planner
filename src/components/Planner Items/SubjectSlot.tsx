'use client'

import {useEffect, useRef, useState} from "react";

export interface SubjectData {
    code: string,

    name: string,
    school: string,

    runsDuring?: string[],
    description?: string,
}

export const SubjectSlot = (props: SubjectData) => {
    const bodyRef = useRef<HTMLDivElement>(null);
    const [expanded, setExpanded] = useState(false);

    let {code, name, school, runsDuring, description} = props;
    code = code ?? 'Subject Code';
    name = name ?? 'Subject Title';
    school = school ?? 'School';
    runsDuring = runsDuring ?? ['Runs during these semesters'];
    description = description ?? 'This is where students are shown the university subject, as well as introduced to its vast array of possibilities. From day one, learners are immersed in a world of discovery, where every concept builds upon the last and curiosity is encouraged at every turn.';


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
        <div onMouseOver={expand} onMouseLeave={collapse}  className={`row-item resize-y`}>
            <div className={`row-title`}>
                {name}
            </div>
            <div className={`row-subtitle`}>
                {code} | {school}
            </div>
            <div ref={bodyRef} style={{height: (expanded ? bodyRef.current?.scrollHeight : 0) + 'px'}} className={`row-body hover-expand`}>
                {description}
            </div>
        </div>
    </>
}
