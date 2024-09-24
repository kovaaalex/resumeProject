import react from 'react'
const AddNewDeveloper = ({ newDeveloper, handleChange}) => {
    return (
        <>
        <input 
          type="text" 
          name="first_name" 
          placeholder="First Name" 
          value={newDeveloper.first_name} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="text" 
          name="last_name" 
          placeholder="Last Name" 
          value={newDeveloper.last_name} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="email" 
          name="email" 
          placeholder="Email" 
          value={newDeveloper.email} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="text" 
          name="phone" 
          placeholder="Phone" 
          value={newDeveloper.phone} 
          onChange={handleChange} 
        />
        <input 
          type="text" 
          name="position" 
          placeholder="Position" 
          value={newDeveloper.position} 
          onChange={handleChange} 
        />
        <input 
          type="text" 
          name="location" 
          placeholder="Location" 
          value={newDeveloper.location} 
          onChange={handleChange} 
        />
    </>
    )
}
export default AddNewDeveloper