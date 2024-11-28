import React from 'react';
import '../components/ResourcesComponent.css';
import '../App.css';

const ResourcesComponent = () => {
    return (
        <section id="resources" className="section-container">
            <div className="table-container">
                <h3>Resources</h3>
                <table className="styled-table">
                    <thead>
                        <th>Reporting</th>
                        <th>Law Enforcement</th>
                        <th>Victim Assistance</th>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <ul>
                                    <li>Calgary Police Services</li>
                                    <li>Calgary Crime Stoppers</li>
                                    <li>Other Crimes</li>
                                </ul>
                            </td>
                            <td>
                                <ul>
                                    <li>Calgary Police Services</li>
                                    <li>Police Information Checks</li>
                                </ul>
                            </td>
                            <td>
                                <ul>
                                    <li>VAST (Victim Assistance Support Team)</li>
                                    <li>The Distress Centre</li>
                                    <li>Calgary Counselling Centre</li>
                                </ul>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    );
}

export default ResourcesComponent;