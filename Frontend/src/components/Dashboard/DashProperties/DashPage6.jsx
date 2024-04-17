import React, { useState } from 'react';
import { IoStarSharp } from 'react-icons/io5';

const DashPage6 = () => {
  const [userName, setUserName] = useState('John Doe');
  const [showUserName, setShowUserName] = useState(true);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [starClicks, setStarClicks] = useState(Array(5).fill(false));

  const handleUserNameToggle = () => {
    setShowUserName(!showUserName);
    if (showUserName) {
      setUserName('Anonymous'); // Set to 'Anonymous' if toggled to hide
    } else {
      setUserName('John Doe'); // Set to default name if toggled to show
    }
  };

  const handleRatingChange = (value) => {
    const newStarClicks = starClicks.map((clicked, index) =>
      index < value ? true : false
    );
    setStarClicks(newStarClicks);
    setRating(value === rating ? 0 : value);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = () => {
    // Here you can implement your logic to submit the review to the database
    console.log('Rating:', rating);
    console.log('Number of Stars Clicked:', starClicks.filter(click => click).length);
    console.log('Comment:', comment);
    console.log('User:', showUserName ? userName : 'Anonymous');
    // Placeholder: Send the review to the database
    // Replace the following line with your actual database logic
    // Example: fetch('/api/reviews', { method: 'POST', body: JSON.stringify({ rating, comment, userName }) })

    const userToSend = showUserName ? userName : 'Anonymous'; // Determine the user to send based on showUserName

    // Placeholder: Send the review to the database
    // Replace the following line with your actual database logic
    // Example: fetch('/api/reviews', { method: 'POST', body: JSON.stringify({ rating, comment, userName: userToSend }) })

    // Show the message only if the user has entered a comment
    if (comment.trim() !== '') {
      setSubmitted(true);
      setRating(0);
      setComment('');
      setStarClicks(Array(5).fill(false));

      // Hide the message after 3 seconds
      setTimeout(() => {
        setSubmitted(false);
      }, 3000);
    }
  };

  return (
    <div className="flex flex-row justify-center items-center w-full">
      <div className="w-[650px] bg-white pl-8 pt-14 pr-8 rounded-lg shadow-lg shadow-[#0F6C96] sm-max:w-[400px] ">
        <h2 className="text-2xl font-semibold mb-10">Leave a Review</h2>
        <div className="mb-4 flex items-center">
          <button
            className={`text-sm text-white font-semi-bold py-1 px-3 rounded-md focus:outline-none focus:shadow-outline ${showUserName ? 'bg-gray-600' : 'bg-[#0F6C96]'}`}
            onClick={handleUserNameToggle}
          >
            {showUserName ? 'Hide name' : 'Show name'}
          </button>
        </div>
        {!showUserName && (
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-12 text-xl" htmlFor="userName">
              Anonymous
            </label>
          </div>
        )}
        {showUserName && (
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2 text-xl" htmlFor="userName">
              Name
            </label>
            <input
              type="text"
              id="userName"
              className="mb-4 appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={userName}
              readOnly
            />
          </div>
        )}
        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2 text-xl" htmlFor="rating">
            Rating
          </label>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((value, index) => (
              <IoStarSharp
                key={value}
                className={`mr-2 text-gray-400 cursor-pointer mb-2 text-[20px] ${
                  starClicks[index] ? 'text-yellow-400' : ''
                }`}
                onClick={() => handleRatingChange(value)}
              />
            ))}
          </div>
        </div>
        <div className="mb-7">
          <label className="block text-gray-700 font-bold mb-2 text-xl" htmlFor="comment">
            Comment
          </label>
          <textarea
            className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none"
            id="comment"
            rows="4"
            value={comment}
            onChange={handleCommentChange}
          ></textarea>
        </div>
        <div className="mb-4">
          <button
            className="bg-[#1289c0] hover:bg-[#4c9fc5] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleSubmit}
          >
            Submit Review
          </button>
        </div>
        {submitted && (
          <div className="text-green-600 text-xl">
            Thanks for your Review!
          </div>
        )}
      </div>
    </div>
  );
};

export default DashPage6;
