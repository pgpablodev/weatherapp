import './index.scss';
import { useState, useEffect } from 'react'
import { MapContainer, TileLayer , Marker, useMapEvents } from 'react-leaflet'
import Titlebar from '../Titlebar'
import Panel from '../Panel'

const Layout = () => { 
    
    let mapBounds = [[85.05080297843352, -179.99701243944503], [-85.05112368932467, 179.99994315756257]]

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

    function ChangeLocation(){
        const map = useMapEvents({
            click(e){  
                map.locate(map.mouseEventToLatLng(e.originalEvent))
                setLatitude(map.mouseEventToLatLng(e.originalEvent).lat)
                setLongitude(map.mouseEventToLatLng(e.originalEvent).lng)                          
            }
        })
    }

    function InitMap({latitud, longitud}){      
        return(
            <MapContainer center={[latitud, longitud]} zoom={13} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                    noWrap
                    minZoom = '2'
                    bounds = {mapBounds}
                />
                <ChangeLocation />
                <Marker position={[latitud, longitud]}></Marker>
            </MapContainer>        
        )    
    }

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