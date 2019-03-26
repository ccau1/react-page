/**
 * @class PageEditorLayout
 */

import * as React from "react";

export type PageEditorLayoutProps = { page: Page };

export class PageEditorLayout extends React.Component<PageEditorLayoutProps> {
  render() {
    const { page, children } = this.props;

    return (
      <div className={`page_editor_layout`}>
        <div
          className={`page_editor_layout_inner ${
            page.layout.boxed ? `boxed` : ""
          }`}
        >
          {children}
        </div>
      </div>
    );
  }
}
