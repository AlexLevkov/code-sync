import React, { useState } from 'react';

const AddLessonForm = ({httpLink}) => {


    const [formData, setFormData] = useState({
        title: "",
        content: ""
    });

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    }

    const handleSubmit = (event) => {
      event.preventDefault();
      
      fetch(httpLink, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: { 'Content-Type': 'application/json' }
      })
        .then(res => res.json())
        .then(data => {
          console.log('Success:', data);
          window.history.pushState(null, null, '/');
          window.location.reload();
          window.location.reload();
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }

    return (
    <div className='add-lesson-cmp animate__animated animate__pulse animate__fadeIn'>
     <form onSubmit={handleSubmit}>
        <h3>Add a new lesson</h3>
        <label>
          <h5>Title:</h5>
          <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        </label>
        <br />
        <label>
        <h5>Content:</h5>
          <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          required
          />
        </label>
        <br />
        <label>
        <h5>Solution:</h5>
          <textarea
          name="solution"
          value={formData.solution}
          onChange={handleChange}
          required
          />
        </label>
        <br />
         <button type="submit"><h5>Submit</h5></button>
     </form>
    </div>

    );
}

export default AddLessonForm;