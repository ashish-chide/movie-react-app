import React from "react";
import "./index.css";

export default function Movie({ movie }) {
  return (
    <div className="card">
      <h3 className="card-title">{movie.Title}</h3>
      <div className="card-year">{movie.Year}</div>
    </div>
  );
}
