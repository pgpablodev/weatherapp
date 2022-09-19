import './index.scss';
import Titlebar from '../Titlebar'
import Map from '../Map'
import Panel from '../Panel'

const Layout = () => {
    return(
        <div className="App">
            <Titlebar />
            <div className="page">
                <div className="page-panel">
                    <Panel />
                </div>
                <div className="page-map">
                    <Map />
                </div>
            </div>            
        </div>
    )
}

export default Layout;