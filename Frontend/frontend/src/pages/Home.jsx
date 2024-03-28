import { useState, useEffect} from "react"
import api from "../api"
import Note from "../components/Note";
import NavbarBostrap from "../components/NavbarBostrap";
import Form from 'react-bootstrap/Form';

function Home() {
  const [notes, setNotes] = useState([]);
  const [content, setContent] =useState("");
  const [title, setTitle]= useState("");


  useEffect(() => {
    getNotes();
  }, [])
  const getNotes = () => {
    api
      .get("/api/notes/")
      .then((res) => res.data)
      .then((data) => { setNotes(data); console.log(data);})
      .catch((err) => alert(err));
};
  const deleteNote = (id) => {
    api
     .delete(`/api/notes/delete/${id}`)
     .then((res) => {
      if (res.statusCode === 204) 
      alert("Note deleted successfully")
        
      else alert("Error deleting")
      getNotes();
     }).catch((error) => alert(error))
    };
    const createNote = (e) =>{
      e.preventDefault()
      api.post("/api/notes/", {content, title}).then((res) =>{
        if(res.statusCode === 201) alert("Note created successfully")
        else alert("Error creating")
          getNotes()
       })
       .catch((err) =>alert(err))
    };
  return <div>
    <NavbarBostrap />
    <div className="container mt-5">
    <div className="row d-flex flex-row-reverse  align-items-center">
      <div className="col-md-5">
      <div>
    <h2>Notes</h2>
    {notes.map((note) => (
    <Note note={note} onDelete={deleteNote} key={note.id} />
    ))}
</div>
      </div>
      <div className="col-md-6">
      <div>
  <h2>Create a Note</h2>
  <form onSubmit={createNote}>
  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Title</Form.Label>
        <Form.Control
        type="text"
        className="form-input"
        value={title}
        required
        onChange={(e) => setTitle(e.target.value)}
      />
     </Form.Group>
    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Content</Form.Label>
        <Form.Control
        className="form-input"
        value={content}
        required
        onChange={(e) => setContent(e.target.value)}
      />
     </Form.Group>
    <button type="submit" className="btn btn-primary">
      Create Note
    </button>
  </form>

</div>
    </div>

</div>
    </div>
  
  </div>
  }

export default Home