import './index.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTemperatureHigh, faTemperatureLow } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import axios from 'axios';
import d01 from '../../../assets/images/small/01d.png'
import n01 from '../../../assets/images/small/01n.png'
import d02 from '../../../assets/images/small/02d.png'
import n02 from '../../../assets/images/small/02n.png'
import d03 from '../../../assets/images/small/03d.png'
import n03 from '../../../assets/images/small/03n.png'
import d04 from '../../../assets/images/small/04d.png'
import n04 from '../../../assets/images/small/04n.png'
import d09 from '../../../assets/images/small/09d.png'
import n09 from '../../../assets/images/small/09n.png'
import d10 from '../../../assets/images/small/10d.png'
import n10 from '../../../assets/images/small/10n.png'
import d11 from '../../../assets/images/small/11d.png'
import n11 from '../../../assets/images/small/11n.png'
import d13 from '../../../assets/images/small/13d.png'
import n13 from '../../../assets/images/small/13n.png'
import d50 from '../../../assets/images/small/50d.png'
import n50 from '../../../assets/images/small/50n.png'

const API_endpoint = `https://api.openweathermap.org/data/2.5/forecast?`
const API_key = `b21be3550fa41ada5e67c9766c88958b`

const FutureWeather = ({id, latitud, longitud}) => {
    const [temp, setTemp] = useState('')
    const [minTemp, setMinTemp] = useState('')
    const [maxTemp, setMaxTemp] = useState('')
    const [fecha, setFecha] = useState('')
    const [hora, setHora] = useState('')
    const [icono, setIcono] = useState('')
    const [weather, setWeather] = useState('')
    const [nombreDia, setNombreDia] = useState('')
    
    useEffect(() => {
        setTemp("...")
        setMinTemp("...")
        setMaxTemp("...")
        setFecha("...")
        setHora("...")
            
        let finalAPIEndPoint = `${API_endpoint}lat=${latitud}&lon=${longitud}&appid=${API_key}`

        if(latitud!=='' && longitud!==''){
            axios.get(finalAPIEndPoint).then((response) => {
                setTemp(Math.round(response.data.list[id].main.temp-273.15))
                setMinTemp(Math.round(response.data.list[id].main.temp_min-273.15))
                setMaxTemp(Math.round(response.data.list[id].main.temp_max-273.15))
                const dia = new Date(response.data.list[id].dt*1000).getDate()
                const mes = new Date(response.data.list[id].dt*1000).getMonth()
                const anio = new Date(response.data.list[id].dt*1000).getFullYear()
                const diaSemana = new Date(response.data.list[id].dt*1000).getDay()
                const hh = new Date(response.data.list[id].dt*1000).getHours()
                
                switch(diaSemana){
                    case 0:
                        setNombreDia("DOM")
                        break  
                    case 1:
                        setNombreDia("LUN")
                        break
                    case 2:
                        setNombreDia("MAR")
                        break
                    case 3:
                        setNombreDia("MIÉ")
                        break
                    case 4:
                        setNombreDia("JUE")
                        break
                    case 5:
                        setNombreDia("VIE")
                        break
                    case 6:
                        setNombreDia("SÁB")
                        break                     
                    default:
                        setNombreDia("")
                        break
                }

                if(mes<9)
                    setFecha(`${nombreDia} ${dia}/0${mes+1}/${anio}`)                    
                else
                    setFecha(`${nombreDia} ${dia}/${mes+1}/${anio}`)
                
                if(hh<10)
                    setHora(`0${hh}:00`)
                else
                    setHora(`${hh}:00`)                
                
                setWeather(response.data.list[id].weather[0].description)
                    
                switch(response.data.list[id].weather[0].icon){
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
        }           
    }, [latitud, longitud, id, nombreDia])

    switch(nombreDia){
        case "DOM":
            return(
                <div className="future-widget">
                    <div className="future-main-section">
                        <div className="future-big">
                            <div className="future-icon">
                                <img src={icono} alt={weather}></img>
                            </div>
                            <div className="future-weather">
                                {temp}ºC
                            </div>
                        </div>
                        <div className="future-date">
                            {fecha}<br></br>{hora}
                        </div>
                    </div>
                    <div className="future-side-section">
                        <div className="f-max-temp">
                            <div><FontAwesomeIcon icon={faTemperatureHigh} color="#ff6022" /></div>
                            <div>{maxTemp}ºC</div>
                        </div>
                        <div className="f-min-temp">
                            <div><FontAwesomeIcon icon={faTemperatureLow} color="#47b3ff" /></div>
                            <div>{minTemp}ºC</div>
                        </div>
                    </div>
                </div>
            );
        case "LUN":
            return(
                <div className="future-widget" style={{backgroundColor: "#3a2d21", borderColor: "#3a2d21"}}>
                    <div className="future-main-section">
                        <div className="future-big">
                            <div className="future-icon">
                                <img src={icono} alt={weather}></img>
                            </div>
                            <div className="future-weather">
                                {temp}ºC
                            </div>
                        </div>
                        <div className="future-date">
                            {fecha}<br></br>{hora}
                        </div>
                    </div>
                    <div className="future-side-section">
                        <div className="f-max-temp">
                            <div><FontAwesomeIcon icon={faTemperatureHigh} color="#ff6022" /></div>
                            <div>{maxTemp}ºC</div>
                        </div>
                        <div className="f-min-temp">
                            <div><FontAwesomeIcon icon={faTemperatureLow} color="#47b3ff" /></div>
                            <div>{minTemp}ºC</div>
                        </div>
                    </div>
                </div>
            );
        case "MAR":
            return(
                <div className="future-widget" style={{backgroundColor: "#3a2122", borderColor: "#3a2122"}}>
                    <div className="future-main-section">
                        <div className="future-big">
                            <div className="future-icon">
                                <img src={icono} alt={weather}></img>
                            </div>
                            <div className="future-weather">
                                {temp}ºC
                            </div>
                        </div>
                        <div className="future-date">
                            {fecha}<br></br>{hora}
                        </div>
                    </div>
                    <div className="future-side-section">
                        <div className="f-max-temp">
                            <div><FontAwesomeIcon icon={faTemperatureHigh} color="#ff6022" /></div>
                            <div>{maxTemp}ºC</div>
                        </div>
                        <div className="f-min-temp">
                            <div><FontAwesomeIcon icon={faTemperatureLow} color="#47b3ff" /></div>
                            <div>{minTemp}ºC</div>
                        </div>
                    </div>
                </div>
            );
        case "MIÉ":
            return(
                <div className="future-widget" style={{backgroundColor: "#3a2721", borderColor: "#3a2721"}}>
                    <div className="future-main-section">
                        <div className="future-big">
                            <div className="future-icon">
                                <img src={icono} alt={weather}></img>
                            </div>
                            <div className="future-weather">
                                {temp}ºC
                            </div>
                        </div>
                        <div className="future-date">
                            {fecha}<br></br>{hora}
                        </div>
                    </div>
                    <div className="future-side-section">
                        <div className="f-max-temp">
                            <div><FontAwesomeIcon icon={faTemperatureHigh} color="#ff6022" /></div>
                            <div>{maxTemp}ºC</div>
                        </div>
                        <div className="f-min-temp">
                            <div><FontAwesomeIcon icon={faTemperatureLow} color="#47b3ff" /></div>
                            <div>{minTemp}ºC</div>
                        </div>
                    </div>
                </div>
            );
        case "JUE":
            return(
                <div className="future-widget" style={{backgroundColor: "#3a3a21", borderColor: "#3a3a21"}}>
                    <div className="future-main-section">
                        <div className="future-big">
                            <div className="future-icon">
                                <img src={icono} alt={weather}></img>
                            </div>
                            <div className="future-weather">
                                {temp}ºC
                            </div>
                        </div>
                        <div className="future-date">
                            {fecha}<br></br>{hora}
                        </div>
                    </div>
                    <div className="future-side-section">
                        <div className="f-max-temp">
                            <div><FontAwesomeIcon icon={faTemperatureHigh} color="#ff6022" /></div>
                            <div>{maxTemp}ºC</div>
                        </div>
                        <div className="f-min-temp">
                            <div><FontAwesomeIcon icon={faTemperatureLow} color="#47b3ff" /></div>
                            <div>{minTemp}ºC</div>
                        </div>
                    </div>
                </div>
            );
        case "VIE":
            return(
                <div className="future-widget" style={{backgroundColor: "#39213a", borderColor: "#39213a"}}>
                    <div className="future-main-section">
                        <div className="future-big">
                            <div className="future-icon">
                                <img src={icono} alt={weather}></img>
                            </div>
                            <div className="future-weather">
                                {temp}ºC
                            </div>
                        </div>
                        <div className="future-date">
                            {fecha}<br></br>{hora}
                        </div>
                    </div>
                    <div className="future-side-section">
                        <div className="f-max-temp">
                            <div><FontAwesomeIcon icon={faTemperatureHigh} color="#ff6022" /></div>
                            <div>{maxTemp}ºC</div>
                        </div>
                        <div className="f-min-temp">
                            <div><FontAwesomeIcon icon={faTemperatureLow} color="#47b3ff" /></div>
                            <div>{minTemp}ºC</div>
                        </div>
                    </div>
                </div>
            );
        case "SÁB":
            return(
                <div className="future-widget" style={{backgroundColor: "#2d213a", borderColor: "#2d213a"}}>
                    <div className="future-main-section">
                        <div className="future-big">
                            <div className="future-icon">
                                <img src={icono} alt={weather}></img>
                            </div>
                            <div className="future-weather">
                                {temp}ºC
                            </div>
                        </div>
                        <div className="future-date">
                            {fecha}<br></br>{hora}
                        </div>
                    </div>
                    <div className="future-side-section">
                        <div className="f-max-temp">
                            <div><FontAwesomeIcon icon={faTemperatureHigh} color="#ff6022" /></div>
                            <div>{maxTemp}ºC</div>
                        </div>
                        <div className="f-min-temp">
                            <div><FontAwesomeIcon icon={faTemperatureLow} color="#47b3ff" /></div>
                            <div>{minTemp}ºC</div>
                        </div>
                    </div>
                </div>
            );
        default:
            return(
                <div className="future-widget">
                    <div className="future-main-section">
                        <div className="future-big">
                            <div className="future-icon">
                                <img src={icono} alt={weather}></img>
                            </div>
                            <div className="future-weather">
                                {temp}ºC
                            </div>
                        </div>
                        <div className="future-date">
                            {fecha}<br></br>{hora}
                        </div>
                    </div>
                    <div className="future-side-section">
                        <div className="f-max-temp">
                            <div><FontAwesomeIcon icon={faTemperatureHigh} color="#ff6022" /></div>
                            <div>{maxTemp}ºC</div>
                        </div>
                        <div className="f-min-temp">
                            <div><FontAwesomeIcon icon={faTemperatureLow} color="#47b3ff" /></div>
                            <div>{minTemp}ºC</div>
                        </div>
                    </div>
                </div>
            );
    }    
}

export default FutureWeather;