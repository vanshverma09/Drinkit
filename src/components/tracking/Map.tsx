"use client";

import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Truck } from "lucide-react";

// Fix Leaflet's default icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// A custom icon for the delivery truck
const truckIconHtml = `
  <div style="background-color: white; border: 2px solid #ea580c; border-radius: 50%; padding: 4px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); width: 32px; height: 32px; display: flex; align-items: center; justify-content: center;">
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ea580c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M10 17h4V5H2v12h3"></path>
      <path d="M20 17h2v-3.34a4 4 0 0 0-1.17-2.83L19 9h-5"></path>
      <path d="M14 17h1"></path>
      <circle cx="7.5" cy="17.5" r="2.5"></circle>
      <circle cx="17.5" cy="17.5" r="2.5"></circle>
    </svg>
  </div>
`;

const truckIcon = L.divIcon({
  html: truckIconHtml,
  className: "",
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

// Dummy coordinates for the route
const START_POS: [number, number] = [28.4595, 77.0266]; // Somewhere in Gurgaon
const END_POS: [number, number] = [28.4520, 77.0310]; // Destination

function AnimatedMarker() {
  const map = useMap();
  const [pos, setPos] = useState<[number, number]>(START_POS);
  
  useEffect(() => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 0.02; // Move 2% every frame
      if (progress > 1) progress = 0; // Loop for demo purposes
      
      const lat = START_POS[0] + (END_POS[0] - START_POS[0]) * progress;
      const lng = START_POS[1] + (END_POS[1] - START_POS[1]) * progress;
      
      setPos([lat, lng]);
      
      // Auto-pan map if it gets close to edge
      if (progress === 0.02) map.setView(START_POS, 15);
    }, 100);
    
    return () => clearInterval(interval);
  }, [map]);

  return (
    <Marker position={pos} icon={truckIcon}>
      <Popup>
        <strong>Rajesh</strong> is on the way!
      </Popup>
    </Marker>
  );
}

export default function TrackingMap() {
  return (
    <div className="w-full h-full z-0 relative">
      <MapContainer 
        center={START_POS} 
        zoom={15} 
        style={{ height: "100%", width: "100%", zIndex: 0 }}
        zoomControl={false}
        attributionControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        {/* Destination Marker */}
        <Marker position={END_POS}>
          <Popup>Delivery Address</Popup>
        </Marker>
        
        {/* Animated Truck */}
        <AnimatedMarker />
      </MapContainer>
    </div>
  );
}
