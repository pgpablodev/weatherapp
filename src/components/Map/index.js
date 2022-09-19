import './index.scss'
import { useState, useEffect } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'

function InitMap({latitud, longitud}){
    return(
        <MapContainer center={[latitud, longitud]} zoom={13} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            />
        </MapContainer>
    )    
}

const Map = () => {    
    
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')
    const [isLoading, setLoading] = useState(true)
    
    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setLatitude(position.coords.latitude)
            setLongitude(position.coords.longitude)
            setLoading(false)
        })
    }, [])

    if(isLoading){
        return <div style={{marginTop: "2rem"}}>Cargando mapa...</div>
    }

    return(
        <InitMap latitud={latitude} longitud={longitude}/>
    )
}



export default Map;