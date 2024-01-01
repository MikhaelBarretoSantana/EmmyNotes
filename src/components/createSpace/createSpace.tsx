import { INotes } from "../../models/INotes.model";
import Notes from "../notes/notes";
import "./createSpace.css"

interface CreateSpaceProps {
    notes: Array<INotes> | null;
    setNotes: (value: Array<INotes> | null) => void;
}
const CreateSpace = (props: CreateSpaceProps) => {

    const handleRemove = (noteValue: INotes) => {
        const newNotes = props.notes?.filter((value) => value !== noteValue) || null;
        props.setNotes(newNotes);
    }

    return (
        <div className="createspace-container">
            {
                props?.notes ? props?.notes.map((values, index) => (
                    <div key={index}>
                        <Notes key={index} Note={values} handleDelete={handleRemove} />
                    </div>
                )) :
                    ''
            }
        </div>
    )
}


export default CreateSpace;