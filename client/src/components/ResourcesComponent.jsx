import React from 'react';
import '../components/ResourcesComponent.css';
import '../App.css';

const ResourcesComponent = () => {
    return (
        <section id="resources" className="resource-section-container">
            <div className="resource-table-container">
                <h3>Resources</h3>
                <table className="resource-styled-table">
                    <thead>
                        <th>Reporting</th>
                        <th>Law Enforcement</th>
                        <th>Victim Assistance</th>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <ul>
                                    <li><a href="https://www.calgary.ca/cps/report-a-crime.html" target="_blank"  >Calgary Police Services</a></li>
                                    <li><a href="https://www.p3tips.com/tipform.aspx?ID=183#" target="_blank"  >Calgary Crime Stoppers</a></li>
                                    <li><a href="https://www.calgary.ca/cps/report-a-crime.html" target="_blank"  >Other Crimes</a></li>
                                </ul>
                            </td>
                            <td>
                                <ul>
                                    <li>Emergency Service: 911 </li>
                                    <li>Non-Emergency Service:
                                                403-266-1234
                                    </li>
                                       <li><a href="https://www.calgary.ca/cps/calgary-police-service-district-offices.html" target="_blank"  >District Offices</a>
                                    </li>
                                    <li><a href="https://www.calgary.ca/cps/public-services/police-information-checks.html" target="_blank"  >Police Information Checks</a></li>
                                </ul>
                            </td>
                            <td>
                                <ul>
                                    <li><a href="https://www.calgary.ca/cps/community-programs-and-resources/victims-of-crime/victim-assistance-support-team.html" target="_blank"  >VAST (Victim Assistance Support Team)</a></li>
                                    <li>The Distress Centre 24-hour crisis line: 403-266-HELP </li>
                                    <li><a href="https://calgarycounselling.com/" target="_blank"  >Calgary Counselling Centre PH. 833-827-4229 (business hours)</a></li>
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