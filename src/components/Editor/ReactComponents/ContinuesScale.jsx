/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { useState, useCallback } from 'react';
import { NodeViewWrapper, NodeViewContent } from '@tiptap/react'; // NodeViewContent
import { Slider, Input, InputNumber } from 'antd';
import {
  Typography,
} from '@mui/material';
import './ContinuesScale.scss';
import debounce from 'lodash.debounce';

function ContinuesScale({ node, updateAttributes }) {
  const [state, setState] = useState({
    maximumText: node?.attrs?.maximumText || '',
    minimumText: node?.attrs?.minimumText || '',
    scaleValue: node?.attrs?.value || 50,
    minValue: node?.attrs?.minValue || 0,
    maxValue: node?.attrs?.maxValue || 100,
    intervalValue: node?.attrs?.intervalValue || 1,
  });

  const onAttributeChange = useCallback(
    debounce((attribute, value) => {
      updateAttributes({ [attribute]: value });
    }, 250),
    [updateAttributes]
  );

  const handleChange = useCallback((attribute, value) => {
    setState((prevState) => ({ ...prevState, [attribute]: value }));
    onAttributeChange(attribute, value);
  }, [onAttributeChange]);

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
      <InputNumber min={0} max={100} value={state.minValue} onChange={(value) => handleChange('minValue', value)}/>
      </div>
      <div>
      <Typography  variant="subtitle1" component="div" >
      Maximum Value:
        </Typography>
        <InputNumber min={0} max={100} value={state.maxValue} onChange={(value) => handleChange('maxValue', value)}/>
</div>
<div>
      <Typography  variant="subtitle1" component="div" >
          Intervals:
        </Typography>
        <InputNumber min={0} max={100} value={state.intervalValue} onChange={(value) => handleChange('intervalValue', value)} step="0.01" stringMode/>
</div>


          <Slider defaultValue={50}
          className={'continues_slide'}
          min={state.minValue} max={state.maxValue} step={state.intervalValue}
           value={state.scaleValue} onChange={(value) => handleChange('scaleValue', value)}
          />
        <div>
        <Typography  variant="subtitle1" component="div" >
          Minimum Text:
        </Typography>
        <Input placeholder="Minimum" value={state.minimumText} onChange={(e) => handleChange('minimumText', e.target.value)}/>
        </div>
        <div>
          <Typography variant="subtitle1" component="div" >
            Maximum Text:
          </Typography>
          <Input placeholder="Maximum" value={state.maximumText}  onChange={(e) => handleChange('maximumText', e.target.value)}/>
      </div>
      </div>
    </NodeViewWrapper>
  );
}

export default ContinuesScale;
