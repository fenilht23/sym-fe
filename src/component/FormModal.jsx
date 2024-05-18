import Modal from 'react-bootstrap/Modal';
import React, { useState, useMemo, useCallback } from 'react';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';

const FormModal = ({
  formInput,
  title,
  open,
  setOpen,
  optionDatas = [],
  onSubmit
}) => {
  const [formData, setFormData] = useState(() => {
    const initialData = {};
    formInput.forEach(input => {
      initialData[input.name] = input.value || '';
    });
    return initialData;
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setOpen(false);
  };

  const renderFormControl = useCallback((item) => {
    const commonProps = {
      name: item.name,
      value: formData[item.name] || '',
      placeholder: item.name,
      onChange: handleOnChange,
      required: item.required
    };

    if (item.type === "tel") {
      return (
        <Form.Control
          {...commonProps}
          type="tel"
          pattern={item.pattern}
        />
      );
    }

    if (item.type === "select") {
      return (
        <Form.Select {...commonProps}>
          {optionDatas.map(option => (
            <option key={option._id} value={option._id}>
              {option.name}
            </option>
          ))}
        </Form.Select>
      );
    }

    return (
      <Form.Control
        {...commonProps}
        type={item.type}
      />
    );
  }, [formData, optionDatas]);

  const formControls = useMemo(() => formInput.map(item => (
    <FloatingLabel
      key={item.name}
      controlId={`floatingInput-${item.name}`}
      label={item.label}
      className="mb-3"
    >
      {renderFormControl(item)}
    </FloatingLabel>
  )), [formInput, renderFormControl]);

  return (
    <Modal
      show={open}
      onHide={() => setOpen(!open)}
      backdrop="static"
      keyboard={false}
    >
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Add {title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {formControls}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setOpen(!open)}>
            Close
          </Button>
          <Button variant="primary" type="submit">Add</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

FormModal.propTypes = {
  formInput: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    value: PropTypes.string,
    min: PropTypes.number,
    max: PropTypes.number,
    required: PropTypes.bool,
    pattern: PropTypes.string // Added pattern prop type
  })).isRequired,
  title: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  optionDatas: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  })),
  onSubmit: PropTypes.func.isRequired
};

export default FormModal;
