/** ConstrainedAdd
 *  Executes some custom action on click, but up to a certain limit based on custom logic
 */
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import {useState} from "react";
import {LucidePlusCircle} from "lucide-react";
import {SubjectData} from "@/components/Planner Items/SubjectSlot";

interface ConstrainedProps {
    action: constrainedAction,

    onClick: (actions?: DialogueActions) => void, // Method to call when user clicks button
    onConstrained: () => void, // Any logic that should execute when constrained
    //onUnconstrained?: () => void, // add if needed

    isConstrained: (bool?: boolean) => {constrained: boolean, reasons?: string[]}, // Conditions which determine if the component is constrained

    onAddWhileConstrained: (subject?: SubjectData, bool?: boolean) => DialogueOptions, // Method to return what prompt we should provide to user if they attempt to add while constrained
    onDoAnyway: (subject?: SubjectData) => void, // actions to execute if the user chooses to add while constrained. Is mandatory to force 'no action' scenarios to be purposeful
    onCancel?: () => void, // actions to execute if the user chooses to cancel adding when constrained


    canAddWhileConstrained: boolean,
    dialogTitle?: string,
    className?: string,
    size?: number,
}

export interface DialogueActions {
    openDialogue: (subject?: SubjectData) => void,
}

export type DialogueOptions = {
    message: string,
    accept?: string,
    decline?: string,
}

export type constrainedAction = 'add' | 'remove'


export const ConstrainedAction = (props: ConstrainedProps) => {
    const dialogTitle = props.dialogTitle ?? 'You are attempting an action which may not be allowed!';
    const [dialogOpen, setDialogOpen] = useState(false);
    const [message, setMessage] = useState('If you can see this, something went wrong! Please contact the developer and tell them the steps you took before this error!');
    const [acceptText, setAcceptText] = useState('Confirm');
    const [declineText, setDeclineText] = useState('Cancel')
    const [limboSubject, setLimboSubject] = useState<SubjectData>();



    // Observer pattern for add logic
    const handleOnClick = () => {
        console.log('onclick!')
        if (props.isConstrained().constrained){
            const data = props.onAddWhileConstrained(undefined, true);
            showDialogue(data.message, data.accept ?? 'Confirm', data.decline ?? 'Cancel');
        } else {
            props.onClick(myDialogueActions);
        }
    }

    const showDialogue = (message: string, accept: string, decline: string) => {
        setMessage(message);
        setAcceptText(accept);
        setDeclineText(decline);
        setDialogOpen(true);
    }

    const onCancel = () => {
        if(props.onCancel && props.isConstrained().constrained) props.onCancel();
        setDialogOpen(false);
    };

    const onDoAnyway = () => {
        if (limboSubject){
            props.onDoAnyway(limboSubject);
            setLimboSubject(undefined);
        } else {
            props.onDoAnyway();
        }
        setDialogOpen(false);
    }

    const openDialogue = (subject?: SubjectData) => {
        console.log('opening dialogue')
        setLimboSubject(subject);
        const data = props.onAddWhileConstrained(subject);
        showDialogue(data.message, data.accept ?? 'Confirm', data.decline ?? 'Cancel');
    }

    const myDialogueActions: DialogueActions = {
        openDialogue: openDialogue,
    }

    return <div className={`${props.className}`}>
        <button onClick={handleOnClick}>
            {props.action == 'add' && <LucidePlusCircle color={props.isConstrained().constrained ? 'red' : 'green'} size={props.size ?? 48}/>}
        </button>
        <Dialog open={dialogOpen} aria-labelledby={`dialog-title-${dialogTitle}`} onClose={onCancel}>
            <DialogTitle id={`dialog-title-${dialogTitle}`}>
                {dialogTitle}
            </DialogTitle>
            <DialogContent className={'whitespace-pre-wrap'}>{message}</DialogContent>
            <DialogActions>
                <Button onClick={onCancel}>{declineText}</Button>
                <Button onClick={onDoAnyway}>{acceptText}</Button>
            </DialogActions>
        </Dialog>
    </div>
}
