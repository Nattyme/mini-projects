import { Link } from 'react-router-dom';
import deletePost from '../../deletePost';
import './BlogList.css';

const BlogList = ({posts, updateFlag, setUpdateFlag}) => {  
  
	return ( 
		<div className="blog">
      {posts.map((post) => 
          (
            <div key={post.id} className="post-preview">
              <Link to={`/blogs/${post.id}`}>
                <h2>{post.title}</h2>
                <p>{post.author}</p>
              </Link>
              
              <button className="btn-delete" onClick={ () => {deletePost(post.id, setUpdateFlag(!updateFlag))}}>Delete</button>
            </div>
          )
      )}
		</div>
	);
}

export default BlogList;