import React from "react";
import "./ImageGalleryItem.css";

const ImageGalleryItem = ({
  smallImageUrl,
  bigImageUrl,
  imageAlt,
  openModal,
}) => {
  return (
    <li className="ImageGalleryItem">
      <img
        onClick={openModal}
        data-big={bigImageUrl}
        src={smallImageUrl}
        alt={imageAlt}
        className="ImageGalleryItem-image"
      />
    </li>
  );
};

export default ImageGalleryItem;
