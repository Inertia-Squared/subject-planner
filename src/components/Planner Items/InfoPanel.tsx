'use client'
import {DetailedHTMLProps, useEffect, useMemo, useRef, useState} from "react";
import Markdown from "react-markdown";
import {StudyPeriodProps} from "@/components/Planner Items/StudyPeriod";

interface InfoPanelProps extends DetailedHTMLProps<any, any> {
    getStudyPeriods: ()=>StudyPeriodProps[],
    getStudyPeriodPositions: ()=>{[id: string]: HTMLDivElement},
}

function useIsClient(){
    const [isClient, setIsClient] = useState(false);
    useEffect(()=>setIsClient(true),[]);
    return isClient;
}

export const InfoPanel = (props: InfoPanelProps) => {
    const [yTarget, setYTarget] = useState(0);
    const {getStudyPeriods, getStudyPeriodPositions, ...htmlProps} = props;
    const infoRef = useRef<HTMLDivElement>(null);
    const [spanAmt, setSpanAmt] = useState('col-span-2');

    // const [switchThresholds, setSwitchThresholds] = useState<number[]>([]);
    const [selectedPanel, setSelectedPanel] = useState<StudyPeriodProps>(getStudyPeriods()[0]);



    function updateInfoPanel(){
        let studyDict: { [myKey: string]: StudyPeriodProps } = {}
        getStudyPeriods().forEach((period: StudyPeriodProps)=>{
            studyDict[period.id] = period;
        });
        let tempArray: (string | number)[][] = [];
        const positions = getStudyPeriodPositions();
        for (const pos of Object.entries(positions)){
            const elementBox = pos[1] as unknown as HTMLElement;
            const infoBox = infoRef.current;
            const elementPos = elementBox?.offsetTop + elementBox?.offsetHeight;
            if (infoBox){
                const distance = (yTarget + infoBox.getBoundingClientRect().bottom - elementPos);
                if(distance >= 0) tempArray.push([pos[0],distance])
            }
        }
        const selectedId = (tempArray.sort((a,b)=>a[1] <= b[1]?-1:0)[0][0]) as string;
        setSelectedPanel(studyDict[selectedId??1]); // weird fix for when auto-generating subjects and the panel settles above the first period before settling on anything else first
    }

    useEffect(() => {
        addEventListener('scroll', ()=>onScroll());
        addEventListener('resize',() => checkWidth());
        addEventListener('mouseup',()=> {
            setTimeout(() => checkWidth(), 10)
            setTimeout(() => checkWidth(), 750)
        })
        return () => {
            removeEventListener('scroll', ()=>onScroll());
            removeEventListener('mouseup',()=> {
                setTimeout(() => checkWidth(), 10)
                setTimeout(() => checkWidth(), 750)
            })
            removeEventListener('resize',() => checkWidth());
        }
    }, []);

    function onScroll(){
        setYTarget(window?.scrollY);
    }

    function renderSubjectInfo(){
        const data = selectedPanel?.subjects;
        if(data) {
            return (<div className={`grid grid-cols-2`}>
                {data.map((subject, index)=>{
                    return (<div className={spanAmt} key={index}>
                        <div className={`p-2 border-2 m-2`}>
                            <div className={`xl:flex`}>
                                <div className={`mr-1`}>{subject.name}</div>
                                <div className={`flex xl:flex-grow`}>
                                    <div className={`text-sm text-gray-400 font-light mt-0.5 xl:ml-1`}>{subject.code}</div>
                                    <div className={`xl:flex-grow`}/>
                                    <div className={`font-semibold text-gray-400 ml-1`}>{subject.school}</div>
                                </div>
                            </div>
                            {/*<div className={`text-sm`}>*/}
                            {/*    {subject.description}*/}
                            {/*</div>*/}
                            <div className={`text-sm font-light`}>
                                Credit Points: 10
                            </div>
                            <div className={`text-sm font-light`}>
                                Prerequisites: None
                            </div>
                            {subject.studentRating ?
                                <div className={`text-sm font-light mt-2`}>
                                    Student Rating: {subject.studentRating}
                                </div> : ''
                            }
                            {
                                (subject.incompatibleSubjects && subject.incompatibleSubjects?.length > 0) &&
                                <div className={`text-sm font-light mt-2`}>
                                    Incompatible Subjects: {subject.incompatibleSubjects?.join(', ')}
                                </div>
                            }
                        </div>
                        <div></div>
                    </div>)
                })}
            </div>);
        }
    }

    function checkWidth(){
        if(infoRef.current && infoRef.current.clientWidth > 1000){
            setSpanAmt('col-span-1');
        } else setSpanAmt('col-span-2');

    }


    return(<div {...htmlProps}>
        <div onTransitionEnd={updateInfoPanel} style={{top: `${yTarget}px`}} ref={infoRef} className={`absolute w-full h-fit border-2 bg-gray-50 ease-out duration-300 p-4 ${spanAmt === 'col-span-2' ? 'min-h-[609px]' : 'min-h-[340px]'}`}>
            <div className={`font-extrabold text-2xl`}>INFO</div>
            <hr/>
            <div className={`font-semibold text-xl`}>Year {selectedPanel?.year + ' - ' + selectedPanel?.title}</div>
            {renderSubjectInfo()}
        </div>
    </div>)
}
