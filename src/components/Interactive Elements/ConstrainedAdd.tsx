/** ConstrainedAdd
 *  Executes some custom action on click, but up to a certain limit based on custom logic
 */
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import {useState} from "react";

interface ConstrainedMethods {
    onClick: () => void, // Method to call when user clicks button
    onConstrained: () => void, // Any logic that should execute when constrained
    //onUnconstrained?: () => void, // add if needed

    isConstrained: () => boolean, // Conditions which determine if the component is constrained

    onAddWhileConstrained: () => DialogueOptions, // Method to return what prompt we should provide to user if they attempt to add while constrained
    onDoAnyway: () => void, // actions to execute if the user chooses to add while constrained. Is mandatory to force 'no action' scenarios to be purposeful
    onCancel?: () => void, // actions to execute if the user chooses to cancel adding when constrained
}

export type DialogueOptions = {
    message: string,
    accept?: string,
    decline?: string
}

interface ConstrainedProperties {
    canAddWhileConstrained: boolean
}

export const ConstrainedAdd = (methods: ConstrainedMethods, props: ConstrainedProperties) => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const dialogTitle = 'You are trying to do an action which may not always be allowed!';
    const [message, setMessage] = useState('If you can see this, something went wrong! Please contact the developer and tell them the steps you took before this error!');
    const [acceptText, setAcceptText] = useState('Confirm');
    const [declineText, setDeclineText] = useState('Cancel')

    // Observer pattern for add logic
    const handleOnClick = () => {
        if (methods.isConstrained()){
            const data = methods.onAddWhileConstrained();
            showDialogue(data.message, data.accept ?? 'Confirm', data.decline ?? 'Cancel');
        } else {
            methods.onClick();
            if(methods.isConstrained()) methods.onConstrained(); // if we are now constrained after adding from unconstrained, call the onConstrained() method.
        }
    }

    const showDialogue = (message: string, accept: string, decline: string) => {
        setDialogOpen(true);
    }

    const onCancel = () => {
        if(methods.onCancel) methods.onCancel();
        setDialogOpen(false);
    };

    return <>
        <button onClick={handleOnClick}>

        </button>
        <Dialog open={dialogOpen} aria-labelledby={`dialog-title-${dialogTitle}`} onClose={onCancel}>
            <DialogTitle id={`dialog-title-${dialogTitle}`}>${dialogTitle}</DialogTitle>
            <DialogContent>${message}</DialogContent>
            <DialogActions>
                <Button onClick={onCancel}>${declineText}</Button>
                <Button onClick={methods.onDoAnyway}>${acceptText}</Button>
            </DialogActions>
        </Dialog>
    </>
}