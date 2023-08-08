import { Link } from 'react-router-dom'
import './postnew.css';

const PostNew = ({ posts }) => {

  return (
    <div className="cardmain">
      <h1 className='textPrincipal'>Noticias</h1>
      <div className='cardnews'>
        {posts.map((item, index) => (
          <div key={index}>
            <Link to={`/post/${item._id}`}>
            <div className='cardconatiner' >
              <h3 className='titlePost'>{item.title}</h3>
              <p className="titlePost"><b>Fecha:</b> {new Date(item.createdAt).toLocaleDateString()}</p>
              <p className='descPost'>{item.description.slice(0, 150)}....</p>
            </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PostNew