"use client";
import { MapContainer, TileLayer } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

export default function MapComponent() {
	const ACCESS_TOKEN =
		"pk.eyJ1IjoiaXNhcXVldGRpbml6IiwiYSI6ImNtMW1xZDlzNDBsZnQybm9rdGc0bjI3ZHcifQ.A7dkCWEP21eO_uA_XlP9tQ";
	const url = `https://api.mapbox.com/styles/v1/isaquetdiniz/cm1msf2sk001001pbewmlbnzn/tiles/256/{z}/{x}/{y}@2x?access_token=${ACCESS_TOKEN}`;

	return (
		<MapContainer
			center={[-8.0634651, -34.8729125]}
			zoom={14}
			zoomControl={false}
			scrollWheelZoom={false}
			style={{
				height: "100vh",
				width: "100vw",
				position: "fixed",
			}}
		>
			<TileLayer
				attribution="Map data &copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors, <a href=&quot;https://creativecommons.org/licenses/by-sa/2.0/&quot;>CC-BY-SA</a>, Imagery &copy; <a href=&quot;https://www.mapbox.com/&quot;>Mapbox</a>"
				url={url}
			/>
		</MapContainer>
	);
}
