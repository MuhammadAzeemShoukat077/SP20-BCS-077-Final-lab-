import react from "react";

const Card = ({ id, title, body, userId }) => {
  return (
    <div className="card-body">
      <h1>{id}</h1>
      <h2>{title}</h2>
      <h2>{body}</h2>
      <h3>{userId}</h3>
    </div>
  );
};

export default Card;
//{ id, title, body, userId };
