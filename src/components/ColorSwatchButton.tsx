"use strict";

import * as React from "react";
import { SketchPicker } from "react-color";

export type ColorSwatchButtonProps = {
  color: string;
  onChange: { (newColor: string): void };
};

class ColorSwatchButton extends React.Component<ColorSwatchButtonProps> {
  state = {
    displayColorPicker: false,
    color: "rgba(241, 112, 19, 1)"
  };

  constructor(props: ColorSwatchButtonProps) {
    super(props);
    if (props.color) {
      this.state.color = props.color;
    }
  }

  componentDidUpdate(prevProps: ColorSwatchButtonProps) {
    if (this.props.color !== prevProps.color) {
      this.setState({ color: this.props.color });
    }
  }

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false });
  };

  handleChange = (color: any) => {
    const newColor = `rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${
      color.rgb.a
    })`;
    this.setState({
      color: newColor
    });
    this.props.onChange(newColor);
  };

  render() {
    const styles = {
      color: {
        width: "36px",
        height: "14px",
        borderRadius: "2px",
        background: this.state.color
      },
      swatch: {
        padding: "5px",
        background: "#fff",
        borderRadius: "1px",
        boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
        display: "inline-block",
        cursor: "pointer"
      },
      popover: {
        position: "absolute",
        zIndex: "2"
      },
      cover: {
        position: "fixed",
        top: "0px",
        right: "0px",
        bottom: "0px",
        left: "0px"
      }
    };

    return (
      <div>
        <div style={styles.swatch} onClick={this.handleClick}>
          <div style={styles.color} />
        </div>
        {this.state.displayColorPicker ? (
          <div
            style={{
              position: "absolute",
              zIndex: 2
            }}
          >
            <div
              style={{
                position: "fixed",
                top: "0px",
                right: "0px",
                bottom: "0px",
                left: "0px"
              }}
              onClick={this.handleClose}
            />
            <SketchPicker
              color={this.state.color}
              onChange={this.handleChange}
            />
          </div>
        ) : null}
      </div>
    );
  }
}

export default ColorSwatchButton;
