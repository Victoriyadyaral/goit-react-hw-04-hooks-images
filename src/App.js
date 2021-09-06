import './App.css';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
 
import 'react-toastify/dist/ReactToastify.css';

import Container from './components/container/Container';
import Searchbar from './components/searchbar/Searchbar';
import ImagesInfo from './components/imagesInfo/ImagesInfo';

export default function App () {
  const [requestTerm, setRequestTerm] = useState('')
  const [initialImages, setImages] = useState([]);
  const [initialPage, setPage] = useState(1);

  const handleFormSubmit = (newTerm) => {
    if (newTerm === requestTerm) {
      return;
    }
      setRequestTerm(newTerm);
      setImages([]);
      setPage(1);
  }; 

    return (
      <Container>
        <Searchbar onSubmit={handleFormSubmit} />
        <ImagesInfo
          requestTerm={requestTerm}
          initialImages={initialImages}
          initialPage={initialPage}
        />
         <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          />
      </Container>
    );
}