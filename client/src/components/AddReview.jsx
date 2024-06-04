import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, getDocs, query, orderBy } from 'firebase/firestore';
import { useTranslation } from 'react-i18next';

const AddReview = () => {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const q = query(collection(db, 'reviews'), orderBy('timestamp', 'desc'));
        const querySnapshot = await getDocs(q);
        const reviewsList = querySnapshot.docs.map(doc => doc.data());
        setReviews(reviewsList);
      } catch (error) {
        console.error('Error fetching reviews: ', error);
      }
    };

    fetchReviews();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, 'reviews'), {
        name,
        email,
        message,
        timestamp: new Date()
      });

      setName('');
      setEmail('');
      setMessage('');
      alert(t('addReview.review_added_successfully'));

      const q = query(collection(db, 'reviews'), orderBy('timestamp', 'desc'));
      const querySnapshot = await getDocs(q);
      const reviewsList = querySnapshot.docs.map(doc => doc.data());
      setReviews(reviewsList);
    } catch (error) {
      console.error('Bład: ', error);
    }
  };
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <label htmlFor="name" className="block text-black mb-2">{t('addReview.name')}</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-2 border border-black rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-black mb-2">{t('addReview.email')}</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border border-black rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block text-black mb-2">{t('addReview.message')}</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            className="w-full p-2 border border-black rounded"
          />
        </div>
        <button type="submit" className="bg-black text-white p-2 rounded">{t('addReview.submit')}</button>
      </form>

      <div>
        <h2 className="text-black text-lg mb-4">{t('addReview.reviews')}</h2>
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={index} className="mb-4 p-4 bg-gray-100 rounded shadow-sm">
              <p className="text-black"><strong>{t('addReview.name')}:</strong> {review.name}</p>
              <p className="text-black"><strong>{t('addReview.email')}:</strong> {review.email}</p>
              <p className="text-black"><strong>{t('addReview.message')}:</strong> {review.message}</p>
              <p className="text-gray-500 text-sm"><small>{new Date(review.timestamp.seconds * 1000).toLocaleString()}</small></p>
            </div>
          ))
        ) : (
          <p className="text-black">{t('addReview.no_reviews_yet')}</p>
        )}
      </div>
    </div>
  );
};

export default AddReview;
