import { useState } from "react";

export default function Card() {
  const [showList, setShowList] = useState(false);
  const toggleList = () => {
    setShowList(!showList);
};
    return(
        <div className="card mx-auto bg-black">
          <p className="card-header text-danger">Username</p>
          <h2 className="card-title text-white">Most Recent Post Title</h2>
          <p className="card-body text-white">This is the description of the post.</p>
          <div className="text-start">
          <button className="btn btn-outline-danger btn-sm float-end"
          onClick={toggleList}>{showList ? 'Hide' : 'Show'}</button>

          <button className="btn btn-outline-danger btn-sm float-end">Delete(For Admins only)</button>
          <button className="btn btn-outline-danger btn-sm float-end">Add</button>
          </div>
          {showList && (
          <ul className="list-group bg-black">
    <li className="list-group-item active">Aliens</li>
    <li className="list-group-item">Terminator</li>
    <li className="list-group-item">Blade Runner</li>
    <li className="list-group-item">Lord of the Ring</li>
    <li className="list-group-item disabled">Star Wars</li>
  </ul>
)}
        </div>
    )
}