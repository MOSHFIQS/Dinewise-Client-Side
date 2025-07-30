import { useEffect, useState } from 'react';
import ReactStars from 'react-rating-stars-component';
import SectionTitle from '../../../components/sectionTitle/SectionTitle';

const Testimonials = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch('/reviews.json')
            .then(res => res.json())
            .then(data => setReviews(data));
    }, []);

    return (
        <section className="bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-20 px-6">
            <div className="max-w-7xl mx-auto ">
               <div className='text-center'>
                    <SectionTitle Heading={'What Our Clients Say'} subHeading={' Real stories from our satisfied customers.'}/>
               </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {reviews.map((review, index) => (
                        <div
                            key={index}
                            className="bg-white dark:bg-gray-900 p-8 rounded  border border-gray-100 dark:border-gray-700 hover:shadow transition duration-300"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center text-lg font-bold shadow-inner">
                                    {review.name?.charAt(0)}
                                </div>
                                <div className="text-left">
                                    <h4 className="text-lg font-semibold text-gray-800 dark:text-yellow-400">
                                        {review.name}
                                    </h4>
                                    <ReactStars
                                        count={5}
                                        value={review.rating}
                                        size={18}
                                        edit={false}
                                        isHalf={true}
                                        activeColor="#facc15"
                                    />
                                </div>
                            </div>

                            <p className="text-gray-700 dark:text-gray-300  text-sm leading-relaxed">
                                “{review.details}”
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
