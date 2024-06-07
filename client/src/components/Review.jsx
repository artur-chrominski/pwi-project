import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styles from "../style";
import { form } from "../assets";

const Review = () => {
    const { t } = useTranslation();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [reviews, setReviews] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');

    const fetchReviews = async () => {
        try {
            const response = await fetch('https://pwi-project-server.vercel.app/api/reviews');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const reviewsList = await response.json();
            setReviews(reviewsList);
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://pwi-project-server.vercel.app/api/reviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, message }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            setName('');
            setEmail('');
            setMessage('');
            setSuccessMessage(t('Review.review_added_successfully'));

            fetchReviews();
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };


    return (
        <section id="reviews" className={`flex flex-col ${styles.paddingY}`}>
            <div className="my-8 lg:my-12">
                <div>
                    <h2 className="text-white text-center text-5xl mb-12">{t('Review.reviews')}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:px-8">
                        {reviews.length > 0 ? (
                            reviews.map((review, index) => (
                                <div
                                    key={index}
                                    className="p-6 rounded-lg shadow-md bg-yellow-gradient hover:bg-gradient-to-l hover:from-yellow-600 hover:via-yellow-500 hover:to-yellow-400 transition-all duration-300 transform hover:scale-105 hover:shadow-xl min-h-[220px]"
                                >
                                    <p className="text-black text-lg mb-4">{review.message}</p>
                                    <p className="text-black text-lg"><strong>{t('Review.name')}:</strong> {review.name}</p>
                                    <p className="text-black text-lg"><strong>{t('Review.email')}:</strong> {review.email}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-white text-center text-2xl">{t('Review.no_reviews_yet')}</p>
                        )}
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 sm:px-8">
                    <div className="rounded-[32px] shadow-md">
                        <img
                            src={form}
                            alt="billing"
                            className="w-full h-full object-cover object-top border-yellow-500"
                        />
                    </div>

                    <div className="rounded-lg shadow-md p-6 bg-white-gradient">
                        <form onSubmit={handleSubmit} className="mb-6">
                            <div className="mb-6">
                                <label htmlFor="name" className="block text-black text-lg mb-2">{t('Review.name')}</label>
                                <input
                                    type="text"
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className="w-full p-4 rounded-lg bg-black text-white"
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="email" className="block text-black text-lg mb-2">{t('Review.email')}</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full p-4 rounded-lg bg-black text-white"
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="message" className="block text-black text-lg mb-2">{t('Review.message')}</label>
                                <textarea
                                    id="message"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    required
                                    className="w-full p-4 rounded-lg bg-black text-white"
                                />
                            </div>
                            <button type="submit" className="bg-secondary text-white p-4 px-8 rounded-lg hover:bg-yellow-300 transition-colors duration-300">{t('Review.submit')}</button>
                        </form>
                        {successMessage && (
                            <p className="text-green-500 text-lg mt-4">{successMessage}</p>
                        )}
                    </div>
                </div>
            </div>
        </section>

    );
};

export default Review;
