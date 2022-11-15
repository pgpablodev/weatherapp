import axios from 'axios'
import { useEffect, useState } from 'react'

import './index.scss'

import viento1 from '../../../assets/images/viento1.png'
import viento2 from '../../../assets/images/viento2.png'
import viento3 from '../../../assets/images/viento3.png'
import viento4 from '../../../assets/images/viento4.png'
import viento5 from '../../../assets/images/viento5.png'
import viento6 from '../../../assets/images/viento6.png'
import viento7 from '../../../assets/images/viento7.png'
import viento8 from '../../../assets/images/viento8.png'
import viento9 from '../../../assets/images/viento9.png'
import viento10 from '../../../assets/images/viento10.png'
import viento11 from '../../../assets/images/viento11.png'

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
        icono.style.backgroundImage = `url(${viento1})`
    }else if(speed>9.26 && speed<=18.52){
        icono.style.backgroundImage = `url(${viento2})`
    }else if(speed>18.52 && speed<=27.78){
        icono.style.backgroundImage = `url(${viento3})`
    }else if(speed>27.78 && speed<=37.04){
        icono.style.backgroundImage = `url(${viento4})`
    }else if(speed>37.04 && speed<=46.30){
        icono.style.backgroundImage = `url(${viento5})`
    }else if(speed>46.30 && speed<=55.56){
        icono.style.backgroundImage = `url(${viento6})`
    }else if(speed>55.56 && speed<=64.82){
        icono.style.backgroundImage = `url(${viento7})`
    }else if(speed>64.82 && speed<=74.08){
        icono.style.backgroundImage = `url(${viento8})`
    }else if(speed>74.08 && speed<=92.60){
        icono.style.backgroundImage = `url(${viento9})`
    }else if(speed>92.60 && speed<=111.12){
        icono.style.backgroundImage = `url(${viento10})`
    }else if(speed>111.12 && speed<=129.64){
        icono.style.backgroundImage = `url(${viento11})`
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