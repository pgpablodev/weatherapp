import axios from 'axios'
import { useEffect, useState } from 'react'

import './index.scss'

const API_endpoint = `https://api.openweathermap.org/data/2.5/weather?`
const API_key = `b21be3550fa41ada5e67c9766c88958b`

const TodayWind = ({latitud, longitud}) => {
    const [speed, setSpeed] = useState('')
    const [deg, setDeg] = useState('')
    
    useEffect(() => {        
        setSpeed("...")
        
        let finalAPIEndPoint = `${API_endpoint}lat=${latitud}&lon=${longitud}&exclude=hourly,minutely&appid=${API_key}`

        if(latitud!=='' && longitud!==''){
            axios.get(finalAPIEndPoint)
            .then((response) => {
                const vel = Math.round(response.data.wind.speed*3.6)
                setSpeed(vel)
                setDeg(response.data.wind.deg)
            }).catch(() => {
                setSpeed("?")
            })
        }        
    }, [latitud, longitud])

    let icono = document.getElementsByClassName("wind-icon")[0]
        
    if(speed>0 && speed<=9.26){
        icono.style.background = "url('../../../assets/images/viento1.png')"
    }else if(speed>9.26 && speed<=18.52){
        icono.style.background = "url('../../../assets/images/viento2.png')"
    }else if(speed>18.52 && speed<=27.78){
        icono.style.background = "url('../../../assets/images/viento3.png')"
    }else if(speed>27.78 && speed<=37.04){
        icono.style.background = "url('../../../assets/images/viento4.png')"
    }else if(speed>37.04 && speed<=46.30){
        icono.style.background = "url('../../../assets/images/viento5.png')"
    }else if(speed>46.30 && speed<=55.56){
        icono.style.background = "url('../../../assets/images/viento6.png')"
    }else if(speed>55.56 && speed<=64.82){
        icono.style.background = "url('../../../assets/images/viento7.png')"
    }else if(speed>64.82 && speed<=74.08){
        icono.style.background = "url('../../../assets/images/viento8.png')"
    }else if(speed>74.08 && speed<=92.60){
        icono.style.background = "url('../../../assets/images/viento9.png')"
    }else if(speed>92.60 && speed<=111.12){
        icono.style.background = "url('../../../assets/images/viento10.png')"
    }else if(speed>111.12 && speed<=129.64){
        icono.style.background = "url('../../../assets/images/viento11.png')"
    }

    return(
        <div className="wind-widget">
            <div className="wind-icon" style={{transform: `rotate(${deg}deg)`}}></div>
            <div className="wind-speed">
               {speed} km/h
            </div>
        </div>
    )
}

export default TodayWind