import {Link} from 'react-router-dom'
import './PostCirculares.css'; 

const PostCirculares = ({circulares}) =>{
  
    return (
      <div className="boxCard">
        <h1 className='textPrincipal'>Circulares</h1>
        <div className='cardCircu'>
          {circulares.map((item, index) =>(
            <div key={index}>
              {/* <div className='imgCir' > {item.circularImag && <img className='imgCircu' src={photo + item.circularImag} alt='' />}</div> */}
              <div className='cardcontainer'>
                <div className='group'>
                  <div className='imgCir' > {item.circularImag && <img className='imgCircu' src={item.circularImag} alt='' />}</div>
                  <Link to={`/circu/${item._id}`}>
                    <h3 className='titleCirc'>{item.title}</h3>
                  </Link>
                </div>
                <p className="titleCirc"><b>Fecha:</b> {new Date(item.createdAt).toLocaleDateString()}</p>
                <p className='titleCirc'><b>{item.consecutivoCircular}</b></p>
                <p className='descCirc'>{item.description.slice(0, 150)}...</p>
              </div>
              
            </div>
          ))}
        </div>
      </div>
    )
}

export default PostCirculares