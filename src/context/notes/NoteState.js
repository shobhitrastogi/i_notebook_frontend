
import React, { useState } from 'react'
import NoteContext from './noteContext';
 const NoteState =(props)=>{
  // const host = "http://localhost:5000"
  const host = "https://inotebook-xaja.onrender.com"
     const noteInitial= [
     ]

      const [ notes,setNotes]  =useState(noteInitial)
 
     // Get a note
     const getNotes=async( )=>{
      // api call 
      const url =`${host}/api/notes/fetchallnotes `
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token")
        },
        
      });
      
      const json = await response.json()
      console.log(json)
      setNotes(json)

    }


      // Add a note
        const addNote=async(title,description,tag)=>{
          // api call 
          const url =`${host}/api/notes/addnote `
          const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem("token")
            },
            body: JSON.stringify({title,description,tag}),
          });
          const note = await response.json();
          setNotes(notes.concat(note))
        }
      // Delete a note
      const deleteNote=async(id)=>{
           // api call
           const url =`${host}/api/notes/deletenote/${id} `
           const response = await fetch(url, {
             method: "DELETE",
             headers: {
               "Content-Type": "application/json",
               "auth-token": localStorage.getItem("token")
             },
           });
           const json=await  response.json();
           console.log(json)
          console.log("deleting the note success"+ id)
          const newNotes =notes.filter((note)=>{return note._id !== id})
          setNotes(newNotes)
      }
      // Edit a note
      const editNote=async(id,title,description,tag)=>{
        // api call
        const url =`${host}/api/notes/updatenote/${id} `
        const response = await fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token")
          },
          body: JSON.stringify({title,description,tag }),
        });
        const json=await  response.json();
        console.log(json)
        let newNotes = JSON.parse(JSON.stringify(notes))
        // logic to edit in client
        for (let index = 0; index < notes.length; index++) {
          const element = notes[index];
          if(element._id ===id){
            newNotes[index].description =description;
            newNotes[index].tag =tag;
            newNotes[index].title =title; 
            break;
          }
        }
        console.log(newNotes)
          setNotes(newNotes)
      }
   
    return (
        <NoteContext.Provider value = {{notes,addNote,deleteNote,editNote,getNotes}}>
         {props.children}
        </NoteContext.Provider>
    )

 }

 export default NoteState