import React from 'react';

export function downloadObjectAsJson(exportObj: any, exportName: string) {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportObj));
  var downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute('href', dataStr);
  downloadAnchorNode.setAttribute('download', exportName);
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}

export function uploadJsonProps(cb: { (obj: any): unknown }) {
  return {
    type: 'file',
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      let files = e.target.files;
      if (!files?.length) return;
      const file = files[0];
      let reader = new FileReader();
      reader.onload = e => {
        const file = e.target?.result;
        cb(JSON.parse(file as string));
      };
      reader.readAsText(file);
    },
  };
}
