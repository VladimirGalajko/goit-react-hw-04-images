import { Clickclose,  ModalContent } from './Modal.styled';
import { Component } from 'react';




class Modal extends Component {


  componentDidMount() {
    document.addEventListener('keydown', this.handleEsc)
  }
  handleEsc = (e) => {
    e.code === 'Escape' && this.props.onClose()
    console.log(this.props)    
  }
  componentWillUnmount() {
		document.removeEventListener('keydown', this.handleEsc)
	}

  render() {
    const { onClose, currentImageUrl, currentImageDescription } = this.props;

    return (
      <Clickclose onClick={onClose} onClose={onClose}>
        <ModalContent>
          <img src={currentImageUrl} alt={currentImageDescription} />
        </ModalContent>
      </Clickclose>
    );
  }
}
export default Modal;
