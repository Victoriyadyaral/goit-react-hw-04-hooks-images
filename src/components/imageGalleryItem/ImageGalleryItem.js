import  { useState } from 'react';
import PropTypes from 'prop-types';
import { FaRegThumbsUp, FaRegEye, FaRegCommentDots } from 'react-icons/fa';

import Modal from '../modal/Modal';

import s from './ImageGalleryItem.module.css';

function ImageGalleryItem ({webformatURL, tags, largeImageURL, likes, views, comments }) {

  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
 };

        return (
          <li className={s.galleryItem}>
            <div className={s.photoCard}>
              <img
                className={s.galleryImg}
                src={webformatURL}
                alt={tags}
                onClick={toggleModal}
              />
              <div className={s.stats}>
                        <p className={s.statsItem}>
                            <FaRegThumbsUp style={{ marginRight: 8 }} />
                            <span className={s.statsNumber}>{likes}</span>
                        </p>
                        <p className={s.statsItem}>
                            <FaRegEye style={{ marginRight: 8 }} />
                            <span className={s.statsNumber}>{views}</span>
                        </p>
                        <p className={s.statsItem}>
                            <FaRegCommentDots style={{ marginRight: 8 }} />
                            <span className={s.statsNumber}>{comments}</span>
                        </p>
                    </div>
                </div>
        {showModal && (
          <Modal onClose={toggleModal} src={largeImageURL} alt={tags} />
        )}
            </li>
        );
}

ImageGalleryItem.propTypes = {
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string,
};

export default ImageGalleryItem;