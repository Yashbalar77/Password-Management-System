import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-slate-800 text-white">
      <div className="mycontainer flex justify-between items-center px-4 py-5 h-14">
        <div className="logo font-bold text-white text-2xl">
          <span className="text-green-500"> &lt;</span>
          Pass
          <span className="text-green-500">Key/&gt;</span>
        </div>
        <ul>
          <li className="flex gap-4">
            
          </li>
        </ul>
        <div className="text-white gap-4 justify-center items-center">
          <img className="p-5 w-20 cursor-pointer rounded-full justify-between ring-white right-1" src="/icons/git.png" alt="github"></img>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
