import React from "react";
import { useRef, useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  const copyText = (text) => {
    alert("Copied to clipboard" + text);
    navigator.clipboard.writeText(text);
  };

  const showPassword = () => {
    passwordRef.current.type = "text";
    console.log(ref.current.src);
    if (ref.current.src.includes("icons/crosseye1.png")) {
      ref.current.src = "icons/eye1.png";
      passwordRef.current.type = "text";
    } else {
      ref.current.src = "icons/crosseye1.png";
      passwordRef.current.type = "password";
    }
  };

  const savePassword = () => {
    if(form.site.length >3 && form.username.length >3 && form.password.length >3){
    setPasswordArray([...passwordArray, {...form, id: uuidv4()}]);
    localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form, id: uuidv4()}]));
    console.log(...passwordArray, form);
    setform({site: "", username: "", password: ""})
    }
    else{
        console.log("Error: password not saved")
    }
  };

  const deletePassword = (id) => {
    console.log("Deleting password with id", id)
    let c = confirm("Do you really want to delete this password?")
    if(c){
    setPasswordArray(passwordArray.filter(item=>item.id!==id));
    localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id!==id)));
    //alert("Your password is deleted successfully")
    //console.log(...passwordArray, form);
    }
  };
  

  const editPassword = (id) => {
    console.log("Editing password with id", id)
    setform(passwordArray.filter(i=>i.id===id)[0]);
    setPasswordArray(passwordArray.filter(item=>item.id!==id));
    //localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form, id: uuidv4()}]));
    //console.log(...passwordArray, form);
  };


  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div>
      </div>
      <div className="p-2 pt-3 md:p-0 md:mycontainer">
        <h1 className="text-4xl text font-bold text-center">
          <span className="text-green-500"> &lt;</span>
          <span>Pass</span>
          <span className="text-green-500">Key/&gt;</span>
        </h1>
        <p className="text-green-900 text-lg text-center">
          Your own Password Manager
        </p>
        <div className="flex flex-col p-4 text-black gap-8 items-center">
          <input
            value={form.site}
            onChange={handleChange}
            placeholder="Enter website URL"
            className="rounded-full border border-green-500 w-full p-4 py-1"
            type="text"
            name="site"
            id="site"
          />
          <div className="flex flex-col md:flex-row w-full justify-between gap-8">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter Username"
              className="rounded-full border border-green-500 w-full p-4 py-1"
              type="text"
              name="username"
              id="username"
            />
            <div className="relative">
              <input
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                placeholder="Enter Password"
                className="rounded-full border border-green-500 w-full p-4 py-1"
                type="password"
                name="password"
                id="password"
              />
              <span
                className="absolute right-3 bottom-2 cursor-pointer"
                onClick={showPassword}
              >
                <img ref={ref} src="icons/eye1.png" alt="" />
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="flex justify-center items-center gap-2 bg-green-500 hover:bg-green-300 rounded-full px-4 py-2 w-fit border-2 border-green-900"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Save Password
          </button>
        </div>
        <div className="passwords">
          <h2 className="font-bold text-2xl py-4">Your Passwords</h2>
          {passwordArray.length === 0 && <div>No passwords to show</div>}
          {passwordArray.length != 0 && (
            <table className="table-auto w-full rounded-md overflow-hidden">
              <thead className=" bg-green-800 text-white">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Passwords</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="text-center w-32 py-2 border border-white relative">
                        <a href={item.site} target="_blank">
                          {item.site}
                        </a>
                        <img
                          className="copyicon absolute right-0 top-1 py-1 my-2 px-4 cursor-pointer justify-center items-center"
                          src="/icons/copy.png"
                          alt="copy"
                          onClick={() => {
                            copyText(item.site);
                          }}
                        />
                      </td>
                      <td className="text-center w-32 py-2 border border-white relative">
                        {item.username}
                        <img
                          className="absolute right-0 top-2 py-1 px-4 cursor-pointer"
                          src="/icons/copy.png"
                          alt="copy"
                          onClick={() => copyText(item.username)}
                        />
                      </td>
                      <td className="text-center w-32 py-2 border border-white relative">
                        {item.password}
                        <img
                          className="absolute right-0 top-2 py-1 px-4 cursor-pointer"
                          src="/icons/copy.png"
                          alt="copy"
                          onClick={() => copyText(item.password)}
                        />
                      </td>
                      <td className="text-center w-32 py-2 border border-white">
                        <div className="flex justify-center items-center gap-4" onClick={(e)=>{e.stopPropagation(); editPassword(item.id)}}>
                          <img
                            className="cursor-pointer"
                            src="/icons/edit.png"
                            alt="edit"
                          />
                          <span className="cursor-pointer" onClick={(e)=>{e.stopPropagation(); deletePassword(item.id)}}>
                          <lord-icon
                            src="https://cdn.lordicon.com/skkahier.json"
                            trigger="hover"
                            className="cursor-pointer"
                          ></lord-icon>
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;