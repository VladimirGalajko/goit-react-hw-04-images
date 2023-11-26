import { useState } from 'react';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getImageGallery } from 'myApi/api';
import { Div, GlobalStyle } from 'GlobalStyle';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader';
import { notifiToast } from 'components/Notification/notifiToast';
import { ImageGallery } from 'components/ImageGallery';
import Modal from 'components/Modal';
import Searchbar from 'components/Searchbar';

const App = () => {
  const [page, setPage] = useState(1);
  const [gallery, setGallery] = useState([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [totalHits, setTotalHits] = useState(0);
  const [hitsGalery, setHitsGalery] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [currentImageUrl, setCurrentImageUrl] = useState(null);
  const [currentImageDescription, setCurrentImageDescription] = useState(null);

  const nextPage = () => {
    setPage(prevPage => prevPage + 1);
  };
  const toggleModal = () => {
    setShowModal(prevShowModal => !prevShowModal);
  };

  const openModal = e => {
    const currentImageUrl = e.target.dataset.full;
    const currentImageDescription = e.target.alt;

    if (e.target.tagName === 'IMG') {
      setShowModal(prevShowModal => !prevShowModal);
      setCurrentImageUrl(currentImageUrl);
      setCurrentImageDescription(currentImageDescription);
    }
  };

  useEffect(() => {
    if (!search) return;
    const showPictures = async () => {
      try {
        setIsLoading(true);
        const data = await getImageGallery(search, page);
        setGallery(prevData => [...prevData, ...data.hits]);
        setTotalHits(data.totalHits);
        setHitsGalery(prevHitsGalery => prevHitsGalery + data.hits.length);
        if (data.hits.length === 0) {
          notifiToast('Oops no pictures found', 'info');
        }
      } catch (error) {
        setError(error.code);      
        notifiToast(error.code);
      } finally {
        setIsLoading(false);
      }
    };

    showPictures();
  }, [search, page]);

  const onSubmit = search => {
    setGallery([]);
    setSearch(search.trim());
    setPage(1);
  };

  return (
    <Div>
      <Searchbar onSubmit={onSubmit} />
      {isLoading && <Loader />}
      {error && <ToastContainer />}
      <ImageGallery gallery={gallery} openModal={openModal} />
      <GlobalStyle />
      {gallery.length >= 12 && hitsGalery < totalHits && (
        <Button nextPage={nextPage} />
      )}
      {showModal && (
        <Modal
          onClose={toggleModal}
          currentImageUrl={currentImageUrl}
          currentImageDescription={currentImageDescription}
        />
      )}
      <ToastContainer />
    </Div>
  );
};

export default App;
