import React, { useContext, useState } from 'react'
import NotesContext from '../contexts/NotesContext';
function Addnotes() {
    const [note, setNote] = useState({ title: "", tag: "", description: "" });
    function onChange(event) {
        // This ...note will keep previous value as it is if we enter new item or update current item if we change same item
        setNote({ ...note, [event.target.name]: event.target.value });
    }
    const a = useContext(NotesContext);
    async function handleClick(event) {
        event.preventDefault();
        await a.addNote(note);
    }
    async function handleLock(event) {
        event.preventDefault();
        await a.handleLock();
    }

    return (
        <div>
            <button type="submit" className="btn btn-primary" onClick={handleLock}>Lock</button>
            {/* {console.log(!a.lock)} */}
            {!a.lock && <div className="container text-">
                <h1 className='my-3'>Add a Student</h1>
                <form>
                    <div className="mb-3">
                        <label htmlFor="Title" className="form-label">Name of Student :</label>
                        <input type="text" className="form-control" id="title" placeholder="Add name of student" name='name' aria-describedby="emailHelp" style={{ "width": "18rem" }} onChange={onChange} required="required" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Tag" className="form-label">Email :</label>
                        <input type="text" className="form-control align-item-center" placeholder="Add student email" id="tag" name='email' style={{ "width": "18rem" }} onChange={onChange} required="required" />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
                </form>
            </div>}
        </div>
    )
}

export default Addnotes
