import React, { Fragment } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import useToggle from "./useToggle";

const ModalWrapper = ({ title, render, children, onExit }) => {
  const { isOpen, show, hide, toggle } = useToggle(false);
  return (
    <Fragment>
      <Modal isOpen={isOpen} toggle={toggle} onExit={onExit}>
        {title && <ModalHeader toggle={toggle}>{title}</ModalHeader>}
        <ModalBody>{render({ hide })}</ModalBody>
      </Modal>
      {children({ show: show })}
    </Fragment>
  );
};

ModalWrapper.defaultProps = {
  onExit: () => {}
};

export default ModalWrapper;
