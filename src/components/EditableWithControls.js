import React, { useState } from "react";
import {
  ButtonGroup,
  Editable,
  IconButton,
  EditablePreview,
  EditableInput,
  Flex
} from "@chakra-ui/react";
import { FaEdit, FaCheck, FaTimes } from "react-icons/fa";

export default function EditableWithControls({
  value,
  onChange,
  ...parentProps
}) {
  const [newValue, setNewValue] = useState("");

  function EditableControls({ isEditing, onSubmit, onCancel, onEdit }) {
    return isEditing ? (
      <ButtonGroup justifyContent="center" size="sm">
        <IconButton
          icon={<FaCheck />}
          onClick={() => {
            onSubmit();
            onChange(newValue);
          }}
        />
        <IconButton
          icon={<FaTimes />}
          onClick={() => {
            onCancel();
            setNewValue(value);
          }}
        />
      </ButtonGroup>
    ) : (
      <Flex justifyContent="center">
        <IconButton size="sm" icon={<FaEdit />} onClick={onEdit} />
      </Flex>
    );
  }

  return (
    <Editable
      textAlign="center"
      defaultValue={value}
      fontSize="2xl"
      isPreviewFocusable={false}
      submitOnBlur={false}
      {...parentProps}
    >
      {(props) => (
        <Flex align="center">
          <EditablePreview flex="1" textAlign="left" />
          <EditableInput
            flex="1"
            mr="3"
            textAlign="left"
            onChange={(e) => setNewValue(e.target.value)}
          />
          <EditableControls {...props} />
        </Flex>
      )}
    </Editable>
  );
}
