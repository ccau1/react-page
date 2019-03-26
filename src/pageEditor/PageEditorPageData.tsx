/**
 * @class PageEditorPageData
 */

import * as React from "react";

export type PageEditorPageDataProps = { page: Page };

export class PageEditorPageData extends React.Component<
  PageEditorPageDataProps
> {
  render() {
    const { page } = this.props;

    return (
      <div className={`page_editor_page_data`}>
        <pre>{JSON.stringify(page, null, 2)}</pre>
      </div>
    );
  }
}
