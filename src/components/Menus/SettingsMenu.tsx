import {Checkbox, InputLabel, MenuItem, Select} from "@mui/material";
import {LucideCross, LucideX} from "lucide-react";


interface SettingsMenuProps {
    onClose?: () => void;
}

export const SettingsMenu = (props: SettingsMenuProps)=>{
    return(<div>
        <div className={`fixed grid grid-cols-2 w-[95%] md:w-3/4 h-96 border-4 border-gray-300 z-20 bg-gray-50 left-[2.5%] md:left-[12.5%] top-1/4 p-2`}>
            <div>
                <div className={`font-semibold text-xl`}>Planner Settings</div>
                <div className={`flex`}>
                    <Checkbox/>
                    <div className={`pt-2.5`}>Allow override of Subject limits</div>
                </div>
                <div className={`flex`}>
                    <Checkbox/>
                    <div className={`pt-2.5`}>Allow override of Semester limits</div>
                </div>
                <div className={`flex mt-6 ml-3`}>
                    <div className={`pt-1 pr-1.5`}>Uses</div>
                    <Select variant={'standard'} defaultValue={'b'}>
                        <MenuItem value={'a'}>Mode A</MenuItem>
                        <MenuItem value={'b'}>Mode B</MenuItem>
                        <MenuItem value={'c'}>Mode C</MenuItem>
                    </Select>
                    <div className={`pt-1 pl-0.5`}>under circumstance X.</div>
                </div>
            </div>
            <div className={`flex`}>
                <div className={`flex-grow`}/>
                <div className={`flex flex-col`}>
                    <button onClick={props.onClose}><LucideX/></button>
                    <div className={`flex-grow`}/>
                </div>
            </div>
        </div>
        <div className={`fixed w-full h-full bg-black opacity-50 z-10 left-0 top-0`}/>
    </div>)
}
