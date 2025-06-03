'use client'

import {useEffect, useState} from "react";
import {StudyPeriod, StudyPeriodProps} from "@/components/Planner Items/StudyPeriod";
import {ConstrainedAction} from "@/components/Interactive Elements/ConstrainedAction";
import {InfoPanel} from "@/components/Planner Items/InfoPanel";
import {LucideBook, LucideBookCheck, LucideBrush, LucidePlus, LucideSettings, LucideSparkle} from "lucide-react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {MenuItem, Select} from "@mui/material";
import {modes, SubjectData} from "@/components/Planner Items/SubjectSlot";
import {generateDummyStudyPeriod} from "@/app/util";
import {SettingsMenu} from "@/components/Menus/SettingsMenu";

export interface CourseLineupData {
    studyPeriods: StudyPeriodProps[],
    onUpdateStudyPeriods: (period: StudyPeriodProps[]) => void,
    mode?: modes,
}

export const CourseLineup = (props: CourseLineupData) => {
    const [studyPeriods, setStudyPeriods] = useState<StudyPeriodProps[]>(props.studyPeriods);
    const [isConstrained, setIsConstrained] = useState<boolean>(false);
    const [studyPeriodPositions, setStudyPeriodPositions] = useState<{[id: string]: HTMLDivElement}>({});
    const [settingsOpen, setSettingsOpen] = useState<boolean>(false);

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
        setStudyPeriods([...studyPeriods, generateDummyStudyPeriod(studyPeriods.length,0)])
    }

    const onReachedSemesterLimit = () => {

    }

    const hasReachedSemesterLimit  = () => {
        return {constrained: studyPeriods.length >= 16};
    }

    const addWaiverRequiredPeriod = () => {
        setStudyPeriods([...studyPeriods, generateDummyStudyPeriod(studyPeriods.length,0)])
    }

    const tooManyStudyPeriods = () => {
        return {message: 'There are too many study periods! You may need a rule waiver to do this.', accept: 'I\'ll get a rule waiver', decline: 'Nevermind!'}
    }


    const onRemoveStudyPeriod = (id: string) => {
        let tempArray = studyPeriods.filter((p)=>p.id !== id);
        setStudyPeriods(tempArray);
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
                <StudyPeriod {...study} updatePos={setStudyPeriodPos} onRemoveStudyPeriod={onRemoveStudyPeriod} popSubject={popSubject} addSubject={addSubject} mode={props.mode} />
                {!(index>=studyPeriods.length-1 && isConstrained) &&
                    <div className={`w-0 border-2 border-dashed border-blue-300 ${offset}`}/>
                }
            </div>
        })
    }

    function getStudyPeriods(): StudyPeriodProps[]{
        return studyPeriods;
    }

    function addSubject(studyPeriodId: string, subject: SubjectData){
        let tempPeriods = studyPeriods;
        tempPeriods = tempPeriods.map(period=>{
            if(period.id === studyPeriodId){
                if(!period.subjects) period.subjects = [subject];
                else period.subjects.push(subject);
                return period;
            } else return period;
        });
        console.log(tempPeriods)
        setStudyPeriods(tempPeriods);
    }

    function popSubject(studyPeriodId: string){
        let tempPeriods = studyPeriods;
        tempPeriods = tempPeriods.map(period=>{
            if(period.id === studyPeriodId){
                period.subjects?.pop();
                return period;
            } else return period;
        });
        setStudyPeriods(tempPeriods);
    }

    function openSettings(){
        setSettingsOpen(true);
    }

    function closeSettings(){
        setSettingsOpen(false);
    }

    return (
        <div className={`relative flex w-full space-x-4 h-full lg:pl-12 pr-2`}>

            {props.mode !== 2 && <div
                className={`grid fixed h-16 w-80 lg:w-16 lg:h-80 border-2 border-blue-400 rounded lg:left-4 lg:bottom-0 bottom-4 left-6 lg:top-[30%] bg-gradient-to-r from-blue-300 via-blue-200 to-blue-200 lg:grid-rows-4 grid-cols-4 lg:grid-cols-none justify-center items-center`}>
                <div className={`p-2 font-extrabold`}><LucideSparkle size={33}/></div>
                <button><LucideBook className={`relative border bg-blue-300 p-2 rounded-lg justify-center`}
                                    size={48}><LucidePlus className={`content-center`} size={12} x={6}
                                                          y={3}/></LucideBook></button>
                <button><LucideBook className={`relative border bg-blue-300 p-2 rounded-lg `} size={48}><LucideBrush
                    size={12} x={6} y={3}/></LucideBook>
                </button>
                <button><LucideBookCheck className={`border bg-blue-300 p-2 rounded-lg`} size={48}/></button>

            </div>}
            <div className={``}>
                <div className={`text-5xl font-bold mb-4`}>{props.mode !== 2 && 'Subject Planner'}</div>
                <div className={`justify-center w-full rounded bg-blue-100`}>
                    {props.mode !== 2 && <div>
                        <div className={`bg-gray-50 pr-2 rounded-t p-2`}>
                            <div className={`text-3xl font-semibold`}>Your Timeline</div>
                            <Markdown remarkPlugins={[remarkGfm]}>
                                Here you can view, build, and customise your course lineup. Use the __Create Lineup__,
                                __Modify Lineup__, or __Check Lineup__ tools to the left to get started!
                            </Markdown>

                        </div>
                        <div className={`flex`}>
                            <div>
                                <div className={`flex m-2 text-lg font-semibold`}>Course:<Select className={`ml-2`}
                                                                                                 defaultValue={'a'}
                                                                                                 variant={'standard'}>
                                    <MenuItem value={'a'}>Course A</MenuItem>
                                    <MenuItem value={'b'}>Course B</MenuItem>
                                    <MenuItem value={'c'}>Course C</MenuItem>
                                </Select></div>
                                <div className={`flex m-2 text-lg font-semibold`}>Major:<Select className={`ml-5`}
                                                                                                defaultValue={'c'}
                                                                                                variant={'standard'}>
                                    <MenuItem value={'a'}>Major A</MenuItem>
                                    <MenuItem value={'b'}>Major B</MenuItem>
                                    <MenuItem value={'c'}>Major C</MenuItem>
                                </Select></div>
                                <div className={`flex m-2 text-lg font-semibold`}>Minor:<Select className={`ml-5`}
                                                                                                defaultValue={'b'}
                                                                                                variant={'standard'}>
                                    <MenuItem value={'a'}>Minor A</MenuItem>
                                    <MenuItem value={'b'}>Minor B</MenuItem>
                                    <MenuItem value={'c'}>Minor C</MenuItem>
                                </Select></div>

                            </div>
                            <div className={`flex-grow`}/>
                            <div className={`grid-rows-4`}>
                                <button className={`ml-20 p-2`} onClick={openSettings}><LucideSettings/></button>
                            </div>
                        </div>
                    </div>}
                    <hr className={`border border-blue-200`}/>
                    <div className={`mb-[2vh] h-0 border-4 border-blue-100`}/>
                    {renderStudyPeriods()}
                    {props.mode !== 2 && <div className={`flex justify-center -mt-0 `}>
                        <ConstrainedAction action={'add'} onClick={newStudyPeriod}
                                           onConstrained={onReachedSemesterLimit}
                                           isConstrained={hasReachedSemesterLimit}
                                           onAddWhileConstrained={tooManyStudyPeriods}
                                           onDoAnyway={addWaiverRequiredPeriod} canAddWhileConstrained={true}/>
                    </div>}
                    <div className={`flex w-full my-4 mt-8`}>
                        <div className={`flex-grow`}></div>
                        {props.mode !== 2 ? <div>
                            <a href={'/save'}
                               className={`px-4 py-2 border border-blue-700 rounded-lg bg-blue-200 m-2 cursor-pointer`}>Save
                                As...</a>
                            <a href={'/next-steps'}
                               className={`px-4 py-2 border border-blue-700 rounded-lg bg-blue-200 m-2 cursor-pointer`}>Done! What's next?</a>
                        </div> : <div>
                            <a href={'/planner'}
                               className={`px-4 py-2 border border-blue-700 rounded-lg bg-blue-200 m-2 cursor-pointer`}>Go Back!</a>
                            <button onClick={() => alert('[Saved Action/Confirmation will appear here!]')}
                                    className={`px-4 py-2 border border-blue-700 rounded-lg bg-blue-200 m-2 cursor-pointer`}>Done!
                            </button>
                        </div>}
                    </div>
                    <hr className={`mb-96`}/>
                    {settingsOpen && <SettingsMenu onClose={closeSettings}/>}
                </div>

            </div>
            {props.mode?.valueOf() !== 2 &&
                <InfoPanel mode={props.mode} getStudyPeriodPositions={getStudyPeriodPositions}
                                                    getStudyPeriods={getStudyPeriods}
                                                    className={`hidden lg:block relative w-full`}/>}
        </div>);
}
