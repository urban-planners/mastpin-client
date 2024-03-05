import { useEffect, useState } from "react";
import "../Drawer.css";
import "./DrawerRight.css";
import { PinInfoInterface } from "../../../../../types";
import Title from "../components/Title";
import Content from "../components/Content";
import { useDispatch, useSelector } from "react-redux";

const DrawerRight = () => {
  const selectedPin = useSelector((state: any) => state.map.selectedPin) as PinInfoInterface;

  return (
    <div className="drawer right">
      <main>
        <Title title="Properties" />
        <Content emptyText="No properties to show.">
          {selectedPin.title
            ? [
                <form className="drawer__form" key={selectedPin.title}>
                  <label>
                    Title
                    <input value={selectedPin.title} onChange={() => {}} />
                  </label>
                  <label>
                    Population
                    <input value={selectedPin.pop} onChange={() => {}} />
                  </label>
                  <label>
                    Longitude
                    <input value={selectedPin.loc?.lng} onChange={() => {}} />
                  </label>
                  <label>
                    Latitude
                    <input value={selectedPin.loc?.lat} onChange={() => {}} />
                  </label>
                  <button hidden>Submit</button>
                </form>,
              ]
            : []}
        </Content>
      </main>
      <div className="landscape__container">
        <label className="landscape__container">
          <small>Preview</small>
          <canvas className="landscape__canvas" />
        </label>
      </div>
    </div>
  );
};

export default DrawerRight;
