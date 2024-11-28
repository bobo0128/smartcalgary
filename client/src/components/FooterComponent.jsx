import './FooterComponent.css';
import '../App.css';

import background from '../assets/img_calgary_landscape.svg';

const FooterComponent = () => {
    return (
 <div className='section-container'>
            <footer className="footer">
                <div className="footer-image-wrapper">
                    <img src={background} alt="Calgary Landscape" className="footer-image" />
                </div>
                <div className="footer-content universal-color">
                    <p><center>© 2024 Smart Calgary. All rights reserved.</center></p>
                </div>
            </footer>
        </div>
          
        
    );
};

export default FooterComponent;
