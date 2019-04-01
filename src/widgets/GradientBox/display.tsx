/**
 * @class GradientBoxDisplay
 */

import * as React from "react";

export type GradientBoxDisplayProps = { widget: Widget };

export default class GradientBoxDisplay extends React.Component<
  GradientBoxDisplayProps
> {
  eleWrapper: React.RefObject<any>;
  state = {
    width: 0
  };
  constructor(props: GradientBoxDisplayProps) {
    super(props);
    this.eleWrapper = React.createRef();
  }

  componentDidMount() {
    if (this.eleWrapper.current) {
      this.setState({
        width: this.eleWrapper.current.offsetWidth
      });
    }
  }

  render() {
    const {
      widget: {
        data: {
          title,
          items,
          titleColor,
          itemColor,
          backgroundColor,
          backgroundImg
        }
      }
    } = this.props;
    const { width } = this.state;

    return (
      <div
        ref={this.eleWrapper}
        className={"widget_gradient_box"}
        style={{
          height: width
        }}
      >
        <div
          className={`widget_gradient_box_background`}
          style={{
            backgroundColor,
            backgroundImage: `url(${backgroundImg})`,
            height: width
          }}
        >
          <div className={`widget_gradient_box_gradient`} />
        </div>
        <div className={`widget_gradient_box_content`}>
          <h3
            className={`widget_gradient_box_title`}
            style={{ color: titleColor }}
          >
            {title}
          </h3>
          <ul className={`widget_gradient_box_items`}>
            {items &&
              items.map((item: string, itemIndex: number) => (
                <li key={itemIndex} style={{ color: itemColor }}>
                  {item}
                </li>
              ))}
          </ul>
        </div>
      </div>
    );
  }
}
