import React from "react";
import "./ImageGallery.css";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";

const ImageGallery = ({ galleryItems, showImage }) => {
  return (
    <ul className="ImageGallery">
      {galleryItems.map((image) => (
        <ImageGalleryItem
          key={image.imageId}
          smallImageUrl={image.smallImageUrl}
          bigImageUrl={image.bigImageUrl}
          imageAlt={image.imageAlt}
          openModal={showImage}
        />
      ))}
    </ul>
  );
};

export default ImageGallery;
