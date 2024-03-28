/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'
import Table from 'react-bootstrap/Table';

function Note({note, onDelete} ) {
    const formattedDate = new Date(note.created_at).toLocaleDateString('en-US')
  return <div >
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Title</th>
          <th>Content</th>
          <th>Created Date</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{note.title}</td>
          <td>{note.content}</td>
          <td>{formattedDate}</td>
          <td>
        <button  className='btn btn-danger btn-sm' onClick={() => onDelete(note.id)}>Delete</button>
          </td>
        </tr>
        
      </tbody>
    </Table>

    </div>
  
}

export default Note;