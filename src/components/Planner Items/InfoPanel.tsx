'use client'
import {DetailedHTMLProps, useEffect, useState} from "react";
import Markdown from "react-markdown";

interface InfoPanelProps extends DetailedHTMLProps<any, any> {

}

export const InfoPanel = (props?: InfoPanelProps) => {
    const [yTarget, setYTarget] = useState(0);
    const [contentValue, setContentValue] = useState('');
    const [maxScrollAmt, setMaxScrollAmt] = useState(0);

    useEffect(()=>{
        setMaxScrollAmt(Math.max(document.body.scrollHeight, document.body.offsetHeight,
            document.documentElement.clientHeight, document.documentElement.scrollHeight,
            document.documentElement.offsetHeight) - window.innerHeight);
    },[document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight,
        document.documentElement.scrollHeight, document.documentElement.offsetHeight])

    useEffect(() => {
        addEventListener('scroll', ()=>setYTarget(window?.scrollY));
        return () => {
            removeEventListener('scroll', ()=>setYTarget(window?.scrollY));
        }
    }, []);

    function setContent(content: string){
        setContentValue(content);
    }


    return(<div {...props}>
        <div style={{top: `${yTarget}px`}} className={`absolute w-full h-[80vh] border-2 bg-gray-50 ease-out duration-300`}>
            <div>{`${window.scrollY}, ${maxScrollAmt}`}</div>
        </div>
    </div>)
}