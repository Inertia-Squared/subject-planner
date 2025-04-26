'use client'

import {useState} from "react";
import {StudyPeriod} from "@/components/Planner Items/StudyPeriod";
import {ConstrainedAction} from "@/components/Interactive Elements/ConstrainedAction";

export const CourseLineup = () => {
    const [studyPeriods, setStudyPeriods] = useState([1,2,3,4])
    const [isConstrained, setIsConstrained] = useState<boolean>(false);

    const newStudyPeriod = () => {
        setStudyPeriods([...studyPeriods, studyPeriods.length + 1])
    }

    const onReachedSemesterLimit = () => {

    }

    const hasReachedSemesterLimit  = () => {
        return studyPeriods.length >= 16;
    }

    const addWaiverRequiredPeriod = () => {
        setStudyPeriods([...studyPeriods, studyPeriods.length + 1])
    }

    const tooManyStudyPeriods = () => {
        return {message: 'There are too many study periods! You may need a rule waiver to do this.', accept: 'I\'ll get a rule waiver', decline: 'Nevermind!'}
    }


    const onRemoveStudyPeriod = (index: number) => {
        let tempArray;
        if(index == 0){
            tempArray = studyPeriods.slice(1);
        } else {
            tempArray = studyPeriods.slice(0, index);
            tempArray = [...tempArray, ...studyPeriods.slice(index+1)];
        }
        setStudyPeriods(tempArray);
    }

    function renderStudyPeriods() {
        return studyPeriods.map((study, index) => {
            return <div key={index} className={`flex flex-col items-center`}>
                <StudyPeriod onRemoveStudyPeriod={onRemoveStudyPeriod} year={2025 + Math.floor(index / 2)} name={`Study Period ${(index % 2) + 1}`} index={index}/>
                {!(index>=studyPeriods.length-1 && isConstrained) &&
                    <div className={`w-0 border-2 border-dashed h-16 mb-[-26px]`}/>
                }
            </div>
        })
    }

    return <>
        <div className={`justify-center content-center items-center`}>
            {renderStudyPeriods()}
            <div className={`flex justify-center m-5`}>
                <ConstrainedAction action={'add'} onClick={newStudyPeriod} onConstrained={onReachedSemesterLimit} isConstrained={hasReachedSemesterLimit} onAddWhileConstrained={tooManyStudyPeriods} onDoAnyway={addWaiverRequiredPeriod} canAddWhileConstrained={true}/>
            </div>
        </div>
    </>
}
