'use client'
import {StudyPeriod, StudyPeriodProps} from "@/components/Planner Items/StudyPeriod";
import {Planner} from "@/components/Planner Items/Planner";
import {useState} from "react";
import {generateDummyStudyPeriod} from "@/app/util";
import {MenuItem, Select} from "@mui/material";

export default function Home() {

    return (
        <div className="items-start justify-items-center min-h-screen p-0 font-[family-name:var(--font-geist-sans)] w-full bg-gradient-to-r from-blue-200 via-blue-50 to-cyan-50">
            <main className="items-start justify-start sm:items-start w-full h-full p-6 md:px-32 space-y-2 pt-16">
                <div className={`text-5xl font-bold mb-4 ml-12`}>Preview Before Exporting</div>
                <div className={`flex m-2 text-lg font-semibold ml-12`}>Type:<Select className={`ml-2`}
                                                                                 defaultValue={'a'}
                                                                                 variant={'standard'}>
                    <MenuItem value={'a'}>Image</MenuItem>
                    <MenuItem value={'b'}>Page Link (to continue later)</MenuItem>
                    <MenuItem value={'c'}>PDF</MenuItem>
                </Select></div>
                <Planner mode={2}/>
            </main>

        </div>
    );
}
