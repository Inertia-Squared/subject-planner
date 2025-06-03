import {StudyPeriodProps} from "@/components/Planner Items/StudyPeriod";
import {v4} from "uuid";
import {SubjectData} from "@/components/Planner Items/SubjectSlot";

export function generateDummyStudyPeriod(sequence: number, numSubjects: number){
    let subjectData = [] as SubjectData[];
    for (let i = 0; i < numSubjects; i++) {
        subjectData.push(generateDummySubject(sequence,i));
    }
    if(numSubjects > 1){
        subjectData[0].incompatibleSubjects
    }
    let studyPeriod = {
        id: v4(),
        year: Math.floor(sequence/2) + 1,
        title: sequence % 2 == 0 ? 'Autumn' : 'Spring',
        onRemoveStudyPeriod: () => {},
        subjects: subjectData,
        updatePos: ()=>{},
        addSubject: ()=>{},
    } as StudyPeriodProps;
    return studyPeriod;
}

export function generateDummySubject(sequence: number, subjects: number){
    let data = {
        code: `XMPL123${(subjects+sequence*4)%8}`,
        name: 'Subject ' + ['a','b','c','d','e','f','g','h'][(subjects+sequence*4)%8].toUpperCase(),
        school: 'CDMS',
        description: 'This is where students are shown the university subject, as well as introduced to its vast array of possibilities. From day one, learners are immersed in a world of discovery, where every concept builds upon the last and curiosity is encouraged at every turn.',
        studentRating: (subjects+sequence*4)%10,
    } as SubjectData
    if(data.code == `XMPL1234`) {
        data.incompatibleSubjects = ['XMPL1235', 'XMPL1237'];
    }
    return data;
}
