import {InfoPanel} from "@/components/Planner Items/InfoPanel";
import {CourseLineup} from "@/components/Planner Items/CourseLineup";

export const Planner = ()=>{

    function updateCourseInfo(){

    }

    return (
        <div className={`flex w-full space-x-4 h-full`}>
            <CourseLineup/>
            <InfoPanel className={`hidden sm:block relative w-full`}/>
        </div>
    );
}