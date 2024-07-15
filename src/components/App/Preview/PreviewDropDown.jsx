/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';
import { Dropdown, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { PreviewText } from './PreviewText';
import s from './PreviewDropDown.module.scss';

export function PreviewDropDown({ node, disabled }) {
  const [example, setExampleDropDownText] = useState('select');
  const [dropDownValues, setDropDownValues] = useState(node?.attrs?.dropDownValues || []);


  useEffect(() => {
    if(node?.attrs?.chosenValue?.key) {
      const chosen = dropDownValues.find((option) => option.key === node?.attrs?.chosenValue?.key);
      setExampleDropDownText(chosen.label);
    }

    if(node?.attrs?.dropDownValues) {
      setDropDownValues(node?.attrs?.dropDownValues);
    }
  }, [node]);

  const onClick = ({key}) => {
    const chosen = dropDownValues.find((option) => option.key === Number(key));
    node.attrs.chosenValue = chosen;
    setExampleDropDownText(chosen.label)
  };

  return (
    <div className={s.drop_down}>
      <div className={s.text}>
        {node
          && <PreviewText key={Math.floor(Math.random() * 1000 + 1)} node={node} />}
      </div>
      <div>
      <Dropdown menu={{ items: dropDownValues, onClick }}  trigger={['click']} disabled={disabled}>
        <Button>  
          {example}
            <DownOutlined />
          </Button>
      </Dropdown>
    </div>
    </div>
  );
}

export default PreviewDropDown;
