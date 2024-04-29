import Globe from "globe.gl";
// import { geoCode } from "./geocode.js";
import { useState, useEffect, useRef } from "react";
import { GetHeatmapData } from "../hooks/GetHeatmapData";
import { Geocode } from "../hooks/Geocode";
import LocationPopover from "./LocationPopover";

const HeatmapGlobe = () => {
  const [heatmapData, setHeatmapData] = useState<Array<Object>>([]);
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [popoverOpen, setPopoverOpen] = useState<boolean>(false);
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  const coordinatesRef = useRef({ x: 0, y: 0 });

  const initalizeData = async (dataArray: any) => {
    let gData: any = await dataArray.map((item: any, index: any) => {
      if (index === 0) {
        return {
          lat: 0,
          lng: 0,
          weight: 0,
        };
      } else {
        // Extract latitude and longitude strings
        const latitudeStr = String(item["5"]);
        const longitudeStr = String(item["6"]);

        // Extract direction indicators (N, S, E, W)
        const latDirection = latitudeStr.slice(-1);
        const lngDirection = longitudeStr.slice(-1);

        // Remove direction indicators from latitude and longitude strings
        const latitudeValue = parseFloat(latitudeStr.replace(/[NS]/g, ""));
        const longitudeValue = parseFloat(longitudeStr.replace(/[EW]/g, ""));

        // Determine if latitude and longitude should be negative based on direction
        const latMultiplier = latDirection === "S" ? -1 : 1;
        const lngMultiplier = lngDirection === "W" ? -1 : 1;

        return {
          lat: latitudeValue * latMultiplier,
          lng: longitudeValue * lngMultiplier,
          weight: item["1"],
        };
      }
    });
    setHeatmapData(gData);
  };

  const showGlobe = () => {
    const globe = Globe();
    const globeView = document.getElementById("globeViz");
    // console.log(heatmapData);
    if (globeView) {
      globe
        .globeImageUrl("../../public/earth-dark.jpeg")
        .heatmapsData([heatmapData])
        .heatmapPointLat("lat")
        .heatmapPointLng("lng")
        .heatmapPointWeight("weight")
        // .heatmapTopAltitude(0.7)
        .heatmapsTransitionDuration(3000)
        .onHeatmapClick(async (event, coords, item) => {
          //   // Your custom logic here
          const location = await Geocode(item.lat, item.lng);
          setCity(location.city);
          setState(location.state);
          setCountry(location.country);
          setPopoverOpen(true);
        })
        .enablePointerInteraction(true)(globeView);
    }
  };

  const initialize = async () => {
    const data = await GetHeatmapData();
    await initalizeData(data);
  };

  useEffect(() => {
    initialize();
  }, []);

  useEffect(() => {
    if (heatmapData.length > 1) {
      showGlobe();
    }
  }, [heatmapData]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      coordinatesRef.current = { x: event.clientX, y: event.clientY };
      setCoordinates(coordinatesRef.current);
      window.removeEventListener("click", handleMouseMove);
      if (popoverOpen) {
        setPopoverOpen(false);
      }
    };
    window.addEventListener("click", handleMouseMove);

    // Clean up the event listener when the component unmounts

    return () => {
      window.removeEventListener("click", handleMouseMove);
    };
  }, [coordinates]);

  return (
    <div className="">
      <div id="globeViz"></div>

      {popoverOpen && (
        <LocationPopover
          coordinates={coordinates}
          city={city}
          state={state}
          country={country}
          popoverOpen={popoverOpen}
          setPopoverOpen={setPopoverOpen}
        />
      )}
    </div>
  );
};

export default HeatmapGlobe;
