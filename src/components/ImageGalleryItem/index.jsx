import { Img, Li } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ src, alt, largeImageURL, openModal }) => {
  return (
    <Li onClick={openModal}>
      <Img
        src={src}
        alt={alt}       
        data-full={largeImageURL}
      />
    </Li>
  );
};
