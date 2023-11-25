import { ImageGalleryItem } from 'components/ImageGalleryItem';
import { Ul } from './ImageGallery.styled';

export const ImageGallery = ({ gallery, openModal}) => {
  return (
    <Ul>
      {gallery&&gallery.map(el => {     
        return (
          <ImageGalleryItem 
          key={el.id}
          alt={el.tags} 
          src={el.webformatURL}
          largeImageURL={el.largeImageURL}
          openModal={openModal}
          loading="lazy"
          />
        );
      })}
    </Ul>
  );
};
