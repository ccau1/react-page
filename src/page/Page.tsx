/**
 * @class Page
 */

import * as React from "react";

// import styles from "./styles.css";

export type PageProps = { text: string };

export class Page extends React.Component<PageProps> {
  render() {
    // const { text } = this.props;

    return <div>Page component</div>;
  }
}
