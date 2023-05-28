import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext.js";
import { Card } from "../component/Card.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

export const DropdownFav = () => {
  const { store, actions } = useContext(Context);

  const deleteFav = () => {
    actions.setFav(false, "c" + item.uid)
  };

  return (
    <div className="dropdown">
      <button
        className="btn btn-light dropdown-toggle"
        type="button"
        id="dropdownMenuButton"
        data-bs-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        Favorites
        <span className="ms-1 bg-dark text-light"> {store.countFav} </span>
      </button>
      <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <li className="ms-2">Characters</li>
        {store.itemsFav.c.map((item, key) => (
          <li key={key} className="d-flex justify-content-between" >
            <Link to={"/single/c" + item.uid} key={key} className="linkCard">
              <label key={key} className="ms-2" >
                {item.name}
              </label>
            </Link>
            {/* <FontAwesomeIcon icon={faTrashCan} className="me-3" onClick={() => { actions.setFav(false, "c" + item.uid) }} /> */}
          </li>
        ))}
        <li><hr></hr></li>
        <li className="ms-2">Planets</li>
        {store.itemsFav.p.map((item, key) => (
          <li key={key} className="d-flex justify-content-between">
            <Link to={"/single/p" + item.uid} key={key} className="linkCard">
              <label key={key} className="ms-2" >
                {item.name}
              </label>
            </Link>
            {/* <FontAwesomeIcon icon={faTrashCan} className="me-3" onClick={() => { actions.setFav(false, "p" + item.uid) }} /> */}
          </li>
        ))}
        <li><hr></hr></li>
        <li className="ms-2">Vehicles</li>
        {store.itemsFav.v.map((item, key) => (
          <li key={key} className="d-flex justify-content-between" >
            <Link to={"/single/v" + item.uid} key={key} className="linkCard">
              <label key={key} className="ms-2" >
                {item.name}
              </label>
            </Link>
            {/* <FontAwesomeIcon icon={faTrashCan} className="me-3" onClick={() => { actions.setFav(false, "v" + item.uid) }} /> */}
          </li>
        ))}
        {/* <a class="dropdown-item" href="#">Action</a>
                <a class="dropdown-item" href="#">Another action</a>
                <a class="dropdown-item" href="#">Something else here</a> */}
      </ul>
    </div>
  );
};
