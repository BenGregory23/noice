import {Box} from "@mui/joy";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import {useEffect, useState} from "react";

const Map = ({foods, selectedRestaurant, dispatch}) => {
    const [mapObject, setMapObject] = useState(null);
    const [popup, setPopup] = useState(null);
    const [mapLoaded, setMapLoaded] = useState(false);
    mapboxgl.accessToken = 'pk.eyJ1IjoiYmVuY2hvY28iLCJhIjoiY2xnbDJld2luMWxpeDNxcnJrcW83MXZncSJ9.MUWgzTvs3FpJDboxR9p84w';


    useEffect(() => {

        if(mapObject === null) {
            const map = new mapboxgl.Map({
                container: 'map', // container ID
                style: 'mapbox://styles/mapbox/streets-v12', // style URL
                center: [3.1, 45.78], // starting position [lng, lat]
                zoom: 11, // starting zoom
            });

            map.on('load', () => {
                map.addSource('places', {
                    // This GeoJSON contains features that include an "icon"
                    // property. The value of the "icon" property corresponds
                    // to an image in the Mapbox Streets style's sprite.
                    type: "geojson",
                    data: {
                        type: "FeatureCollection",
                        features: foods,
                    },
                });
                // Add a layer showing the places.
                map.addLayer({
                    'id': 'places',
                    'type': 'symbol',
                    'source': 'places',
                    'layout': {
                        'icon-image': ['get', 'icon'],
                        'icon-allow-overlap': true
                    }
                });

                // When a click event occurs on a feature in the places layer, open a popup at the
                // location of the feature, with description HTML from its properties.
                map.on('click', 'places', (e) => {
                    // Copy coordinates array.
                    const coordinates = e.features[0].geometry.coordinates.slice();
                    const description = e.features[0].properties.description;

                    // Ensure that if the map is zoomed out such that multiple
                    // copies of the feature are visible, the popup appears
                    // over the copy being pointed to.
                    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                    }

                    // display description + rating in popup + coordinates
                    let popupContent = '<div>' + description + '</div>';

                    new mapboxgl.Popup()
                        .setLngLat(coordinates)
                        .setHTML(popupContent)
                        .addTo(map);


                    dispatch({type: "SELECT_RESTAURANT", restaurant: e.features[0]});
                });

                // Change the cursor to a pointer when the mouse is over the places layer.
                map.on('mouseenter', 'places', () => {
                    map.getCanvas().style.cursor = 'pointer';
                });

                // Change it back to a pointer when it leaves.
                map.on('mouseleave', 'places', () => {
                    map.getCanvas().style.cursor = '';
                });
                setMapLoaded(true);
                dispatch({ type: "MAP_LOADED", map: map });
            });

            setMapObject(map);

        }

        //if foods change, update the map
        if(mapObject !== null && mapLoaded) {
            mapObject.getSource('places').setData({
                type: "FeatureCollection",
                features: foods,
            });
        }


        if(selectedRestaurant){

            if(popup) popup.remove();
            // add a popup
            //display description + rating in popup + coordinates
            let popupContent = '<div>' + selectedRestaurant.properties.description + '</div>';

            let popupTmp = new mapboxgl.Popup()
                .setLngLat(selectedRestaurant.geometry.coordinates)
                .setHTML(popupContent)
                .addTo(mapObject);
            setPopup(popupTmp);
            mapObject.flyTo({
                center: selectedRestaurant.geometry.coordinates,
                essential: true, // this animation is considered essential with respect to prefers-reduced-motion
                zoom: 15
            });
        }
    }, [foods, selectedRestaurant, dispatch]);


    return (
        <Box sx={{
            zIndex: 1,
            margin: 5,
            width: "50%",
            borderRadius: 10,
            "@media (max-width: 600px)": {
                width: "90%",
                height: "50%",
                margin: 1,

            }
        }}
            id={"map"}
        >
        </Box>

    )
}

export default Map