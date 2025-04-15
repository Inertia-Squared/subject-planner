'use client'

import {useRef, useState} from "react";

export const SubjectSlot = () => {
    const bodyRef = useRef<HTMLDivElement>(null);
    const [expanded, setExpanded] = useState(false);

    function collapse() {
        setExpanded(false);
    }

    function expand() {
        setExpanded(true);
    }

    return <>
        <div onMouseOver={expand} onMouseLeave={collapse}  className={`row-item resize-y`}>
            <div className={`row-title`}>
                Subject Title
            </div>
            <div className={`row-subtitle`}>
                Subject Code | School
            </div>
            <div ref={bodyRef} style={{height: (expanded ? bodyRef.current?.scrollHeight : 0) + 'px'}} className={`row-body hover-expand`}>
                This is where students are shown the university subject, as well as introduced to its vast array of possibilities. From day one, learners are immersed in a world of discovery, where every concept builds upon the last and curiosity is encouraged at every turn.
            </div>
        </div>
    </>
}
