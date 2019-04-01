/**
 * @class PageEditorPageData
 */

import * as React from "react";

export type PageEditorPageDataProps = { page: Page };

export class PageEditorPageData extends React.Component<
  PageEditorPageDataProps
> {
  copyFunction = (): void => {
    const ele = document.querySelector(".page_editor_page_data pre");
    if (!ele) return;
    const copyText = ele.textContent;
    const textArea = document.createElement("textarea");
    textArea.textContent = copyText;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    console.log("copied!");
  };
  render() {
    const { page } = this.props;

    return (
      <div className={`page_editor_page_data`}>
        <a
          className={`page_editor_page_data_copy_button`}
          onClick={this.copyFunction}
        >
          Copy
        </a>
        <pre className={"code"}>{JSON.stringify(page, null, 2)}</pre>
      </div>
    );
  }
}
