"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default marker icon broken in Next.js
const customIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

interface LeafletMapProps {
    lat: number;
    lng: number;
    label?: string;
}

export default function LeafletMap({ lat, lng, label = "DineWise HQ" }: LeafletMapProps) {
    return (
        <MapContainer
            center={[lat, lng]}
            zoom={16}
            scrollWheelZoom={false}
            zoomControl={false}
            style={{ width: "100%", height: "100%", minHeight: "380px" }}
            className="rounded-none"
        >
            {/* Modern CartoDB Positron tile — clean, minimal, premium look */}
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            />
            <ZoomControl position="bottomright" />
            <Marker position={[lat, lng]} icon={customIcon}>
                <Popup>
                    <div className="font-bold text-sm">{label}</div>
                    <div className="text-xs text-gray-500 mt-1">Cox's Bazar, Bangladesh</div>
                </Popup>
            </Marker>
        </MapContainer>
    );
}
