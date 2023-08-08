import logoMEP from '../../assets/198247-logos-01.png'
import logoInno from '../../assets/innovacion-01-274x300.png'
import logoLiceo from '../../assets/logoLiceo.png'
import {BsFacebook} from 'react-icons/bs'
import {AiTwotonePhone} from 'react-icons/ai'
import {MdEmail} from 'react-icons/md'
import {GrMapLocation} from 'react-icons/gr'
import './footer.css'

export const Footer = () => {
  return (
    <div className='boxFooter'>
    <footer>
        <div className='containerFooter flexFooter'>
            <div className='boxLogos'>
                <div className='logos'>
                    <img className='imagen' src={logoMEP} alt='logoMep' /> 
                </div>
                <div className='logos'>
                    <img className='imagen' src={logoInno} alt='logoInno' /> 
                </div>
                <div className='logos'>
                    <img className='imagen' src={logoLiceo} alt='logoMep' /> 
                </div>
            </div>
            <div className='footerInfo'>
                <p className='textInfo'>Información</p>
                <p>
                    <a href='https://www.facebook.com/lielv'>
                        <BsFacebook className='icon'/> Liceo La Virgen de Sarapiquí
                    </a>
                </p>
                <p className='mapa'>
                    <a href='https://goo.gl/maps/scDiA2MUSwf7rfVK9'>
                        <GrMapLocation className='icon'/> 1 km sur y 800 oeste del EBAIS de Heredia, La Virgen.
                    </a>
                </p>
                <p>
                    <AiTwotonePhone className='icon' /> 2459 1100
                </p>
                <p>
                    <MdEmail className='icon'/> lic.lavirgen@mep.go.cr
                </p>
            </div>
           
        </div>
        <div className='copyright'>
            <p>Colaboradores: Jorge Villalobos y Yessica Montero</p>
            <p>©2023 Copyright: Liceo La Virgen</p>
        </div>
    </footer>
   </div>
  )
}