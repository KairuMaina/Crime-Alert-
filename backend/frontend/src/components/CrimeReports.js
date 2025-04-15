import React, { useState } from 'react';
import { crimeReportService } from '../services/crimeReportService';

function CrimeReportForm() {
    const [description, setDescription] = useState('');
    const [severityLevel, setSeverityLevel] = useState('');
    const [location, setLocation] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await crimeReportService.submitReport({ description, severityLevel, location });
            alert('Crime report submitted!');
        } catch (err) {
            setError('Error submitting report');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Description:</label>
                <input 
                    type="text" 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)} 
                />
            </div>
            <div>
                <label>Severity Level:</label>
                <select 
                    value={severityLevel}
                    onChange={(e) => setSeverityLevel(e.target.value)}
                >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
            </div>
            <div>
                <label>Location:</label>
                <input 
                    type="text" 
                    value={location} 
                    onChange={(e) => setLocation(e.target.value)} 
                />
            </div>
            <button type="submit">Submit Report</button>
            {error && <p>{error}</p>}
        </form>
    );
}

export default CrimeReportForm;
