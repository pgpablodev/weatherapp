import './index.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTemperatureHigh, faTemperatureLow } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react'
import axios from 'axios'
import d01 from '../../../assets/images/01d.png'
import n01 from '../../../assets/images/01n.png'
import d02 from '../../../assets/images/02d.png'
import n02 from '../../../assets/images/02n.png'
import d03 from '../../../assets/images/03d.png'
import n03 from '../../../assets/images/03n.png'
import d04 from '../../../assets/images/04d.png'
import n04 from '../../../assets/images/04n.png'
import d09 from '../../../assets/images/09d.png'
import n09 from '../../../assets/images/09n.png'
import d10 from '../../../assets/images/10d.png'
import n10 from '../../../assets/images/10n.png'
import d11 from '../../../assets/images/11d.png'
import n11 from '../../../assets/images/11n.png'
import d13 from '../../../assets/images/13d.png'
import n13 from '../../../assets/images/13n.png'
import d50 from '../../../assets/images/50d.png'
import n50 from '../../../assets/images/50n.png'

const API_endpoint = `https://api.openweathermap.org/data/2.5/weather?`
const API_key = `b21be3550fa41ada5e67c9766c88958b`

const TodayWeather = () => {
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')
    const [temperature, setTemperature] = useState('')
    const [maxT, setMaxT] = useState('')
    const [minT, setMinT] = useState('')
    const [fecha, setFecha] = useState('')
    const [hora, setHora] = useState('')
    const [weather, setWeather] = useState('')
    const [icono, setIcono] = useState('')
    
    useEffect(() => {
        setTemperature("...")
        setMaxT("...")
        setMinT("...")
        setFecha("...")
        setHora("...")
        
        navigator.geolocation.getCurrentPosition((position) => {
            setLatitude(position.coords.latitude)
            setLongitude(position.coords.longitude)
            
            let finalAPIEndPoint = `${API_endpoint}lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&appid=${API_key}`

            axios.get(finalAPIEndPoint)
            .then((response) => {                
                const celsius = Math.round(response.data.main.temp-273.15)
                const celsiusMax = Math.round(response.data.main.temp_max-273.15)
                const celsiusMin = Math.round(response.data.main.temp_min-273.15)
                setTemperature(celsius)
                setMaxT(celsiusMax)
                setMinT(celsiusMin)
                const dia = new Date(response.data.dt*1000).getDate()
                const mes = new Date(response.data.dt*1000).getMonth()
                const anio = new Date(response.data.dt*1000).getFullYear()
                const hh = new Date().getHours()
                const mm = new Date().getMinutes()
                const diaSemana = new Date(response.data.dt*1000).getDay()
                let nombreDia = ""
                
                switch(diaSemana){
                    case 1:
                        nombreDia = "LUN"
                        break
                    case 2:
                        nombreDia = "MAR"
                        break
                    case 3:
                        nombreDia = "MIÉ"
                        break
                    case 4:
                        nombreDia = "JUE"
                        break
                    case 5:
                        nombreDia = "VIE"
                        break
                    case 6:
                        nombreDia = "SÁB"
                        break
                    case 0:
                        nombreDia = "DOM"
                        break   
                    default:
                        nombreDia = ""
                        break
                }

                if(mes<9)
                    setFecha(`${nombreDia} ${dia}/0${mes+1}/${anio}`)
                else
                    setFecha(`${nombreDia} ${dia}/${mes+1}/${anio}`)
                
                if(hh<10){
                    if(mm<10)
                        setHora(`0${hh}:0${mm}`)
                    else
                        setHora(`0${hh}:${mm}`)
                }else{
                    if(mm<10)
                        setHora(`${hh}:0${mm}`)
                    else
                        setHora(`${hh}:${mm}`) 
                }
                setWeather(response.data.weather[0].description)
                
                switch(response.data.weather[0].icon){
                    case "01d":
                        setIcono(d01)
                        break
                    case "01n":
                        setIcono(n01)
                        break
                    case "02d":
                        setIcono(d02)
                        break
                    case "02n":
                        setIcono(n02)
                        break
                    case "03d":
                        setIcono(d03)
                        break
                    case "03n":
                        setIcono(n03)
                        break
                    case "04d":
                        setIcono(d04)
                        break
                    case "04n":
                        setIcono(n04)
                        break
                    case "09d":
                        setIcono(d09)
                        break
                    case "09n":
                        setIcono(n09)
                        break
                    case "10d":
                        setIcono(d10)
                        break
                    case "10n":
                        setIcono(n10)
                        break
                    case "11d":
                        setIcono(d11)
                        break
                    case "11n":
                        setIcono(n11)
                        break
                    case "13d":
                        setIcono(d13)
                        break
                    case "13n":
                        setIcono(n13)
                        break
                    case "50d":
                        setIcono(d50)
                        break
                    case "50n":
                        setIcono(n50)
                        break
                    default:
                        setIcono("")
                        break
                }                           
            })
        })
    }, [latitude, longitude, weather])
    
    return(
        <div className="today-widget">
            <div className="main-section">
                <div className="big">
                    <div className="today-icon">
                        <img src={icono} alt={weather}></img>
                    </div>
                    <div className="current-weather">
                        {temperature}ºC
                    </div>
                </div>
                <div className="current-date">
                    {fecha}<br></br>{hora}
                </div>
            </div>
            <div className="side-section">
                <div className ="max-temp">
                    <FontAwesomeIcon icon={faTemperatureHigh} color="#ff6022" /> {maxT}ºC
                </div>
                <div className ="min-temp">
                    <FontAwesomeIcon icon={faTemperatureLow} color="#47b3ff" /> {minT}ºC
                </div>
            </div>
        </div>
    );
}

export default TodayWeather;