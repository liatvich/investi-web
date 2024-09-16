/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, {useState} from 'react';
import { NodeViewWrapper, NodeViewContent } from '@tiptap/react'; // NodeViewContent
import { Input } from 'antd';
import {
  Typography,
} from '@mui/material';
import './NumberInput.scss';
import debounce from 'lodash.debounce';
import { InputNumber } from 'antd';


function NumberInput({node, updateAttributes}) {

  const [suffixText, setSuffixText] = useState(node?.attrs?.suffixText || '');
  const [prefixText, setPrefixText] = useState(node?.attrs?.prefixText || '');
  const [scaleValue, setScaleValue] = useState(node?.attrs?.value || 0);
  const [minValue, setMinValue] = useState(node?.attrs?.minValue || Number.MIN_SAFE_INTEGER);
  const [maxValue, setMaxValue] = useState(node?.attrs?.maxValue || Number.MAX_SAFE_INTEGER);
  const [intervalValue, setIntervalValue] = useState(node?.attrs?.intervalValue || 1);

  const onAttributeChange = (attribute, value) => {
    updateAttributes({[`${attribute}`]: value})
  }

  const onChangeDebounce = debounce(onAttributeChange, 250);

  return (
    <NodeViewWrapper>
      <div  className="main_scale" suppressContentEditableWarning contentEditable="false">
      <div  contentEditable="true">
        <NodeViewContent />
      </div>
      <div>
      <Typography  variant="subtitle1" component="div" >
          Minimum Value:
        </Typography>
      <InputNumber value={minValue} onChange={(value)=>{{
        onAttributeChange('minValue', value);
        setMinValue(value);
      }
      }}/>
      </div>
      <div>
      <Typography  variant="subtitle1" component="div" >
      Maximum Value:
        </Typography>
        <InputNumber value={maxValue} onChange={(value)=>{
        onAttributeChange('maxValue', value);
        setMaxValue(value);
        }
      }/>
</div>
<div>
      <Typography  variant="subtitle1" component="div" >
          Intervals:
        </Typography>
        <InputNumber value={intervalValue} onChange={(value)=>{
        onAttributeChange('intervalValue', value);
        setIntervalValue(value);
        }
      }
      step="0.01"
      stringMode/>
</div>
<div>
<Typography  variant="subtitle1" component="div" >
          Current Value:
        </Typography>

          <InputNumber defaultValue={0}
          className={'continues_slide'}
          min={minValue} max={maxValue} step={intervalValue}
           value={scaleValue} onChange={(value) => {
            setScaleValue(value);
            onChangeDebounce('value', value);
          }
          
            }/>
        <div>
        </div>
        <Typography  variant="subtitle1" component="div" >
          Prefix Text:
        </Typography>
        <Input placeholder="Prefix" value={prefixText} onChange={(e)=> {
            setPrefixText(e.target.value);
            onChangeDebounce('prefixText', e.target.value)}
          }/>
        </div>
        <div>
          <Typography variant="subtitle1" component="div" >
          SuffixText Text:
          </Typography>
          <Input placeholder="suffix" value={suffixText}  onChange={(e)=> {
          setSuffixText(e.target.value);
          onChangeDebounce('suffixText', e.target.value)
          }}/>
      </div>
      </div>
    </NodeViewWrapper>
  );
}

export default NumberInput;
