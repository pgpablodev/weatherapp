import './index.scss'
import TodayWeather from './TodayWeather'
import TodayWind from './TodayWind'
import FutureWeather from './FutureWeather'
import FutureWeatherMobile from './FutureWeatherMobile'
import { useEffect, useState } from 'react'
import axios from 'axios'

const API_endpoint = `http://api.openweathermap.org/geo/1.0/reverse?`
const API_key = process.env.REACT_APP_API_key

const Panel = () => {    
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')
    const [cityName, setCityName] = useState('')
    
    useEffect(() => {
        setCityName("Detectando ubicación...")
        
        navigator.geolocation.getCurrentPosition((position) => {
            setLatitude(position.coords.latitude)
            setLongitude(position.coords.longitude)
            
            let finalAPIEndPoint = `${API_endpoint}lat=${latitude}&lon=${longitude}&appid=${API_key}`

            if(latitude!=='' && longitude!==''){
                axios.get(finalAPIEndPoint)
                .then((response) => {
                    setCityName("Tiempo actual en " +response.data[0].name)
                }).catch((error) => {
                    console.log(error.message)
                })
            }            
        })
        

    }, [latitude, longitude])
    
    return(
        <div className="weatherapp-panel">
            <div className="panel-header">
                {cityName}
            </div>
            <div className="main-content">
                <TodayWeather />
                <TodayWind />
            </div>            
            <div className="section-header">
                Próximas previsiones
            </div>
            <div className="three">
                <div className="five">
                    <FutureWeather id={1}/>
                    <FutureWeather id={9}/>
                    <FutureWeather id={17}/>
                    <FutureWeather id={25}/>
                    <FutureWeather id={33}/>
                </div>  
                <div className="five">
                    <FutureWeather id={4}/>
                    <FutureWeather id={12}/>
                    <FutureWeather id={20}/>
                    <FutureWeather id={28}/>
                    <FutureWeather id={36}/>
                </div>  
                <div className="five">
                    <FutureWeather id={7}/>
                    <FutureWeather id={15}/>
                    <FutureWeather id={23}/>
                    <FutureWeather id={31}/>
                    <FutureWeather id={39}/>
                </div>  
            </div>   
            <div className="fiveteen">
                <div>
                    <FutureWeatherMobile id={1}/>
                    <FutureWeatherMobile id={4}/>
                    <FutureWeatherMobile id={7}/>
                </div>                
                <div>
                    <FutureWeatherMobile id={9}/>
                    <FutureWeatherMobile id={12}/> 
                    <FutureWeatherMobile id={15}/>
                </div>
                <div>
                    <FutureWeatherMobile id={17}/>
                    <FutureWeatherMobile id={20}/>
                    <FutureWeatherMobile id={23}/>
                </div>
                <div>
                    <FutureWeatherMobile id={25}/> 
                    <FutureWeatherMobile id={28}/>
                    <FutureWeatherMobile id={31}/>
                </div>
                <div>
                    <FutureWeatherMobile id={33}/>
                    <FutureWeatherMobile id={36}/>
                    <FutureWeatherMobile id={39}/> 
                </div>                              
            </div>                      
        </div>
    )
}

export default Panel;