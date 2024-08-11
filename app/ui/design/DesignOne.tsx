'use client'

import Button from "@/app/ui/button/Button";
import styles from "@/app/ui/design/DesignOne.module.css";
import NoteCard from "@/app/ui/noteCard/NoteCard";
import Break from "@/app/ui/break/Break";
import { Note } from "@/app/typescript/Interfaces";
import NewNoteFormModal from "@/app/modals/NewNoteFormModal/NewNoteFormModal";

const note: Note = {
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "patientId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "author": "Author 1",
  "createdAt": "2022-03-30T12:00:00Z",
  "updatedAt": "2022-03-30T12:00:00Z",
  "type": "standard",
  "content": [
    "This is some example note content text. Lorem Ipsum Epsilon Jabroni1"
  ]
}

const DesignOne = () => {
  return (
    <div>
      <h1>Design One</h1>
      <div>Buttons: </div>
      <div className="container">
        <Button mode="primary">Primary Button</Button>
        <Break />
        <Button mode="secondary">Secondary Button</Button>
        <Break />
        <Button mode="light">Light Button</Button>
        <Break />
        <Button mode="highlight">Highlight Button</Button>
        <Break size="three"/>
        <Button mode="warning">Warning Button</Button>
      </div>
      <div>Card: </div>
      <div className="container">
        <NoteCard note={note}/>
      </div>
      <div className="container">
        <div className="header1">lemr Text header1</div>
        <div className="header2">lemr Text header2</div>
        <div className="header3">lemr Text header3</div>
        <div className="italicText">lemr Text italic</div>
        <div className="buttonText">lemr Text Button Text</div>
        <div className="standardText">lemr Text Standard Text</div>
      </div>
      <NewNoteFormModal isOpen={true} onClose={() => {}} onCreate={() => {}} />
    </div>
  )
}

export default DesignOne;
