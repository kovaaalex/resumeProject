import React from "react";
const DeveloperList = ({developers}) => {
    return (
        <div>
            <h2>Existing developers</h2>
            {developers.length > 0 ? (
                developers.map(developer => (
                    <li key={developer.id}>
                        {developer.first_name} {developer.last_name} - {developer.email}
                    </li>
                ))
            ) : (
                <p>No developers available</p>
            )}
        </div>
    )
}
export default DeveloperList