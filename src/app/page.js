'use client';

import React from "react";
import Image from "next/image";

const CircularTaskRotation = () => {
  const names = ["Om", "Pranav", "Heramb", "Kunal", "Vedant"];
  const tasks = ["No Task", "WC", "Bathroom", "Trash", "Basin"];
  const img = ["/avatar.png", "/pranav123.jpg", "/avatar.png", "/kunal1.jpg", "/vedant.jpg"];

  function getWeekNumber() {
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const pastDaysOfYear = (now - startOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + startOfYear.getDay() + 1) / 7);
  }

  const currentWeek = getWeekNumber();
  const rotatedTasks = tasks.map((_, i) => tasks[(i + currentWeek) % tasks.length]);

  const getPosition = (index, total, radius) => {
    const angle = (index * 2 * Math.PI) / total - Math.PI / 2;
    return {
      x: radius * Math.cos(angle),
      y: radius * Math.sin(angle),
    };
  };

  return (
    <div className="flex flex-col items-center p-8 min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-blue-50">
      <h1 className="text-4xl font-bold mb-12 text-blue-600 drop-shadow-md">
        Weekly Task Rotation
      </h1>

      <div className="relative w-[600px] h-[600px]">
        {/* Center circle */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-xl">
          <div className="text-center">
            <div className="text-white font-bold text-2xl">Week</div>
            <div className="text-white font-bold text-3xl">{currentWeek}</div>
          </div>
        </div>

        {/* Task-name pairs in circular arrangement */}
        {names.map((name, index) => {
          const position = getPosition(index, names.length, 240);
          const centerX = 300; // Half of w-[600px]
          const centerY = 300; // Half of h-[600px]

          return (
            <div
              key={name}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 border border-blue-100"
              style={{
                left: `${centerX + position.x}px`,
                top: `${centerY + position.y}px`,
                minWidth: "140px",
              }}
            >
              <div className="text-center">
                <div className="mb-3 relative w-16 h-16 mx-auto ring-4 ring-blue-100 rounded-full overflow-hidden">
                  <Image
                    src={img[index]}
                    fill
                    style={{ objectFit: "cover" }}
                    alt={`Avatar of ${name}`}
                    className="rounded-full hover:opacity-90 transition-opacity"
                    priority
                  />
                </div>
                <div className="font-bold text-lg text-blue-600 mb-1">{name}</div>
                <div className="text-sm font-medium px-3 py-1 bg-blue-50 rounded-full text-blue-600">
                  {rotatedTasks[index]}
                </div>
              </div>
            </div>
          );
        })}

        {/* Connecting lines */}
        <svg className="absolute top-0 left-0 w-full h-full -z-10">
          {names.map((_, index) => {
            const position = getPosition(index, names.length, 240);
            const centerX = 300;
            const centerY = 300;
            return (
              <line
                key={`line-${index}`}
                x1={centerX}
                y1={centerY}
                x2={centerX + position.x}
                y2={centerY + position.y}
                stroke="rgba(219, 234, 254, 0.8)"
                strokeWidth="3"
                strokeDasharray="4"
              />
            );
          })}
        </svg>
      </div>
    </div>
  );
};

export default CircularTaskRotation;