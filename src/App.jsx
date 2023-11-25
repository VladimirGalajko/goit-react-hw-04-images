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
    if (page !== 1) {
      showPictures(search, page, true);
    }
  }, [page, search]);

  const showPictures = async (search, page, check) => {
    try {
      setIsLoading(true);
      const data = await getImageGallery(search, page);

      if (check) {
        setGallery(prevGallery => [...prevGallery, ...data.hits]);
      } else {
        setGallery(data.hits);
      }

      setError('');
      setSearch(search);
      setIsLoading(false);
      setTotalHits(data.totalHits);
      setHitsGalery(prevHitsGalery => prevHitsGalery + data.hits.length);

      if (data.hits.length === 0) {
        notifiToast('Oops no pictures found', 'info');
      }
    } catch (error) {
      setError(error.code);
      setIsLoading(false);
      notifiToast(error.code);
    }
  };

  return (
    <Div>
      <Searchbar onSubmit={showPictures} />
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
