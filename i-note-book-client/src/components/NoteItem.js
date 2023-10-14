import React, { useContext } from 'react'
import NotesContext from '../contexts/NotesContext';

function NoteItem(props) {
    const item = props.NoteDetail
    const updateNote = props.updateNote
    const p = useContext(NotesContext);
    function handleClick(event) {
        event.preventDefault();
        let note_id = event.target.getAttribute("value")
        p.deleteNote(note_id);
    }
    return (
        <div className="col md-3">
            <div className="card my-3 text-center" style={{ "width": "18rem" }}>
                <div className="card-body">
                    <h4 className="card-title">{item.name}</h4>
                    <p className="card-text">{item.email}</p>
                    <p className="card-text">Idea marks : {item.Ideation ? item.Ideation : "Not assigned"}</p>
                    <p className="card-text">Viva marks : {item.Viva ? item.Viva : "Not assigned"}</p>
                    <p className="card-text">Execution marks: {item.Execution ? item.Execution : "Not assigned"}</p>

                    {!p.lock && <i className="fa-sharp fa-solid fa-trash mx-3" value={item._id} disabled={!p.lock} onClick={handleClick}></i>}
                    <br />
                    {!p.lock && < i className="fa-sharp fa-solid fa-pen-to-square" onClick={() => { console.log(item); updateNote(item) }} disabled={!p.lock}>Add marks and update detail</i>}
                </div>
            </div>
        </div >
    )
}

export default NoteItem
