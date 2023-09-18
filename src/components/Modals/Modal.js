import React, { useRef, useState } from 'react';
import { Modal } from 'react-bootstrap';

const CustomModal = React.memo((props) => {
    const [state, setState] = useState({ show: false });

    const onClose = () => {
        if (props.onClose) {
            props.onClose();
        }
    };

    const onOpen = () => {
        if (props.onOpen) {
            props.onOpen();
        }
    };

    const open = () => {
        setState((prev) => ({ ...prev, show: true }));
    };

    const close = () => {
        setState((prev) => ({ ...prev, show: false }));
    };

    const toggle = () => {
        setState((prev) => ({ ...prev, show: !prev.show }));
    };

    if (props.register) {
        props.register.open = open;
        props.register.close = close;
        props.register.toggle = toggle;
    }

    return (
        <Modal
            {...props}
            centered
            show={state.show}
            onHide={() => {
                onClose();
                close();
            }}
            onShow={() => {
                onOpen();
                open();
            }}
        >
            {props.children}
        </Modal>
    );
});

export const useModal = () => {
    const modal = useRef({
        open: () => {},
        close: () => {},
        toggle: () => {},
    });

    return modal.current;
};

export default CustomModal;
