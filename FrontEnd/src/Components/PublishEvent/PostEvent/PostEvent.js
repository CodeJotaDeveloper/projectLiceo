import { Link } from 'react-router-dom'
import { BsPerson } from 'react-icons/bs'
import { MdDateRange } from 'react-icons/md'
import { MdOutlinePlace } from 'react-icons/md'
import './postEvent.css'

const PostEvent = ({ postEvent }) => {


  return (
    <>
      <h1 className='textPrincipal'>Eventos</h1>
      <section className='boxBlog'>
        <div className='containerEvent gridEvent'>
          {postEvent.map((item, index) => (
            <div className='box boxEvents' key={index}>
              <div className='imgCard' > {item.imgUrl && <img className='imgEvent' src={item.imgUrl} alt='' />}</div>
              <div className='details'>
                <Link to={`/postEvent/${item._id}`}>
                  <h3 className='textevents'>{item.title}</h3>
                </Link>
                <p className="titlePost"><b>Fecha:</b> {new Date(item.createdAt).toLocaleDateString()}</p>
                <div className='events'>
                  <BsPerson className='icons' />
                  <p className='textevents'>{item.organizacion}</p>
                </div>
                <p className='desctext'>{item.description.slice(0, 180)}...</p>
                <div className='events'>
                  <MdDateRange className='icons' />
                  <p className='textevents'>{item.fecha}</p>
                </div>
                <div className='events'>
                  <MdOutlinePlace className='icons' />
                  <p className='textevents'>{item.lugar}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </section>
    </>
  )
}

export default PostEvent