import { SubjectSlot } from "@/components/Planner Items/SubjectSlot";
import Image from "next/image";
import {StudyPeriod} from "@/components/Planner Items/StudyPeriod";
import {CourseLineup} from "@/components/Planner Items/CourseLineup";

export default function Home() {
  return (
    <div className="items-center justify-items-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex items-center justify-center sm:items-start w-full h-full">
          <div className={`flex px-0 2xl:px-60 gap-4 w-full`}>
              <div className={`w-full`}>
                  <CourseLineup/>
              </div>
          </div>
      </main>
        <footer className="flex items-center justify-center">
        © 2025 Oliver Middleton
      </footer>
    </div>
  );
}
