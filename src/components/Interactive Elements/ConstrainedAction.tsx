/** ConstrainedAdd
 *  Executes some custom action on click, but up to a certain limit based on custom logic
 */
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import {useState} from "react";
import {LucidePlusCircle} from "lucide-react";

interface ConstrainedProps {
    action: constrainedAction,

    onClick: () => void, // Method to call when user clicks button
    onConstrained: () => void, // Any logic that should execute when constrained
    //onUnconstrained?: () => void, // add if needed

    isConstrained: () => boolean, // Conditions which determine if the component is constrained

    onAddWhileConstrained: () => DialogueOptions, // Method to return what prompt we should provide to user if they attempt to add while constrained
    onDoAnyway: () => void, // actions to execute if the user chooses to add while constrained. Is mandatory to force 'no action' scenarios to be purposeful
    onCancel?: () => void, // actions to execute if the user chooses to cancel adding when constrained


    canAddWhileConstrained: boolean,
    dialogTitle?: string,
    className?: string,
    size?: number,
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

    // Observer pattern for add logic
    const handleOnClick = () => {
        if (props.isConstrained()){
            const data = props.onAddWhileConstrained();
            showDialogue(data.message, data.accept ?? 'Confirm', data.decline ?? 'Cancel');
        } else {
            props.onClick();
            if(props.isConstrained()) props.onConstrained(); // if we are now constrained after adding from unconstrained, call the onConstrained() method.
        }
    }

    const showDialogue = (message: string, accept: string, decline: string) => {
        setMessage(message);
        setAcceptText(accept);
        setDeclineText(decline);
        setDialogOpen(true);
    }

    const onCancel = () => {
        if(props.onCancel) props.onCancel();
        setDialogOpen(false);
    };

    const onDoAnyway = () => {
        props.onDoAnyway();
        setDialogOpen(false);
    }

    return <div className={`${props.className}`}>
        <button onClick={handleOnClick}>
            {props.action == 'add' && <LucidePlusCircle color={props.isConstrained() ? 'red' : 'green'} size={props.size ?? 48}/>}
        </button>
        <Dialog open={dialogOpen} aria-labelledby={`dialog-title-${dialogTitle}`} onClose={onCancel}>
            <DialogTitle id={`dialog-title-${dialogTitle}`}>
                {dialogTitle}
            </DialogTitle>
            <DialogContent>{message}</DialogContent>
            <DialogActions>
                <Button onClick={onCancel}>{declineText}</Button>
                <Button onClick={onDoAnyway}>{acceptText}</Button>
            </DialogActions>
        </Dialog>
    </div>
}
