/**
 * @class HalfMoonPieDisplay
 */

import * as React from "react";

export default class HalfMoonPieDisplay extends React.Component {
  render() {
    const { widget } = this.props;
    const {
      data: { title, subtitle, img }
    } = widget;
    return (
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          minHeight: "60vh"
        }}
      >
        <div
          style={{
            height: "300%",
            width: "200%",
            minWidth: "1300px",
            transform: "translateX(-50%)",
            position: "absolute",
            left: "50%",
            top: "-200%",
            backgroundImage:
              "linear-gradient(to bottom, rgb(76, 237, 241), rgba(13, 180, 176, 1))",
            borderRadius: "50%",
            overflow: "hidden"
          }}
        >
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: "17%",
              right: "17%",
              height: "60vh"
            }}
          >
            {img && (
              <div
                style={{
                  position: "relative",
                  display: "block",
                  height: "100%",
                  paddingLeft: "10vw",
                  paddingRight: "10vw"
                }}
              >
                <div style={{ position: "relative", height: "100%" }}>
                  <img
                    src={img}
                    style={{
                      position: "absolute",
                      right: 200,
                      top: "20%",
                      zIndex: "-1"
                    }}
                    alt={`Half Moon Pie`}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        <div
          style={{
            position: "relative",
            display: "block",
            paddingLeft: "10vw",
            paddingRight: "10vw"
          }}
        >
          <div style={{ position: "relative" }}>
            <h3
              style={{
                fontSize: "5em",
                paddingTop: "70px",
                marginBottom: "15px",
                color: "#fff"
              }}
            >
              {title}
            </h3>
            <p
              style={{
                color: "#fff",
                fontSize: "1.1em",
                marginTop: 0
              }}
            >
              {subtitle}
            </p>
          </div>
        </div>
      </div>
    );
  }
}
