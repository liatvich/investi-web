/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';
import { Checkbox } from 'antd';
import { PreviewText } from './PreviewText';

export function PreviewCheckbox({ node, onChange }) {
  const [value, setValue] = useState(node?.attrs?.value);

  useEffect(() => {
    setValue(node?.attrs?.value);
  }, [node]);

  return (
      <Checkbox
        key={Math.floor(Math.random() * 1000 + 1)}
        onChange={(event) => {
          if (node?.attrs) {
            // eslint-disable-next-line no-param-reassign
            node.attrs.value = event.target.checked;
          }
          setValue(event.target.checked);
          onChange?.(event.target.checked);
        }}
        checked={value}
      >
        {node
          && <PreviewText key={Math.floor(Math.random() * 1000 + 1)} node={node} />}
      </Checkbox>
  );
}

export default PreviewCheckbox;
