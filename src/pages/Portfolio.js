import React from 'react';
import { motion } from 'framer-motion';

const Portfolio = () => {
  const projects = [
    { title: 'Crypto Trends', description: 'Real-time crypto price analysis and heat maps.' },
    { title: 'Market Forecaster', description: 'ML-based financial prediction engine.' },
    { title: 'DataViz Pro', description: 'Interactive 3D data visualization toolkit.' },
  ];

  return (
    <div className="bg-black text-white min-h-screen py-12 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">My Projects</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <h2 className="text-xl font-semibold text-aqua mb-2">{project.title}</h2>
            <p>{project.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;