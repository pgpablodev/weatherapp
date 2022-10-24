import './index.scss';
import { useState, useEffect } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import Titlebar from '../Titlebar'
import Panel from '../Panel'

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

const Layout = () => {   
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

    return(
        <div className="App">
            <Titlebar />
            <div className="page">
                <div className="page-panel">
                    <Panel latitud={latitude} longitud={longitude}/>
                </div>
                <div className="page-map">
                    {isLoading
                        ? <div style={{marginTop: "2rem"}}>Cargando mapa...</div>
                        : <InitMap latitud={latitude} longitud={longitude}/>
                    }                    
                </div>
            </div>            
        </div>
    )
}

export default Layout;