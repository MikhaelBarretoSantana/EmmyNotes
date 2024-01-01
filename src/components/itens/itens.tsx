import React, { useState, useEffect } from 'react';
import { faEraser, faNoteSticky, faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./itens.css";
import { INotes } from "../../models/INotes.model";
import { randomInt } from 'crypto';

interface ItensProps {
    notes: Array<INotes> | null;
    setNotes: (value: Array<INotes> | null) => void;
}

const Itens = (props: ItensProps) => {
    const [notesFuncionActivated, setNotesFunctionActivated] = useState<Boolean>(false);


    const handleClickNotes = (event: React.MouseEvent) => {
        event.stopPropagation();
        setNotesFunctionActivated(true);
    };

    const catchCoordenates = (event: MouseEvent) => {
        if (notesFuncionActivated) {
            createNotes(event.pageX, event.pageY);
            setNotesFunctionActivated(false);
        }
    };

    const createNotes = (x: number, y: number) => {
        const note: INotes = {
            header: 'Insira um título',
            content: 'Insira um conteúdo',
            x,
            y,
            type: Math.floor(Math.random() * 10) + 1,
        } 
        if (props.notes) {
            props.setNotes([...props.notes, note]);
        } else {
            props.setNotes([note]);
        }
    }


    useEffect(() => {
        if (notesFuncionActivated) {
            window.addEventListener('click', catchCoordenates);
        }

        return () => {
            window.removeEventListener('click', catchCoordenates);
        };
    }, [notesFuncionActivated]);


    return (
        <div className="itens-container">
            <ul className="icons-container">
                <li className="icon-container">
                    <FontAwesomeIcon icon={faPencil} className="icons-disabled" />
                </li>
                <li className="icon-container">
                    <FontAwesomeIcon icon={faNoteSticky} className="icons" onClick={handleClickNotes} />
                </li>
                <li className="icon-container">
                    <FontAwesomeIcon className="icons-disabled" icon={faEraser} />
                </li>
            </ul>
        </div>
    );
}

export default Itens;
