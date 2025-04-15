import React, { useState, useEffect } from 'react';
import { crimeReportService } from '../services/crimeReportService';

function CrimeList() {
    const [reports, setReports] = useState([]);

    useEffect(() => {
        async function fetchReports() {
            const fetchedReports = await crimeReportService.getReports();
            setReports(fetchedReports);
        }
        fetchReports();
    }, []);

    return (
        <div>
            <h2>Crime Reports</h2>
            <ul>
                {reports.map((report) => (
                    <li key={report.id}>
                        <strong>{report.description}</strong><br />
                        Severity: {report.severity_level}<br />
                        Location: {report.location_name}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CrimeList;
