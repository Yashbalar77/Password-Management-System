import React from "react";

const Footer = () => {
  return (
    <div className="bg-slate-800 text-white flex flex-col justify-center items-center h-76 font-bold">
        <div className="logo font-bold text-white text-2xl">
          <span className="text-green-500"> &lt;</span>
          Pass
          <span className="text-green-500">Key/&gt;</span>
        </div>
      <div>Created with ❤️ by Yash Balar</div>
    </div>
  );
};

export default Footer;