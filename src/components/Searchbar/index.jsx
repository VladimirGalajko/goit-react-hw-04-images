import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Form, Header, Input, Span } from './Searchbar.styled';
import { notifiToast } from 'components/Notification/notifiToast';
import { useState } from 'react';

const Searchbar = ({ onSubmit }) => {
  const [search, setSearch] = useState('');
  const handleChange = ({ target: { value } }) => {
    setSearch(value);
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (search.trim() === '') {
      notifiToast('Please enter text');
      return;
    }

    onSubmit(search, 1);
    setSearch('');
  };
  return (
    <Header>
      <Form onSubmit={handleSubmit}>
        <Button type="submit">
          <Span>🔍</Span>
        </Button>

        <Input
          id="inputSearch"
          name="search"
          value={search}
          type="text"
          placeholder="Search images and photos"
          onChange={handleChange}
        />
      </Form>
      <ToastContainer />
    </Header>
  );
};
export default Searchbar;
