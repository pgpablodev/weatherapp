import './index.scss'
import TodayWeather from './TodayWeather'
import TodayWind from './TodayWind'
import FutureWeather from './FutureWeather'
import FutureWeatherMobile from './FutureWeatherMobile'
import { useEffect, useState } from 'react'
import axios from 'axios'

const API_endpoint = `https://api.openweathermap.org/geo/1.0/reverse?`
const API_key = `b21be3550fa41ada5e67c9766c88958b`

const Panel = ({latitud, longitud}) => {    
    const [cityName, setCityName] = useState('')
    const [isLoading, setLoading] = useState(true)
    const [width, setWidth] = useState(window.innerWidth)
    const breakpoint = 1122

    useEffect(() => {
        const handleResizeWindow = () => setWidth(window.innerWidth)        
        window.addEventListener("resize", handleResizeWindow)        
        return () => {
            window.removeEventListener("resize", handleResizeWindow)       
        }
    },[])
    
    useEffect(() => {
        setCityName("Detectando ubicación...")
        
        let finalAPIEndPoint = `${API_endpoint}lat=${latitud}&lon=${longitud}&appid=${API_key}`

        if(latitud!=='' && longitud!==''){
            setTimeout(() => {
                setLoading(false)
            },2500)
            axios.get(finalAPIEndPoint)
            .then((response) => {
                setCityName("Tiempo actual en " +response.data[0].name)
            }).catch(() => {
                setCityName("Ubicación desconocida. ")
            })
        }            
        

    }, [latitud, longitud])

    if(width>breakpoint){
        return(
            <div>
                {isLoading
                    ? <div className="loading-panel"></div>
                    : <div></div>
                }
                <div className="weatherapp-panel">
                    <div className="panel-header">
                        {cityName}
                    </div>
                    <div className="main-content">
                        <TodayWeather latitud={latitud} longitud={longitud} />
                        <TodayWind latitud={latitud} longitud={longitud} />
                    </div>            
                    <div className="section-header">
                        Próximas previsiones
                    </div>
                    <div className="three">
                        <div className="five">
                            <FutureWeather latitud={latitud} longitud={longitud} id={1}/>
                            <FutureWeather latitud={latitud} longitud={longitud} id={9}/>
                            <FutureWeather latitud={latitud} longitud={longitud} id={17}/>
                            <FutureWeather latitud={latitud} longitud={longitud} id={25}/>
                            <FutureWeather latitud={latitud} longitud={longitud} id={33}/>
                        </div>  
                        <div className="five">
                            <FutureWeather latitud={latitud} longitud={longitud} id={4}/>
                            <FutureWeather latitud={latitud} longitud={longitud} id={12}/>
                            <FutureWeather latitud={latitud} longitud={longitud} id={20}/>
                            <FutureWeather latitud={latitud} longitud={longitud} id={28}/>
                            <FutureWeather latitud={latitud} longitud={longitud} id={36}/>
                        </div>  
                        <div className="five">
                            <FutureWeather latitud={latitud} longitud={longitud} id={7}/>
                            <FutureWeather latitud={latitud} longitud={longitud} id={15}/>
                            <FutureWeather latitud={latitud} longitud={longitud} id={23}/>
                            <FutureWeather latitud={latitud} longitud={longitud} id={31}/>
                            <FutureWeather latitud={latitud} longitud={longitud} id={39}/>
                        </div>  
                    </div>                        
                </div>
            </div>
        )  
    }else{
        return(
            <div>
                {isLoading
                    ? <div className="loading-panel"></div>
                    : <div></div>
                }
                <div className="weatherapp-panel">
                    <div className="panel-header">
                        {cityName}
                    </div>
                    <div className="main-content">
                        <TodayWeather latitud={latitud} longitud={longitud} />
                        <TodayWind latitud={latitud} longitud={longitud} />
                    </div>            
                    <div className="section-header">
                        Próximas previsiones
                    </div>   
                    <div className="fiveteen">
                            <FutureWeatherMobile latitud={latitud} longitud={longitud} id={1}/>
                            <FutureWeatherMobile latitud={latitud} longitud={longitud} id={4}/>
                            <FutureWeatherMobile latitud={latitud} longitud={longitud} id={7}/>
                            <FutureWeatherMobile latitud={latitud} longitud={longitud} id={9}/>
                            <FutureWeatherMobile latitud={latitud} longitud={longitud} id={12}/> 
                            <FutureWeatherMobile latitud={latitud} longitud={longitud} id={15}/>
                            <FutureWeatherMobile latitud={latitud} longitud={longitud} id={17}/>
                            <FutureWeatherMobile latitud={latitud} longitud={longitud} id={20}/>
                            <FutureWeatherMobile latitud={latitud} longitud={longitud} id={23}/>
                            <FutureWeatherMobile latitud={latitud} longitud={longitud} id={25}/> 
                            <FutureWeatherMobile latitud={latitud} longitud={longitud} id={28}/>
                            <FutureWeatherMobile latitud={latitud} longitud={longitud} id={31}/>
                            <FutureWeatherMobile latitud={latitud} longitud={longitud} id={33}/>
                            <FutureWeatherMobile latitud={latitud} longitud={longitud} id={36}/>
                            <FutureWeatherMobile latitud={latitud} longitud={longitud} id={39}/>                            
                    </div>                      
                </div>
            </div>
        )  
    }  
}

export default Panel;