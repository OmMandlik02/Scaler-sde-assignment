import React, { useEffect, useState } from 'react'
import NotesContext from './NotesContext'
const NotesState = (props) => {
    const [note, setNote] = useState([]);
    const [alert, setAlert] = useState("");
    const [lock, setLock] = useState(false);
    const createNote = async (data) => {
        console.log(data)
        const url = `http://localhost:8000/user/addStudent/?mentor_id=652980e92b46af73fdec205e`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
        const updatedNote = await response.json();
        return updatedNote;
    }
    const fetchNote = async () => {
        const url = "http://localhost:8000/user/fetchStudents/?mentor_id=652980e92b46af73fdec205e";
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",

            }
        })
        const fetchedData = await response.json();
        console.log(fetchedData)
        let booll = true;
        fetchedData.data.map(Element => {
            booll = booll && Element.editable
        })
        console.log(booll)
        setLock(!booll)
        // console.log(fetchedData)
        setNote(fetchedData.data);
    }
    const delNote = async (noteId) => {
        const url = `http://localhost:8000/user/deleteStudent?id=${noteId}`;
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
            }
        })
        const fetchedDataOfDel = await response.json();

        return fetchedDataOfDel
    }
    useEffect(() => {
        fetchNote();
    }, [])

    // To add the note
    async function addNote(newNote) {
        const addedNote = await createNote(newNote);

        if (addedNote.data) {
            setNote(note.concat(addedNote.data));
            setAlert("")
        } else if (addedNote.errors) {
            setAlert(addedNote.errors.errors[0].msg);
        }
    }
    async function handleLock() {
        const url = `http://localhost:8000/user/lockData/?mentor_id=652980e92b46af73fdec205e`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            }
        })
        const fetchedData = await response.json();
        console.log(fetchedData)
        if (fetchedData.locked) {

            setLock(true);
        }
    }
    // To delete the note
    async function deleteNote(id) {
        const deletedNote = await delNote(id)
        const newNotes = note.filter(function (obj) {
            return obj._id !== id;
        });
        setNote(newNotes);
        console.log(deletedNote)
        setAlert(deletedNote.message)
    }
    // To update existing node
    async function updateNote(data) {
        const url = `http://localhost:8000/user/editMarks/?id=${data.id}`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
        fetchNote();
    }
    return (
        <NotesContext.Provider value={{ note, addNote, deleteNote, updateNote, alert, handleLock, lock }}>
            {props.children}
        </NotesContext.Provider>
    )
}
export default NotesState;
