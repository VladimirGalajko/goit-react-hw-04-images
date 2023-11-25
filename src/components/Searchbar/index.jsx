import { Component } from 'react';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Button, Form, Header, Input, Span } from './Searchbar.styled';
import { notifiToast } from 'components/Notification/notifiToast';

class Searchbar extends Component {
  state = {
    search: '',
  };
  handleChange = ({ target: { value } }) => {
    this.setState({ search: value });
  };

  handleSubmit = e => {
    const { search } = this.state;
    e.preventDefault();
    if (search.trim() === '') {
      notifiToast('Please enter text');
      return;
    }

    this.props.onSubmit(this.state);
    this.setState({ search: '' });
  };
  render() {
    const { search } = this.state;
    return (
      <Header>
        <Form onSubmit={this.handleSubmit}>
          <Button type="submit">
            <Span>🔍</Span>
          </Button>

          <Input
            id="inputSearch"
            name="search"
            value={search}
            type="text"
            placeholder="Search images and photos"
            onChange={this.handleChange}
          />
        </Form>
        <ToastContainer />
      </Header>
    );
  }
}
export default Searchbar;
