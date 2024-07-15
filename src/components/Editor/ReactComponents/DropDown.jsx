/* eslint-disable react/prop-types */
import React, {useEffect, useState} from 'react';
import { NodeViewWrapper, NodeViewContent } from '@tiptap/react';
import { Button, Modal, Select, Dropdown} from 'antd';
import { DownOutlined } from '@ant-design/icons';
import './DropDown.scss';
import debounce from 'lodash.debounce';

function Checkbox({node, updateAttributes}) {
  const [dropDownValues, setDropDownValues] = useState(node?.attrs?.dropDownValues || []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [example, setExampleDropDownText] = useState('select');
  const [valueOptions, setValueOptions] = useState([]);

  useEffect(()=>{
    if(node?.attrs?.dropDownValues && node?.attrs?.dropDownValues?.length > 0) {
      const currOptions = node?.attrs?.dropDownValues.map(currDown=>({label:currDown.label, value: currDown.label}));
      setValueOptions(currOptions);
    }
  },[])

  const handleChange = (value) => {
    setOptions((prevOptions) => [...prevOptions, {label: value, value}]);
  }

  const onOptionsChangeDebounce = debounce(handleChange, 250);

  const onClick = ({key}) => {
    const chosen = dropDownValues.find((option) => option.key === Number(key));
    setExampleDropDownText(chosen.label)
  };

  return (
    <NodeViewWrapper>
      <div  className="drop_down" suppressContentEditableWarning contentEditable="false">
      <div  className="drop_down_text" contentEditable="true">
        <NodeViewContent />
      </div>
      {dropDownValues.length > 0 ? (
        <>
      <Dropdown menu={{ items: dropDownValues, onClick }}  trigger={['click']}>
        <Button>  
          {example}
            <DownOutlined />
          </Button>
      </Dropdown>
      <Button onClick={()=>{
        setIsModalOpen(true);
      }}>Edit</Button>
      </>
      ) : (
        <div>
          <Button onClick={() => {setIsModalOpen(true)}}>Add Option</Button>
        </div>
      )}
        <Modal title="Add Options" open={isModalOpen} onOk={()=>{
          const dropDownCurrentValue = valueOptions.map((option, index) => ({key: index + 1,
          label: option.value}));
          setDropDownValues(dropDownCurrentValue);
          updateAttributes({
            dropDownValues: dropDownCurrentValue
          })
          setIsModalOpen(false)
        }
          } onCancel={()=>setIsModalOpen(false)}>
        <Select
          mode="multiple"
          allowClear
          style={{
            width: '100%',
          }}
          onSearch={onOptionsChangeDebounce}
          options={options}
          value={valueOptions}
          onSelect={(value, option)=>{
            setValueOptions(prev => [...prev, option]);
          }}
          onDeselect={(value)=>{
            setValueOptions(prev => prev.filter(option=>option.value !== value))
          }}
        />
      </Modal>
      </div>
    </NodeViewWrapper>
  );
}

export default Checkbox;
