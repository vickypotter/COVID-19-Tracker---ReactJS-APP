import React from 'react';
import { Map as LeafletMap, TileLayer } from 'react-leaflet';
import { showDataOnMap } from '../Utils/util';
import './Map.css';

function Map({ countries, casesType, center, zoom }) {
    return (
        <div className="map">
            <LeafletMap center={center} zoom={zoom}>
                <TileLayer 
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" //https://{s}.title.openstreetmap.org/{z}/{x}/{y}.png
                    // attribution='&copy; <a href="http://osm.org/copyright">OpenStreet</a> contribuutors'    
                />
                {
                    showDataOnMap(countries, casesType) 
                }
            </LeafletMap>
        </div>
    )
}

export default Map;
