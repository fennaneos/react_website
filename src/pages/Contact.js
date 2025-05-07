import React from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <div className="bg-gradient-to-b from-gray-900 to-black text-white h-screen flex flex-col justify-center items-center">
      <motion.h1
        className="text-4xl font-bold mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Contact Me
      </motion.h1>
      <form className="w-full max-w-md space-y-6">
        <input
          type="text"
          placeholder="Your Name"
          className="w-full px-4 py-2 bg-gray-800 rounded-md focus:outline-none"
        />
        <input
          type="email"
          placeholder="Your Email"
          className="w-full px-4 py-2 bg-gray-800 rounded-md focus:outline-none"
        />
        <textarea
          placeholder="Your Message"
          className="w-full px-4 py-2 bg-gray-800 rounded-md focus:outline-none"
          rows="4"
        ></textarea>
        <button
          type="submit"
          className="w-full py-2 bg-cyan-500 hover:bg-cyan-700 rounded-md text-white font-semibold"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;
