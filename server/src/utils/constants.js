export const crimeDataJsonURL = "https://data.calgary.ca/resource/78gh-n26t.json";
export const crimeDataCSVURL = "https://data.calgary.ca/resource/78gh-n26t.csv";
export const tmpFileFolder = '/tmpFiles/';
export const dataCategory = Object.freeze (
    {
        CRIMEDATA: 'crime',
        POPULATIONDATA: 'population',
        BOUNDARYDATA: 'boundary'
    }
);

export const boundaryDataJsonURL = "https://data.calgary.ca/resource/surr-xmvs.json";
export const boundaryDataCSVURL = "https://data.calgary.ca/resource/surr-xmvs.csv";
export const boundaryDataGeoURL = "https://data.calgary.ca/resource/surr-xmvs.geojson";

/* The task will run at 12:05 AM on the 28th of every month. */
export const crimeDataSchedule = '33 10 * * *'; 
export const boundaryDataSchedule = '32 10 * * *';