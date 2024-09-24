import React from 'react';
import { useState } from 'react';
import AddNewDeveloper from './AddNewDeveloper';
import DeveloperList from './DeveloperList';
const AddNewResume = ({ newDeveloper, handleChange, developers}) => {
  const [viewMode, setViewMode] = useState('newDeveloper')
    return (
      <>
        <div>
            {/* Кнопки для переключения нового или существующего разработчика */}
            <button onClick={() => setViewMode('newDeveloper')}>Добавить нового разработчика</button>
            <button onClick={() => setViewMode('existingDeveloper')}>Существующий разработчик</button>
        </div>
        {viewMode === 'newDeveloper' && <AddNewDeveloper newDeveloper={newDeveloper} handleChange={handleChange} />}
        {viewMode === 'existingDeveloper' && <DeveloperList developers={developers} />}
      </>
    )
}
export default AddNewResume;