import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpLong } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { useEffect, useState } from 'react'
import './index.scss'

const API_endpoint = `https://api.openweathermap.org/data/2.5/weather?`
const API_key = `b21be3550fa41ada5e67c9766c88958b`

const TodayWind = () => {
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')
    const [speed, setSpeed] = useState('')
    const [deg, setDeg] = useState('')    
    
    useEffect(() => {        
        setSpeed("...")

        navigator.geolocation.getCurrentPosition((position) => {            
            setLatitude(position.coords.latitude)
            setLongitude(position.coords.longitude)
            
            let finalAPIEndPoint = `${API_endpoint}lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&appid=${API_key}`

            if(latitude!=='' && longitude!==''){
                axios.get(finalAPIEndPoint)
                .then((response) => {
                    const vel = Math.round(response.data.wind.speed*3.6)
                    setSpeed(vel)
                    setDeg(response.data.wind.deg)
                })
            }            
        })
    }, [latitude, longitude])

    return(
        <div className="wind-widget">
            <div className="wind-icon" style={{transform: `rotate(${deg}deg)`}}>
                <FontAwesomeIcon icon={faArrowUpLong} color={"#b3b3b3"}/>
            </div>
            <div className="wind-speed">
               {speed} km/h
            </div>
        </div>
    )
}

export default TodayWind