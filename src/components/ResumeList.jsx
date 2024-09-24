import React from 'react';

const ResumeList = ({ developers }) => {
  return (
    <div>
      <h1>Resume List</h1>
      {developers.length > 0 ? (
        <ul>
          {developers.map(dev => (
    <li key={dev.id}>
        {dev.first_name} {dev.last_name} - {dev.email}
        <br />
        Skills: {dev.skills || 'No skills listed'}
    </li>
))}

        </ul>
      ) : (
        <p>No resumes available.</p>
      )}
    </div>
  );
};

export default ResumeList;

