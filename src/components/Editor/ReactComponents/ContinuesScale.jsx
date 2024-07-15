/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, {useState} from 'react';
import { NodeViewWrapper, NodeViewContent } from '@tiptap/react'; // NodeViewContent
import { Slider, Input } from 'antd';
import {
  Typography,
} from '@mui/material';
import './ContinuesScale.scss';
import debounce from 'lodash.debounce';
import { InputNumber } from 'antd';


function ContinuesScale({node, updateAttributes}) {

  const [maximumText, setMaximumText] = useState(node?.attrs?.maximumText || '');
  const [minimumText, setMinimumText] = useState(node?.attrs?.minimumText || '');
  const [scaleValue, setScaleValue] = useState(node?.attrs?.value || 50);
  const [minValue, setMinValue] = useState(node?.attrs?.minValue || 0);
  const [maxValue, setMaxValue] = useState(node?.attrs?.maxValue || 100);
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
      <InputNumber min={0} max={100} value={minValue} onChange={(value)=>{{
        onAttributeChange('minValue', value);
        setMinValue(value);
      }
      }}/>
      </div>
      <div>
      <Typography  variant="subtitle1" component="div" >
      Maximum Value:
        </Typography>
        <InputNumber min={0} max={100} value={maxValue} onChange={(value)=>{
        onAttributeChange('maxValue', value);
        setMaxValue(value);
        }
      }/>
</div>
<div>
      <Typography  variant="subtitle1" component="div" >
          Intervals:
        </Typography>
        <InputNumber min={0} max={100} value={intervalValue} onChange={(value)=>{
        onAttributeChange('intervalValue', value);
        setIntervalValue(value);
        }
      }
      step="0.01"
      stringMode/>
</div>


          <Slider defaultValue={50}
          className={'continues_slide'}
          min={minValue} max={maxValue} step={intervalValue}
           value={scaleValue} onChange={(value) => {
            setScaleValue(value);
            onChangeDebounce('value', value);
          }
          
            }/>
        <div>
        <Typography  variant="subtitle1" component="div" >
          Minimum Text:
        </Typography>
        <Input placeholder="Minimum" value={minimumText} onChange={(e)=> {
            setMinimumText(e.target.value);
            onChangeDebounce('minimumText', e.target.value)}
          }/>
        </div>
        <div>
          <Typography variant="subtitle1" component="div" >
            Maximum Text:
          </Typography>
          <Input placeholder="Maximum" value={maximumText}  onChange={(e)=> {
          setMaximumText(e.target.value);
          onChangeDebounce('maximumText', e.target.value)
          }}/>
      </div>
      </div>
    </NodeViewWrapper>
  );
}

export default ContinuesScale;
