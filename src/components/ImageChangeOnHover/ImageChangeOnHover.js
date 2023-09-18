import React, { useState } from 'react';

const ImageChangeOnHover = ({ defaultSrc, hoverSrc }) => {
    const [src, setSrc] = useState(defaultSrc);

    const handleMouseOver = () => {
        setSrc(hoverSrc);
    };

    const handleMouseOut = () => {
        setSrc(defaultSrc);
    };

    return (
        <img className="cursor-pointer" src={src} alt="..." onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} />
    );
};

export default ImageChangeOnHover;
