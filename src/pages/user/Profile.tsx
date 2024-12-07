export default function Profile() {
  return (
      <div className="container py-5">
        {/* Header */}
        <div className="row mb-5">
          <div className="col-md-3 text-center">
            <img
                src="/profile-placeholder.jpg"
                className="rounded-circle img-fluid mb-3"
                alt="Profile"
                style={{width: "150px", height: "150px", objectFit: "cover"}}
            />
          </div>
          <div className="col-md-9">
            <h2>John Doe</h2>
            <p className="text-muted">@johndoe</p>
            <p>Film enthusiast & reviewer</p>
            <button className="btn btn-primary me-2">Edit Profile</button>
            <button className="btn btn-outline-secondary">Share Profile</button>
          </div>
        </div>

        {/* Stats */}
        <div className="row mb-5">
          <div className="col-md-4 text-center">
            <h3>150</h3>
            <p className="text-muted">Reviews</p>
          </div>
          <div className="col-md-4 text-center">
            <h3>2.1k</h3>
            <p className="text-muted">Followers</p>
          </div>
          <div className="col-md-4 text-center">
            <h3>450</h3>
            <p className="text-muted">Following</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card">
          <div className="card-header">
            <h4>Recent Activity</h4>
          </div>
          <div className="card-body">
            <div className="list-group">
              <a href="#" className="list-group-item list-group-item-action">
                <div className="d-flex justify-content-between">
                  <h6>Reviewed "Inception"</h6>
                  <small className="text-muted">2 days ago</small>
                </div>
                <p className="mb-1">A mind-bending masterpiece...</p>
              </a>
              <a href="#" className="list-group-item list-group-item-action">
                <div className="d-flex justify-content-between">
                  <h6>Added "The Dark Knight" to watchlist</h6>
                  <small className="text-muted">5 days ago</small>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
  );
}