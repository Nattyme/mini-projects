import { Link } from 'react-router-dom';
import './BlogList.css';

const BlogList = ({posts}) => {  
	return ( 
		<div className="blog">
      {posts.map((post) => 
          (
            <div key={post.id} className="post-preview">
              <Link to={`/blogs/${post.id}`}>
                <h2>{post.title}</h2>
                <p>{post.author}</p>
              </Link>
              
              {/* <button className="btn-delete">Delete</button> */}
            </div>
          )
      )}
		</div>
	);
}

export default BlogList;