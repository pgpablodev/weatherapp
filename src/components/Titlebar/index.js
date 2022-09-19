import './index.scss';
import Logo from '../../assets/images/logo.png'

const Titlebar = () => {
    return(
        <div className="title-bar">
            <div className="title">
                WeatherApp
            </div>
            <div className="credit">
                Powered by <a href="https://openweathermap.org/"><img src={Logo} alt="openweather logo"></img></a>
            </div>
            <div className="icon"></div>
        </div>
    )
}

export default Titlebar;