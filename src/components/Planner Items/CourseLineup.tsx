'use client'

import {useEffect, useState} from "react";
import {StudyPeriod, StudyPeriodProps} from "@/components/Planner Items/StudyPeriod";
import {ConstrainedAction} from "@/components/Interactive Elements/ConstrainedAction";
import {generateDummyStudyPeriod} from "@/app/util";

export interface CourseLineupData {
    studyPeriods: StudyPeriodProps[],
    onUpdateStudyPeriods: (period: StudyPeriodProps[]) => void,
}

export const CourseLineup = (props: CourseLineupData) => {
    const [studyPeriods, setStudyPeriods] = useState<StudyPeriodProps[]>(props.studyPeriods);
    const [isConstrained, setIsConstrained] = useState<boolean>(false);

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

    function renderStudyPeriods() {
        return studyPeriods.map((study, index) => {
            return <div key={index} className={`flex flex-col items-center `}>
                <StudyPeriod {...study}/>
                {!(index>=studyPeriods.length-1 && isConstrained) &&
                    <div className={`w-0 border-2 border-dashed border-blue-300 mb-[-32px] h-[64px]`}/>
                }
            </div>
        })
    }

    return (
        <div className={`h-full`}>
            <div className={`text-5xl font-bold mb-[2vh] md:mb-[10vh]`}>Subject Planner</div>
            <div className={`justify-center w-full rounded bg-blue-100`}>

                <div className={`bg-gray-50 pr-2 rounded-t p-2`}>
                    <div className={`text-3xl font-semibold`}>Your Timeline</div>
                    <div className={`text-lg`}>Here you can view, build, and customise your course lineup. Use any of
                        the
                        three tools to the left to
                        get started!
                    </div>

                </div>
                <div className={`mb-[2vh] h-0 border-4 border-blue-100`}/>

                {renderStudyPeriods()}
                <div className={`flex justify-center -mt-1`}>
                    <ConstrainedAction action={'add'} onClick={newStudyPeriod} onConstrained={onReachedSemesterLimit}
                                       isConstrained={hasReachedSemesterLimit}
                                       onAddWhileConstrained={tooManyStudyPeriods}
                                       onDoAnyway={addWaiverRequiredPeriod} canAddWhileConstrained={true}/>
                </div>
            </div>
        </div>);
}
