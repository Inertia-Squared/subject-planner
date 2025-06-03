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
    incompatibleSubjects?: string[], // codes
    studentRating?: number,
}

export enum modes {
    DEFAULT = 0,
    SIMPLE,
    PREVIEW
}


export const SubjectSlot = (props: SubjectData) => {
    const bodyRef = useRef<HTMLDivElement>(null);
    const mainRef = useRef<HTMLDivElement>(null);
    const [expanded, setExpanded] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const expandEvent = new CustomEvent('onSubjectExpand', {detail: mainRef});

    const [mainHeight, setMainHeight] = useState(0);

    let {code, name, school, runsDuring, description} = props;
    runsDuring = runsDuring ?? ['Runs during these semesters'];


    function collapse() {
        setExpanded(false);
        if (mainRef.current) {
            mainRef.current.style.setProperty('padding-bottom', '0px');
            mainRef.current.style.setProperty('margin-bottom', '-0px');
        }
    }

    function expand() {
        setExpanded(true);
        if (mainRef.current) {
            mainRef.current.style.setProperty('padding-bottom', '48px');
            mainRef.current.style.setProperty('margin-bottom', '-48px');
        }
        window.dispatchEvent(expandEvent);
    }

    function handleExpandEvent(e: CustomEvent) {
        if (e.detail !== mainRef) {
            collapse();
        }
    }

    useEffect(() => {
        window.addEventListener('mousemove', (e)=>onMouseMove(e));
        window.addEventListener('onSubjectExpand', (e)=>handleExpandEvent(e as CustomEvent));
        return () => {
            window.removeEventListener('mousemove', (e)=>onMouseMove(e));
            window.removeEventListener('onSubjectExpand', (e)=>handleExpandEvent(e as CustomEvent));
        }
    }, []);

    function onMouseMove(e: MouseEvent) {
        //console.log('Mouse Moved!')
        if (mainRef.current) {
            const bounds = mainRef.current.getBoundingClientRect();
            if (e.clientX < bounds.left || e.clientX > bounds.right || e.clientY < bounds.top || e.clientY > bounds.bottom) {
                collapse();
                setIsHovering(false);
            } else if (e.clientX >= bounds.left && e.clientX <= bounds.right && e.clientY >= bounds.top && e.clientY <= bounds.bottom) {
                    expand();
                    setIsHovering(true);
            }
        }
    }
//onMouseOver={expand} onMouseLeave={collapse}
    return <>
        <div ref={mainRef} onMouseOver={expand} className={`row-item flex resize-y ${props.mode === modes.SIMPLE ? '!border-none' : ''}`}>
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
            {(props.mode === 0) && <button><LucideTrash size={16}/></button>}
        </div>
    </>
}
