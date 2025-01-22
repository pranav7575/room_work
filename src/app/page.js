'use client';

import React, { useState, useEffect } from "react";
import Image from "next/image";

const CircularTaskRotation = () => {
  const [containerSize, setContainerSize] = useState(600);
  const names = ["Om", "Pranav", "Heramb", "Kunal", "Vedant"];
  const tasks = ["Trash","Bathroom", "WC ","No Task", "Basin"];
  const img = ["/om.png", "/pranav123.jpg", "/heramb1.jpg", "/kunal1.jpg", "/vedant.jpg"];

  useEffect(() => {
    const updateSize = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      
      // Calculate the container size based on screen dimensions
      let size;
      if (vw < 640) { // sm breakpoint
        size = Math.min(vw * 0.9, vh * 0.6);
      } else {
        size = Math.min(600, Math.min(vw * 0.8, vh * 0.8));
      }
      setContainerSize(size);
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  function getWeekNumber() {
    const now = new Date();
   // const now = new Date("2025-02-3");
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    console.log(now);
    const pastDaysOfYear = (now - startOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + startOfYear.getDay() + 1) / 7);
  }

  const currentWeek = getWeekNumber();
  const rotatedTasks = tasks.map((_, i) => {
    // Reverse logic: subtract the index, add currentWeek for weekly rotation
    const reverseIndex = (tasks.length - i + currentWeek) % tasks.length;
    return tasks[reverseIndex];
  });
  
  const getPosition = (index, total, radius) => {
    const angle = (index * 2 * Math.PI) / total - Math.PI / 2;
    return {
      x: radius * Math.cos(angle),
      y: radius * Math.sin(angle),
    };
  };

  // Calculate dimensions based on container size
  const centerX = containerSize / 2;
  const centerY = containerSize / 2;
  const radius = containerSize * 0.4; // Adjust radius for better spacing
  const centerCircleSize = containerSize * 0.2;
  const avatarSize = containerSize * 0.08;
  const cardMinWidth = containerSize * 0.25;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-br from-blue-100 via-purple-50 to-blue-50">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-12 text-blue-600 drop-shadow-md text-center">
        Weekly Task Rotation
      </h1>

      <div className="relative" style={{ width: containerSize, height: containerSize }}>
        {/* Center circle */}
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-xl"
          style={{ width: centerCircleSize, height: centerCircleSize }}
        >
          <div className="text-center">
            <div className="text-white font-bold text-base sm:text-xl">Week</div>
            <div className="text-white font-bold text-lg sm:text-2xl">{currentWeek}</div>
          </div>
        </div>

        {/* Task-name pairs in circular arrangement */}
        {names.map((name, index) => {
          const position = getPosition(index, names.length, radius);

          return (
            <div
              key={name}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl p-3 sm:p-4 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 border border-blue-100"
              style={{
                left: `${centerX + position.x}px`,
                top: `${centerY + position.y}px`,
                minWidth: `${cardMinWidth}px`,
                maxWidth: '150px'
              }}
            >
              <div className="text-center">
                <div 
                  className="mb-2 sm:mb-3 relative mx-auto ring-4 ring-blue-100 rounded-full overflow-hidden"
                  style={{ width: avatarSize, height: avatarSize }}
                >
                  <Image
                    src={img[index]}
                    fill
                    style={{ objectFit: "cover" }}
                    alt={`Avatar of ${name}`}
                    className="rounded-full hover:opacity-90 transition-opacity"
                    priority
                  />
                </div>
                <div className="font-bold text-xs sm:text-sm md:text-base text-blue-600 mb-1">
                  {name}
                </div>
                <div className="text-xs sm:text-sm font-medium px-2 py-1 bg-blue-50 rounded-full text-blue-600">
                  {rotatedTasks[index]}
                </div>
              </div>
            </div>
          );
        })}

        {/* Connecting lines */}
        <svg className="absolute top-0 left-0 w-full h-full -z-10">
          {names.map((_, index) => {
            const position = getPosition(index, names.length, radius);
            return (
              <line
                key={`line-${index}`}
                x1={centerX}
                y1={centerY}
                x2={centerX + position.x}
                y2={centerY + position.y}
                stroke="rgba(219, 234, 254, 0.8)"
                strokeWidth="2"
                strokeDasharray="4"
              />
            );
          })}
        </svg>
      </div>
    </div>
  );
};

export default CircularTaskRotation