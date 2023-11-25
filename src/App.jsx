import { Div, GlobalStyle } from 'GlobalStyle';
import { Button } from 'components/Button/Button';
import { ImageGallery } from 'components/ImageGallery';
import { Loader } from 'components/Loader';
import Modal from 'components/Modal';
import { notifiToast } from 'components/Notification/notifiToast';
import Searchbar from 'components/Searchbar';
import { getImageGallery } from 'myApi/api';
import { Component } from 'react';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {
  state = {
    page: 1,
    gallery: [],
    search: '',
    isLoading: false,
    error: '',
    totalHits: 0,
    hitsGalery: 0,
    showModal: false,
    currentImageUrl: null,
    currentImageDescription: null,
  };

  componentDidUpdate(_, prevState) {
    const { page} = this.state;
    if (prevState.page !== page && page !== 1) {
      this.showPictures(this.state.search, this.state.page, true);
    }
  }
  nextPage = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };
  toggleModal = () => {   
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };


  openModal = e => {   
    const currentImageUrl = e.target.dataset.large;
    const currentImageDescription = e.target.alt;

    if (e.target.tagName === 'IMG') {     
      this.setState(({ showModal }) => ({
        showModal: !showModal,
        currentImageUrl: currentImageUrl,
        currentImageDescription: currentImageDescription,
      }));
    }
  };

  showPictures = async (search, page, check) => {
    try {
      this.setState({ isLoading: true });

      const data = await getImageGallery(search, page);
      if (check) {
        this.setState({ gallery: [...this.state.gallery, ...data.hits] });
      } else {
        this.setState({ gallery: data.hits });
      }
      this.setState({
        search,
        error: '',
        isLoading: false,
        totalHits: data.totalHits,
        hitsGalery: this.state.gallery.length + data.hits.length,
      });
      if(data.hits.length === 0){       
        notifiToast('Oops no pictures found', "info")
      }
    } catch (error) {
      this.setState({ error: error.code, isLoading: false });
      notifiToast(error.code)
    }
  };

  render() {
    
    const {
      isLoading,
      error,
      gallery,
      totalHits,
      hitsGalery,
      showModal,
      currentImageUrl,
      currentImageDescription,
    } = this.state;
    return (
      <Div>
         
        <Searchbar onSubmit={this.showPictures} />
        {isLoading && <Loader />}
        {error &&   <ToastContainer/>}
        <ImageGallery gallery={gallery} openModal={this.openModal} />
        <GlobalStyle />
        {gallery.length >= 12 && hitsGalery < totalHits && (
          <Button nextPage={this.nextPage} />
        )}
        {showModal && (
          <Modal
            onClose={this.toggleModal}
            currentImageUrl={currentImageUrl}
            currentImageDescription={currentImageDescription}
          />
        )}
        <ToastContainer/>
      </Div>
    );
  }
}
