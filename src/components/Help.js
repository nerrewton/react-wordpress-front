import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import config from "../config/configuration.json"

const Help = (props) => {
    const [showModal, setShowModal] = useState(false);

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);
    const handleClickWhatsApp = () => {
        window.location.href = config.whatsapp_link;
    }

    return (
        <>
            <span className="btn-ayuda" onClick={() => handleShowModal()}>
                Ayuda <FontAwesomeIcon icon={faQuestionCircle} />
            </span>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton className="modal-header-custom">
                    <Modal.Title><strong>Ayuda</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className="pb-3">
                        Si tuviste algún problema usando nuestro portal o tienes alguna pregunta, por favor
                        usa los siguientes canales para comunicarte con nosotros:
                    </p>                    
                    <span className="help-item-whatsapp" onClick={()=>handleClickWhatsApp()}><strong>WhatsApp</strong>: +57 301 651 0923</span>
                    <span className="help-item-email"><strong>Email</strong>: nerrechiboy@gmail.com</span>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default Help;
