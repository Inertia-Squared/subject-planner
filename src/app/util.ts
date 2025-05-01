import {StudyPeriodProps} from "@/components/Planner Items/StudyPeriod";
import {v4} from "uuid";
import {SubjectData} from "@/components/Planner Items/SubjectSlot";

export function generateDummyStudyPeriod(sequence: number){
    let subjectData = [] as SubjectData[];
    for (let i = 0; i < 4; i++) {
        subjectData.push({
            code: 'XMPL1234',
            name: 'Subject Name',
            school: 'CDMS',
        } as SubjectData)
    }
    let studyPeriod = {
        id: v4(),
        year: Math.floor(sequence/2) + 1,
        name: sequence % 2 == 0 ? 'Autumn' : 'Winter',
        onRemoveStudyPeriod: () => {},
        subjects: subjectData
    } as StudyPeriodProps;

    return studyPeriod;
}