import React, { useState, useEffect, useContext } from "react";
import rigoImage from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Context } from "../store/appContext.js";
import { Card } from "../component/Card.js";

export const Home = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {

  }, []);

  return (
    <div className="bodyHome text-light pb-3">
      <div className="container pt-2">
        <h3>CHARACTERS</h3>
        <div className="container card-container p-3">
          {store.characters.map((item, key) => (
            // <span key={key}> {item.name} </span>
            <Card key={key} id={"c" + item.uid} cardType={1} cardItem={item} />
          ))}
        </div>

        <h3 className="mt-2">PLANETS</h3>
        <div className="container card-container p-3">
          {store.planets.map((item, key) => (
            // <span key={key}> {item.name} </span>
            <Card key={key} id={"p" + item.uid} cardType={2} cardItem={item} />
          ))}
        </div>

        <h3 className="mt-2">VEHICLES</h3>
        <div className="container card-container p-3">
          {store.vehicles.map((item, key) => (
            // <span key={key}> {item.name} </span>
            <Card key={key} id={"v" + item.uid} cardType={3} cardItem={item} />
          ))}
        </div>
      </div>
    </div>
  )
};
