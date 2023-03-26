import React from "react";
import random from "random";

const Avatar = ({ userId, username }) => {
  const colors = [
    "bg-red-200",
    "bg-green-200",
    "bg-purple-200",
    "bg-blue-200",
    "bg-yellow-200",
    "bg-teal-200",
  ];
  const userIdBase10 = parseInt(userId, 18);
  const colorIndex = userIdBase10 % colors.length;
  const color = colors[colorIndex];
  // const color = colors[random.int(0, 5)];
  console.log(color);

  return (
    <div className={`w-8 h-8  rounded-full flex items-center ` + color}>
      <div className="text-center w-full  ">{username[0]}</div>
    </div>
  );
};

export default Avatar;
