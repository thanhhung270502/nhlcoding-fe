import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Button, OverlayTrigger, Popover } from 'react-bootstrap';

const Help = ({ content }) => {
    const [showPopover, setShowPopover] = useState(false);

    const handlePopoverClick = () => {
        setShowPopover(!showPopover);
    };

    const popover = (
        <Popover>
            <Popover.Body>
                <div>
                    <p>{content}</p>
                </div>
            </Popover.Body>
        </Popover>
    );

    return (
        <div className="d-flex align-items-center">
            <OverlayTrigger
                trigger="focus"
                placement="right"
                show={showPopover}
                onToggle={handlePopoverClick}
                overlay={popover}
            >
                <Button variant="link" className="d-flex align-items-center p-0 mb-3" role="button">
                    <FontAwesomeIcon icon={faCircleQuestion} color="var(--orange-light)" />
                </Button>
            </OverlayTrigger>
        </div>
    );
};

export default Help;
