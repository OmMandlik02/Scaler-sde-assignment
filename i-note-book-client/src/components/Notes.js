import React, { useState, useRef } from 'react'
import NotesContext from '../contexts/NotesContext'
import { useContext } from 'react'
import NoteItem from './NoteItem'
import Addnotes from './Addnotes'
import Alert from './Alert'
export default function Notes() {
    const notes = useContext(NotesContext)
    const students = notes.note
    const [detail, setDetail] = useState({ id: "" });

    const updateNotes = async (not) => {
        console.log(not)
        setDetail({ ...detail, id: not._id });
        ref.current.click();


    }
    function onChange(event) {
        // This ...note will keep previous value as it is if we enter new item or update current item if we change same item
        setDetail({ ...detail, [event.target.name]: event.target.value });
    }
    async function handleClick(event) {
        event.preventDefault();
        console.log(detail)
        await notes.updateNote(detail);
    }
    const ref = useRef(null);
    return (
        <>


            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">

            </button>


            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Upadating student details & Marks Form </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="container text-">
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
                                    <div className="mb-3">
                                        <label htmlFor="Tag" className="form-label">Ideaation marks :</label>
                                        <input type="number" className="form-control align-item-center" placeholder="Add Ideation Marks out of 10" id="tag" name='Ideation' style={{ "width": "18rem" }} onChange={onChange} required="required" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="Tag" className="form-label">Execution marks :</label>
                                        <input type="number" className="form-control align-item-center" placeholder="Add Execution Marks  out of 10" id="tag" name='Execution' style={{ "width": "18rem" }} onChange={onChange} required="required" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="Tag" className="form-label">Viva marks :</label>
                                        <input type="number" className="form-control align-item-center" placeholder="Add Viva Marks  out of 10" id="tag" name='Viva' style={{ "width": "18rem" }} onChange={onChange} required="required" />
                                    </div>
                                    <button type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
                                </form>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            {console.log(students)}
            {notes.alert && <Alert message={notes.alert} />}
            <Addnotes />
            <div>
                <div className="row my-3">
                    <h2>Your Students</h2>
                    {students && students.map((element) => {
                        return (
                            // Here we do (element && ) because if element is undefined then app crashes as element._id is in accesible
                            element && <NoteItem key={element._id} updateNote={updateNotes} NoteDetail={element} />
                        )
                    })}
                </div>
            </div>
        </>
    )
}
