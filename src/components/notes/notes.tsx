import { useCallback, useEffect, useRef, useState } from "react";
import { INotes } from "../../models/INotes.model"
import "./notes.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faSave, faTrash } from "@fortawesome/free-solid-svg-icons";

interface INotesProps {
    Note: INotes;
    handleDelete: (noteValue: INotes) => void;
}

const Notes = (props: INotesProps) => {

    const [editModeHeader, setEditModeHeader] = useState<boolean>(false);
    const [editModeContent, setEditModeContent] = useState<boolean>(false);
    const [editHeaderValue, setEditHeaderValue] = useState<string | undefined>(props.Note.header)
    const [editContentValue, setEditContentValue] = useState<string | undefined>(props.Note.content)
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLInputElement>(null);
    const contentRef = useRef<HTMLTextAreaElement>(null);

    let isDragging = false;
    let initialX = 0;
    let initialY = 0;
    let offsetX = 0;
    let offsetY = 0;

    const onMouseDown = useCallback((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        initialX = event.clientX - offsetX;
        initialY = event.clientY - offsetY;
        isDragging = true;
    }, []);

    const onMouseMove = useCallback((event: MouseEvent) => {
        if (isDragging) {
            offsetX = event.clientX - initialX;
            offsetY = event.clientY - initialY;
            if (containerRef.current) {
                containerRef.current.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
            }
        }
    }, []);

    const onMouseUp = useCallback(() => {
        isDragging = false;
    }, []);

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.addEventListener('mousedown', onMouseDown as any);
            window.addEventListener('mousemove', onMouseMove);
            window.addEventListener('mouseup', onMouseUp);
        }

        return () => {
            if (containerRef.current) {
                containerRef.current.removeEventListener('mousedown', onMouseDown as any);
            }
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
        };
    }, [onMouseDown, onMouseMove, onMouseUp]);

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
        if (editModeContent && editModeHeader) {
            props.Note.header = editHeaderValue;
            props.Note.content = editContentValue;
            setEditModeContent(false);
            setEditModeHeader(false);
            return;
        }
        else if (editModeHeader) {
            props.Note.header = editHeaderValue;
            setEditModeHeader(false)
            return
        } else if (editModeContent) {
            props.Note.content = editContentValue;
            setEditModeContent(false)
            return
        }
    }

    useEffect(() => {
        if (editModeHeader && !editModeContent) {
            titleRef.current?.focus();
        } else if (!editModeHeader && editModeContent) {
            contentRef.current?.focus();
        }
    }, [editModeHeader, editModeContent])

    return (
        <div className={`postit ${getPostItStyle()}`} ref={containerRef} style={{ top: props.Note?.y, left: props.Note?.x }}>
            <div className="postit-header">
                {editModeHeader ?
                    <input ref={titleRef} className="postit-header_input" type="text" onChange={(e) => setEditHeaderValue(e.target.value)} value={editHeaderValue} />
                    :
                    <h4 className="postit-header_text" onClick={() => setEditModeHeader(true)}> {props.Note?.header} </h4>
                }
                <div className="postit-icon-container">
                    <FontAwesomeIcon icon={faTrash} onClick={() => props.handleDelete(props.Note)} style={{ margin: '0 0.5em 0 1em' }} />
                </div>
            </div>

            <div className="postit-content">
                {editModeContent ?
                    <textarea ref={contentRef} className="postit-content_input" onChange={(e) => setEditContentValue(e.target.value)} value={editContentValue} />
                    :
                    <p className='postit-content_text' onClick={() => setEditModeContent(true)}> {props.Note?.content} </p>
                }
            </div>

            {(editModeContent || editModeHeader) &&
                <div className="savebutton-container">
                    <button className="savebutton" title="saveButton" type="button" name="saveButton" onClick={() => handleEditMode()}>
                        <span className="savebutton-text">
                            Save
                        </span>
                    </button>
                </div>
            }
        </div>
    )
}


export default Notes;