import React, { Component, useEffect, useState } from 'react';
import L from 'leaflet';
import {
    MapContainer, TileLayer, Marker, Popup, useMap, useMapEvent
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import './my-map.css';
import axiosInstance from "../../api/axiosInstance"
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { userActions } from '../../features/userSlice';
import { toast } from 'react-toastify';
import Header from '../Header/Header';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

const MyMap = () => {
    const position = [51.505, -0.09]

    return (
        <>
            <Header />
            <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
        </>
    )
}

export default MyMap;