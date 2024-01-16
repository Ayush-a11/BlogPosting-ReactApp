import React from 'react';
import utilObj from '../appWrite/util';
import { Link } from 'react-router-dom';


function Card({ identifier, title, fileId }) {
  return (
    <>
      <Link to={`/Post/${identifier}`} className="card-link">
        <div className="w-52 card rounded-lg overflow-hidden shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-transform duration-300">
          <div>
            <img
              className="card-image rounded-lg w-64 h-48 object-cover"
              src={utilObj.getFilePreview(fileId)}
              alt={title}
            />
          </div>
          <h2 className="card-title text-purple-500 font-bold text-2xl mt-2">{title}</h2>
        </div>
      </Link>
    </>
  );
}

export default Card;