import React, { useEffect, useRef, useState } from "react";
import Dashboard from "./Dashboard";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { getCrimeRateColor } from "../utils/utils";
import MapRightComponent from "./MapRightComponent";
import { mapColorObjYearly } from "../utils/constants.js";
import {
  generateDynamicColorObj,
  calculateYearsFrom2018,
  getUniqueID,
} from "../utils/utils";
import './MapComponent.css';

const handleMapColorUpdate = async (selectedYear, setMapColorObj) => {
  if (selectedYear && selectedYear !== "All") {
    // If a specific year is selected
    setMapColorObj(mapColorObjYearly); // Assuming mapColorObjYearly is already defined elsewhere
  } else {
    // Otherwise, dynamically generate based on years
    const years = calculateYearsFrom2018();
    const dynamicColorObj = await generateDynamicColorObj(years); // Await the function if it is asynchronous
    setMapColorObj(dynamicColorObj);
  }
};

const MapComponent = () => {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState(null);
  const dashboardRef = useRef(null);
  const dashboardSectionRef = useRef(null);
  const [shouldScroll, setShouldScroll] = useState(false);
  const [isObservered, setIsObserver] = useState(false);
  const [selectedYear, setSelectedYear] = useState(null);
  const [mapColorObj, setMapColorObj] = useState(null);
  const [showDashboard, setShowDashboard] = useState(true);

  const handleYearChange = (year) => {
    setSelectedYear(year);
    setShowDashboard(false); // Hide Dashboard on year change
    setIsObserver(false);
  };
  
  useEffect(() => {
    if (shouldScroll && dashboardSectionRef.current) {
      // Create a MutationObserver to watch changes in the DOM
      if (isObservered) {
        calculateScroll(dashboardSectionRef);
        setShouldScroll(false);
      } else {
        const observer = new MutationObserver(() => {
          if (dashboardSectionRef.current) {
            calculateScroll(dashboardSectionRef);
            setShouldScroll(false);
            setIsObserver(true);
          }
        });

        // Start observing the Dashboard section for changes (like rendering or height updates)
        observer.observe(dashboardSectionRef.current, {
          childList: true,
          subtree: true,
          attributes: true,
        });

        // Clean up observer on unmount
        return () => {
          if (observer) {
            observer.disconnect();
          }
        };
      }
    }
  }, [shouldScroll]);

  useEffect(() => {
    const updateMapColors = async () => {
      await handleMapColorUpdate(selectedYear, setMapColorObj);
    };
  
    updateMapColors();
  }, [selectedYear]);

  const calculateScroll = (dashboardSectionRef) => {
    const dashboardElement = dashboardSectionRef.current;
    const dashboardHeight = dashboardElement.offsetHeight;
    const viewportHeight = window.innerHeight;
    const scrollPosition =
      dashboardElement.getBoundingClientRect().top +
      window.scrollY -
      (viewportHeight - dashboardHeight);

    window.scrollTo({
      top: scrollPosition,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    setLoading(true);
    if (!mapColorObj || !mapContainer.current) {
      return;
    }

    mapRef.current = new maplibregl.Map({
      container: mapContainer.current,
      style: "https://tiles.openfreemap.org/styles/liberty", // OpenFreeMap tiles
      center: [-114.0719, 51.0447],
      zoom: 11,
    });

    const map = mapRef.current;
    const adjustZoom = () => {
      if (window.matchMedia("(max-width: 768px)").matches) {
        map.setZoom(9); // Smaller screen, lower zoom
      } else if (window.matchMedia("(max-width: 1024px)").matches) {
        map.setZoom(10); // Medium screen, medium zoom
      } else {
        map.setZoom(11); // Larger screen, default zoom
      }
    };

    const mediaQueryList = window.matchMedia("(max-width: 1024px)");
    adjustZoom(); // Initial adjustment
    const handleChange = () => adjustZoom();
    mediaQueryList.addEventListener("change", handleChange);

    let popup;
    map.on("load", () => {
      map.setStyle({
        ...map.getStyle(),
        glyphs: "https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf",
      });
      map.addControl(new maplibregl.NavigationControl(), "top-right");

      // Add a GeoJSON source for the highlighted area
      map.addSource("highlighted-area", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [], // Initially empty
        },
      });

      // Add a highlight layer for the clicked area
      map.addLayer({
        id: "highlighted-area-layer",
        type: "fill",
        source: "highlighted-area",
        paint: {
          "fill-color": "#800000", // Highlight color
          "fill-opacity": 0.8,
        },
      });

      // Optionally, add a border/outline for the highlight
      map.addLayer({
        id: "highlighted-area-outline",
        type: "line",
        source: "highlighted-area",
        paint: {
          "line-color": "#800000",
          "line-width": 15,
        },
      });

      // Fetch community data
      let fetchAPI = "/api/crimeboundarydata";
      if (selectedYear) {
        fetchAPI += "?year=" + selectedYear;
      }
      fetch(fetchAPI)
        .then((response) => response.json())
        .then((data) => {
          data.forEach((item) => {
            const uniqueID = getUniqueID(item);
            // Ensure coordinates form a closed polygon loop
            const coordinates =
              item.cityBoundaryData.geometry.coordinates[0][0].map((coord) => [
                coord[0],
                coord[1],
              ]);
            if (coordinates[0] !== coordinates[coordinates.length - 1]) {
              coordinates.push(coordinates[0]);
            }

            const crimeRate = item.totalCrimeCount;
            const communityName = item.cityBoundaryData.properties.name;
            const fillColor = getCrimeRateColor(crimeRate, mapColorObj);

            map.addSource(uniqueID, {
              type: "geojson",
              data: {
                type: "Feature",
                geometry: {
                  type: "Polygon",
                  coordinates: [coordinates],
                },
                properties: {
                  communityName,
                  // address: item.class,
                  crimeRate,
                },
              },
            });

            //       // Add polygon fill layer
            map.addLayer({
              id: uniqueID,
              type: "fill",
              source: uniqueID,
              layout: {},
              paint: {
                "fill-color": fillColor,
                "fill-opacity": 0.6, // Set opacity
              },
            });

            //       // Add outline to the polygon for clearer boundaries
            map.addLayer({
              id: `${uniqueID}-outline`,
              type: "line",
              source: uniqueID,
              layout: {},
              paint: {
                "line-color": "#911b14", // Black outline for contrast
                "line-width": 2, // Thicker outline
              },
            });

            //add crime count as a label
            // map.addLayer({
            //   id: `${uniqueID}-label`,
            //   type: "symbol",
            //   source: uniqueID,
            //   layout: {
            //     "text-field": `${crimeRate}`,
            //     "text-size": [
            //       "interpolate",
            //       ["linear"],
            //       ["zoom"],
            //       6,
            //       8,
            //       10,
            //       12,
            //       14,
            //       16,
            //     ],
            //     "text-offset": [0, 1.5], // Offset to place label nicely
            //     "text-anchor": "top",
            //   },
            //   paint: {
            //     "text-color": "#000",
            //   },
            // });

            map.on("mouseenter", uniqueID, (e) => {
              map.getCanvas().style.cursor = "pointer";
              const coordinates = e.lngLat;
              const properties = e.features[0].properties;

              if (popup) {
                popup.remove();
              }

              popup = new maplibregl.Popup({
                closeButton: false,
                closeOnClick: false,
              })
                .setLngLat(coordinates)
                .setHTML(
                  `<strong>${properties.communityName}</strong><br/>Crime Count: ${properties.crimeRate}`
                )
                .addTo(map);
            });

            map.on("mouseleave", uniqueID, () => {
              map.getCanvas().style.cursor = "";
            });

            // Add an event listener for when the mouse leaves the map container
            map.getContainer().addEventListener("mouseout", () => {
              if (popup) {
                popup.remove();
              }
            });

            map.on("click", uniqueID, (e) => {
              const properties = e.features[0].properties;
              const clickedCommunity = properties.communityName;
              // setSelectedCommunity(clickedCommunity);
              setDetails({
                name: clickedCommunity,
                crimeRate: properties.crimeRate,
                year: null,
              });

              if(selectedYear){
                dashboardRef.current?.setSelectedYearByInheritedValue(selectedYear);
              } else {
                dashboardRef.current?.resetSeletecYear();
              }

              setShowDashboard(true);

              setShouldScroll(true);
              // Highlight the clicked area
              const geometry = e.features[0].geometry;
              map.getSource("highlighted-area").setData({
                type: "FeatureCollection",
                features: [
                  {
                    type: "Feature",
                    geometry: geometry,
                  },
                ],
              });
            });
          });
        })
        .then(() => setLoading(false))
        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoading(false);
        });
    });

    return () => {
      mediaQueryList.removeEventListener("change", handleChange);
      if (map) {
        map.remove();
      }
    };
  }, [mapColorObj, selectedYear]);

  return (
    
    <>
      {loading && <div>Loading map data...</div>}
      <div id="map" className="map-container"
        // style={{
        //   display: "flex", // Flexbox layout for horizontal alignment
        //   flexDirection: "row", // Row direction to place children side by side
        //   alignItems: "flex-start", // Align items to the top
        //   flexWrap: "wrap"
        // }}
      >
        <div
          ref={mapContainer}
          className="map-pane"
        />
        <div className="right-pane">
          <MapRightComponent
            setSelectedYear={handleYearChange}
            mapColorObj={mapColorObj}
          />
        </div>
      </div>
      {details && (
        <div ref={dashboardSectionRef}>
          <Dashboard ref={dashboardRef} communityName={details.name} showDashboard={showDashboard} dropDownSelectedYear={selectedYear}/>
        </div>
      )}
    </>
  );
};

export default MapComponent;
