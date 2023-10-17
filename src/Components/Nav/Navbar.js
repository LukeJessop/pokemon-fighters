import { Link } from "react-router-dom";
import "./navbar.css";
import { typeMap } from "../Fighting/typeAdvantage";
import { useState } from "react";
function Navbar() {
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [infoIndex, setInfoIndex] = useState(0);

  const mouseEventHandler = (index) => {
    setInfoIndex(index);
  };
  return (
    <div className="button-container" style={{ padding: "18px" }}>
      <h1 className="username-text">Pokemon Fighters</h1>
      <Link to="/">
        <button className="btn">Backpack</button>
      </Link>
      <Link to="/fighting">
        <button className="btn">Fight!</button>
      </Link>
      <br />
      <br />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          width: "100%"
        }}
      >
        {typeMap.map((item, index) => {
          return (
            <div
              onMouseOut={() => {
                setIsInfoOpen(false);
                mouseEventHandler(index);
              }}
              onMouseOver={() => {
                setIsInfoOpen(true);
                mouseEventHandler(index);
              }}
              style={{
                display: "flex",
                cursor: "pointer",
                alignItems: "center",
                gap: "10px",
                width: "50%",
                color: "white",
                fontSize: "14px",
                marginBottom: "10px",
                position: "relative"
              }}
            >
              <img
                style={{
                  width: "20px",
                  padding: "4px",
                  borderRadius: "50%"
                }}
                alt="pokemon-type"
                className={item.type.toLowerCase()}
                src={item.icon}
              />
              {item.type}
              <div
                style={{
                  position: "absolute",
                  top: "-400%",
                  left: "100%",
                  backgroundColor: "white",
                  color: "black",
                  zIndex: "1",
                  visibility:
                    isInfoOpen && infoIndex === index ? "visible" : "hidden",
                  display: "flex",
                  flexDirection: "column",
                  minWidth: "100%",
                  padding: "16px",
                  borderRadius: "20px",
                  gap: "10px"
                }}
              >
                Advantage:
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px"
                  }}
                >
                  {item.strengths.map((strengthsItem) => {
                    return (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px"
                        }}
                      >
                        <img
                          style={{
                            width: "20px",
                            height: "20px",
                            padding: "4px",
                            borderRadius: "50%"
                          }}
                          alt="pokemon-type"
                          className={strengthsItem.type.toLowerCase()}
                          src={strengthsItem.icon}
                        />
                        {strengthsItem.type}
                      </div>
                    );
                  })}
                </div>
                Disadvantage:
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px"
                  }}
                >
                  {item.weaknesses.map((strengthsItem) => {
                    return (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px"
                        }}
                      >
                        <img
                          style={{
                            width: "20px",
                            height: "20px",
                            padding: "4px",
                            borderRadius: "50%"
                          }}
                          alt="pokemon-type"
                          className={strengthsItem.type.toLowerCase()}
                          src={strengthsItem.icon}
                        />
                        {strengthsItem.type}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div
        style={{
          height: "100%",
          display: "flex",
          alignItems: "end",
          color: "#f667ff"
        }}
      >
        <h3>
          Do not refresh your browser or else you will lose your progress!!
        </h3>
      </div>
    </div>
  );
}
export default Navbar;
