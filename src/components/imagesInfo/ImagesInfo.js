import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { toast } from "react-toastify";

import ImageGallery from '../imageGallery/ImageGallery';
import ImageErrorView from '../imageErrorView/ImageErrorView';
import ImagePendingView from '../imagePendingView/ImagePendingView';
import Button from '../button/Button';

import findImagesAPI from '../../services/findImages-api';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

function ImagesInfo ({requestTerm, initialImages, initialPage}) {

  const [images, setImages] = useState(initialImages ?? []);
  const [page, setPage] = useState(initialPage ?? 1);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);

  const findImages = (term, requestPage, images) => {
    setStatus(Status.PENDING);
    findImagesAPI
      .fetchImage(term, requestPage)
      .then(response => {
        if (response.total > 0 && requestPage === 1) {
        toast.info('Your images found. Have a nice viewing!')
      } else
      if (response.total === 0) {
        setStatus(Status.IDLE);
        toast.error('No image has been found. Please enter your request again!');  
      }
        setImages([...images,...response.hits]);
        setStatus(Status.RESOLVED);
      }
      )
      .catch(error => {
        setError(error);
        setStatus(Status.REJECTED);
      })
      .finally(() => setStatus(Status.RESOLVED));
  };

  const changePage = () => {
    setPage(p => p + 1);
    findImages(requestTerm, page, images);
  };

  useEffect(() => {
    if (!requestTerm) {
      return;
  };
  
  findImages(requestTerm, initialPage, initialImages);
  setPage(2);
   // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestTerm]);

    if (status === 'idle') {
      return <div> <h2>What images or photos are you looking for?</h2></div>;
    }

    if (status === 'pending') {
        return  <ImagePendingView />;
    }

    if (status === 'rejected') {
      return <ImageErrorView message={error.message} />;
    }

    if (status === 'resolved') {
      return (
        <>
        <ImageGallery images={images} />
        {images.length >11 && (
          <Button onClick={changePage} />
        )}
        </>
      )}
};

ImagesInfo.propTypes = {
    requestTerm: PropTypes.string.isRequired,
    initialPage: PropTypes.number.isRequired,
    initialImages: PropTypes.array.isRequired,
  };

export default ImagesInfo;