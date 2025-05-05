'use client'

import {useEffect, useState} from "react";
import {StudyPeriod, StudyPeriodProps} from "@/components/Planner Items/StudyPeriod";
import {ConstrainedAction} from "@/components/Interactive Elements/ConstrainedAction";
import {generateDummyStudyPeriod} from "@/app/util";
import {InfoPanel} from "@/components/Planner Items/InfoPanel";
import {LucideBook, LucideBookCheck, LucideBrush, LucidePlus} from "lucide-react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export interface CourseLineupData {
    studyPeriods: StudyPeriodProps[],
    onUpdateStudyPeriods: (period: StudyPeriodProps[]) => void,
}

export const CourseLineup = (props: CourseLineupData) => {
    const [studyPeriods, setStudyPeriods] = useState<StudyPeriodProps[]>(props.studyPeriods);
    const [isConstrained, setIsConstrained] = useState<boolean>(false);
    const [studyPeriodPositions, setStudyPeriodPositions] = useState<{[id: string]: HTMLDivElement}>({});

    function getStudyPeriodPositions(): { [id: string]: HTMLDivElement } {
        return studyPeriodPositions;
    }

    function setStudyPeriodPos(id: string, ref: HTMLDivElement) {
        let newStudyPos = studyPeriodPositions;
        newStudyPos[id] = ref;
        setStudyPeriodPositions(newStudyPos);
    }

    useEffect(() => {
        props.onUpdateStudyPeriods(studyPeriods);
    }, [studyPeriods]);

    const newStudyPeriod = () => {
        setStudyPeriods([...studyPeriods, generateDummyStudyPeriod(studyPeriods.length)])
    }

    const onReachedSemesterLimit = () => {

    }

    const hasReachedSemesterLimit  = () => {
        return studyPeriods.length >= 16;
    }

    const addWaiverRequiredPeriod = () => {
        setStudyPeriods([...studyPeriods, generateDummyStudyPeriod(studyPeriods.length)])
    }

    const tooManyStudyPeriods = () => {
        return {message: 'There are too many study periods! You may need a rule waiver to do this.', accept: 'I\'ll get a rule waiver', decline: 'Nevermind!'}
    }


    const onRemoveStudyPeriod = (index: string) => {
        // let tempArray;
        // if(index == 0){
        //     tempArray = studyPeriods.slice(1);
        // } else {
        //     tempArray = studyPeriods.slice(0, index);
        //     tempArray = [...tempArray, ...studyPeriods.slice(index+1)];
        // }
        // setStudyPeriods(tempArray);
    }

    // ref={(ref)=>{
    //     if(ref) {
    //         const alreadyContains = refs.current.includes(ref);
    //         console.log(ref.id)
    //         if(!alreadyContains) refs.current.push(ref);
    //     }
    // }}

    function renderStudyPeriods() {
        return studyPeriods.map((study, index) => {
            const offset = index>=studyPeriods.length-1 ? 'mb-[0px] h-[30px]' : 'mb-[-30px] h-[100px]'
            return <div key={index} className={`flex flex-col items-center `}>
                <StudyPeriod {...study} updatePos={setStudyPeriodPos}/>
                {!(index>=studyPeriods.length-1 && isConstrained) &&
                    <div className={`w-0 border-2 border-dashed border-blue-300 ${offset}`}/>
                }
            </div>
        })
    }

    function getStudyPeriods(): StudyPeriodProps[]{
        return studyPeriods;
    }

    return (
        <div className={`relative flex w-full space-x-4 h-full lg:pl-12 pr-2`}>
            <div
                className={`grid fixed h-16 w-80 lg:w-16 lg:h-80 border-2 border-blue-900 rounded lg:left-4 lg:bottom-0 bottom-4 left-6 lg:top-[30%] bg-gradient-to-r from-blue-300 via-blue-200 to-blue-200 lg:grid-rows-4 grid-cols-4 lg:grid-cols-none justify-center items-center`}>
                <div className={`p-2 font-extrabold`}>WIP</div>
                <button><LucideBook className={`relative border bg-blue-300 p-2 rounded-lg justify-center`} size={48}><LucidePlus className={`content-center`} size={12} x={6} y={3}/></LucideBook></button>
                <button><LucideBook className={`relative border bg-blue-300 p-2 rounded-lg `} size={48}><LucideBrush size={12} x={6} y={3}/></LucideBook>
                </button>
                <button><LucideBookCheck className={`border bg-blue-300 p-2 rounded-lg`} size={48}/></button>

            </div>
            <div className={``}>
                <div className={`text-5xl font-bold mb-[2vh] md:mb-[10vh]`}>Subject Planner</div>
                <div className={`justify-center w-full rounded bg-blue-100`}>

                    <div className={`bg-gray-50 pr-2 rounded-t p-2`}>
                        <div className={`text-3xl font-semibold`}>Your Timeline</div>
                        <Markdown remarkPlugins={[remarkGfm]}>
                            Here you can view, build, and customise your course lineup. Use the __Create Lineup__, __Modify Lineup__, or __Check Lineup__ tools to the left to get started!
                        </Markdown>

                    </div>
                    <div className={`mb-[2vh] h-0 border-4 border-blue-100`}/>
                    {renderStudyPeriods()}
                    <div className={`flex justify-center -mt-0 mb-96`}>
                        <ConstrainedAction action={'add'} onClick={newStudyPeriod}
                                           onConstrained={onReachedSemesterLimit}
                                           isConstrained={hasReachedSemesterLimit}
                                           onAddWhileConstrained={tooManyStudyPeriods}
                                           onDoAnyway={addWaiverRequiredPeriod} canAddWhileConstrained={true}/>
                    </div>
                </div>
            </div>
            <InfoPanel getStudyPeriodPositions={getStudyPeriodPositions} getStudyPeriods={getStudyPeriods} className={`hidden lg:block relative w-full`}/>
        </div>);
}
