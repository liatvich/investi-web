/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { useState, useCallback, useEffect } from 'react';
import { NodeViewWrapper, NodeViewContent } from '@tiptap/react'; // NodeViewContent
import { Checkbox as CheckboxComponent, Input, Button, Modal } from 'antd';
const { TextArea } = Input;
import debounce from 'lodash/debounce';

const CheckboxScore = ({node, updateAttributes, editor}) => {
  const [score, setScore] = useState(node?.attrs?.score || 0);
  const [checked, setChecked] = useState(node?.attrs?.checked || false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalInput, setModalInput] = useState(editor?.submitText || '');

  const debouncedScoreUpdate = useCallback(
    debounce((value) => updateAttributes({ score: value }), 300),
    [updateAttributes]
  );

  useEffect(() => {
    setScore(node?.attrs?.score || 0);
  }, [node?.attrs?.score]);

  useEffect(() => {
    return () => debouncedScoreUpdate.cancel();
  }, [debouncedScoreUpdate]);

  useEffect(() => {
    setModalInput(editor?.submitText || '');
  }, [editor?.submitText]);

  const handleScoreChange = (value) => {
    setScore(value);
    debouncedScoreUpdate(value);
  };

  const handleModalOk = () => {
    if (editor) {
      editor.submitText = modalInput;
    }
    setIsModalVisible(false);
  };

  return (
    <NodeViewWrapper>
      <div className="content" contentEditable="true" suppressContentEditableWarning>
        <div contentEditable="true">
          <CheckboxComponent
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
          />
        </div>
        <NodeViewContent />
      </div>
      <span style={{ margin: '0 8px' }}>Score:</span>
      <Input
        type="number"
        value={score}
        onChange={(e) => handleScoreChange(e.target.value)}
        style={{ width: '60px' }}
      />
      <Button type="primary" shape="circle" icon="+" onClick={() => setIsModalVisible(true)} style={{ marginLeft: '8px' }} />
      
      <Modal
        title="Please add summary text of the score:"
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <TextArea
          value={modalInput}
          onChange={(e) => setModalInput(e.target.value)}
          placeholder="Score summary description:"
        />
      </Modal>
    </NodeViewWrapper>
  );
};

export default CheckboxScore;
