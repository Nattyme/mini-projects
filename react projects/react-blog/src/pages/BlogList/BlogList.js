import './BlogList.css';

const BlogList = ({ posts, handleDelete}) => {
	return ( 
		<div className="blog">
      {posts.map((post) => 
          (
            <div key={post.id} className="post-preview">
              <h2>{post.title}</h2>
              <p>{post.author}</p>
              <button className="btn-delete" onClick = { () => {handleDelete(post.id)}}>Delete</button>
            </div>
          )
      )}
		</div>
	);
}

export default BlogList;