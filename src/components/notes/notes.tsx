import { useEffect, useRef, useState } from "react";
import { INotes } from "../../models/INotes.model"
import "./notes.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faSave, faTrash } from "@fortawesome/free-solid-svg-icons";

interface INotesProps {
    Note: INotes;
    handleDelete: (noteValue: INotes) => void;
}

const Notes = (props: INotesProps) => {

    const [editMode, setEditMode] = useState<boolean>(false);
    const [editHeaderValue, setEditHeaderValue] = useState<string | undefined>(props.Note.header)
    const [editContentValue, setEditContentValue] = useState<string | undefined>(props.Note.content)

    const containerRef = useRef<HTMLDivElement>(null);
    const notesRef = useRef<HTMLDivElement>(null);

    const getPostItStyle = () => {
        if (props.Note.type === 1) {
            return 'yellow'
        } else if (props.Note.type === 2) {
            return 'orange'
        } else if (props.Note.type === 3) {
            return 'red'
        } else if (props.Note.type === 4) {
            return 'pink'
        } else if (props.Note.type === 5) {
            return 'purple'
        } else if (props.Note.type === 6) {
            return 'darkBlue'
        } else if (props.Note.type === 7) {
            return 'blue'
        } else if (props.Note.type === 8) {
            return 'lightBlue'
        } else if (props.Note.type === 9) {
            return 'lightGreen'
        } else if (props.Note.type === 10) {
            return 'green'
        }
    }

    const handleEditMode = () => {
        if (editMode) {
            props.Note.header = editHeaderValue;
            props.Note.content = editContentValue;
            setEditMode(false)
            return
        }
        setEditMode(true)
    }

    return (
        <div className={`postIt ${getPostItStyle()}`} ref={notesRef} style={{ top: props.Note?.y, left: props.Note?.x }}>
            <div style={{ display: 'flex' }}>
                {editMode ?
                    <input type="text" onChange={(e) => setEditHeaderValue(e.target.value)} value={editHeaderValue} />
                    :
                    <h4 style={{fontSize: '1.8em', margin: '0 0 0 0.2em'}}> {props.Note?.header} </h4>
                }
                <div style={{ margin: '0.2em 0 0 auto' }}>
                    <FontAwesomeIcon icon={!editMode ? faPencil : faSave} onClick={() => handleEditMode()} />
                    <FontAwesomeIcon icon={faTrash} onClick={() => props.handleDelete(props.Note)} style={{margin: '0 0.5em 0 1em'}} />
                </div>
            </div>

            {editMode ?
                <input type="text" onChange={(e) => setEditContentValue(e.target.value)} value={editContentValue} />
                :
                <p style={{padding: '0.2em 0.8em'}}> {props.Note?.content} </p>
            }
        </div>
    )
}


export default Notes;