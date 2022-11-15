import './index.scss';
import { useState, useEffect } from 'react'
import { MapContainer, TileLayer , Marker, useMapEvents } from 'react-leaflet'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faMapLocationDot } from '@fortawesome/free-solid-svg-icons';
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
                if(window.innerWidth<1122) ocultaMapa()
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

    function muestraMapa(){
        let mapa = document.getElementsByClassName("page-map")[0]
        let cerrar = document.getElementsByClassName("close-button")[0]
        let fondo = document.getElementsByClassName("black-screen")[0]
        if(mapa!==undefined){            
            mapa.style.visibility = "visible"
            cerrar.style.display = "flex"
            fondo.style.display = "flex"
        }   
    }
    
    function ocultaMapa(){
        let mapa = document.getElementsByClassName("page-map")[0]
        let cerrar = document.getElementsByClassName("close-button")[0]
        let fondo = document.getElementsByClassName("black-screen")[0]
        if(mapa!==undefined){
            mapa.style.visibility = "hidden"
            cerrar.style.display = "none"
            fondo.style.display = "none"
        }
    }

    return(
        <div className="App">
            <Titlebar />
            <div className="page">
                <div className="page-panel">
                    <Panel latitud={latitude} longitud={longitude}/>
                </div>
                <div className="show-map" onClick={muestraMapa}>
                    <FontAwesomeIcon icon={faMapLocationDot}/>
                </div>
                <div className="black-screen"></div>
                <div className="close-button" onClick={ocultaMapa}><FontAwesomeIcon icon={faXmark}/></div>
                <div className="page-map">
                    {isLoading
                        ? <div></div>
                        : <InitMap latitud={latitude} longitud={longitude}/>
                    }                    
                </div>                
            </div>            
        </div>
    )
}

export default Layout;