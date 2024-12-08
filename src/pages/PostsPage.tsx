import Post from "./Post";

export default function PostsPage() {
  return (
    <div 
      className="bg-black min-vh-100"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="container pt-5 ">
        <div className="row" style={{ paddingTop: "80px" }}>
          <div className="col-md-5">
            <Post />
          </div>
        </div>
      </div>
    </div>
  );
}