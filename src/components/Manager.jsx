import React from 'react'
import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';






function Manager() {
  const [pass, setPass] = useState({ site: "", userName: "", password: "" })
  const [passArray, setpassArray] = useState([])
  const [imgsrc, setimgsrc] = useState("/show.png")
  const [type, settype] = useState("password")
  const [disabled, setDisabled] = useState(true)

  const getPasswords = async () => {
    let req = await fetch("http://localhost:3000/")
    let passwords = await req.json()
    setpassArray(passwords)
    console.log(passwords)
  }



  useEffect(() => {
    getPasswords()
  }, [])

  useEffect(() => {
    if (pass.site.length >= 3 && pass.userName.length >= 3 && pass.password.length >= 3) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [pass]);








  const handleInput = (e) => {
    const { name, value } = e.target;
    setPass({ ...pass, [name]: value })

  }

  const handleShoide = (e) => {
    if (imgsrc === "/show.png" && type === "password") {
      setimgsrc("/hide.png")
      settype("text")
    } else {
      setimgsrc('/show.png')
      settype("password")
    }
  }
  const handleSave = async () => {
    setpassArray([...passArray, { ...pass, id: uuidv4() }])
    setPass({ site: "", userName: "", password: "" })
    setDisabled(true);
    let res = await fetch("http://localhost:3000/", {method: "POST", headers:{"Content-Type": "application/json"},
    body: JSON.stringify({...pass, id:uuidv4()})})
    toast.success('Secret Fortified', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
      transition: Bounce,
    });
  }
  const handleEdit = (e, id) => {
    const curPass = passArray.find(item => item.id === id)
    if (curPass){
      setPass(curPass)
    }
    const updatedPassArray = passArray.filter(item => item.id !== id)
    setpassArray(updatedPassArray)

  }
  const handleDelete = async (e, id) => {
    const newPassArray = passArray.filter(item => item.id !== id)
    setpassArray(newPassArray)
    let res = await fetch("http://localhost:3000/", {method: "DELETE", headers:{"Content-Type": "application/json"},
      body: JSON.stringify({...pass, id})})
    toast.success('Secret Deleted', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
      transition: Bounce,
    });
  }

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text)

    toast.success('Copy Successful', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
      transition: Bounce,
    });
  }



  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}  // Corrected
      />
      <div className="mainContainer h-[80vh] w-[80vw]  overflow-y-auto  m-auto">
        <div className='flex items-center justify-center flex-col my-5'>
          <div className="logo cursor-pointer">
            <span className=' font-black text-2xl text-green-600'>&lt;</span>
            <span className=' font-black text-2xl text-black'>Fort</span>
            <span className=' font-black text-2xl text-green-600'>ify/&gt;</span>
          </div>
          <p className='text-black font-bold'>Fortify Your Secrets 🔐 here</p>
        </div>
        <div className="savepasswords flex items-center justify-center flex-col gap-3 p-5">
          <div className="site w-full">
            <input onChange={handleInput} className='w-full text-white bg-black outline-none rounded-full py-2 px-5' name='site' value={pass.site} placeholder='Enter Website' type="text" />
          </div>
          <div className="pass flex items-center justify-center gap-5 w-full relative">
            <input onChange={handleInput} className='w-full text-white bg-black outline-none rounded-full py-2 px-5' name='userName' value={pass.userName} placeholder='Enter Username' type="text" />
            <input onChange={handleInput} className='w-full text-white bg-black outline-none rounded-full py-2 px-5' name='password' value={pass.password} placeholder='Enter Password' type={type} />
            <img onClick={handleShoide} className='shoide w-8 cursor-pointer absolute right-4' src={imgsrc} alt="Shoide" />
          </div>
          <button onClick={handleSave} disabled={disabled} className='disabled:cursor-not-allowed group flex items-center justify-center bg-zinc-800 transition-all w-fit duration-300 gap-2 py-3 px-3 border hover:invert border-black rounded-full my-2 cursor-pointer'>
            <div className="add invert w-7 h-7 group-hover:animate-spin rounded-full bg-cover bg-no-repeat bg-center bg-[url('/add.svg')]"></div>
            <p className='font-bold text-white'>Save Password</p>
          </button>
        </div>
        <div className="showPass">
          <h2 className='text-black font-black text-3xl ml-5'>Your Secrets🤫</h2>

          {passArray.length === 0 ? (<div className='py-5 px-10 font-bold'>No Passwords To Show</div>) : (<table className="table-fixed mx-auto w-[80%] border border-gray-300 rounded-lg overflow-hidden shadow-md my-5">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-2 px-4 text-left border border-black bg-black text-white font-semibold">Website</th>
                <th className="py-2 px-4 text-left border border-black bg-black text-white font-semibold">Username</th>
                <th className="py-2 px-4 text-left border border-black bg-black text-white font-semibold">Password</th>
                <th className="py-2 px-4 text-left border border-black bg-black text-white font-semibold">Options</th>
              </tr>
            </thead>
            <tbody>
              {passArray.map((item) => {
                return <tr key={item.id} className="hover:bg-gray-100">
                  {console.log(item.password.length)}
                  <td className="py-2 px-4 border border-gray-900 bg-slate-300 text-black ">{item.site} <img src="/copy.svg" className='w-5 cursor-pointer inline-block' onClick={() => handleCopy(item.site)} alt="copy" /></td>
                  <td className="py-2 px-4 border border-gray-900 bg-slate-300 text-black ">{item.userName} <img src="/copy.svg" className='w-5 cursor-pointer inline-block' onClick={() => handleCopy(item.userName)} alt="copy" /></td>
                  <td className="py-2 px-4 border border-gray-900 bg-slate-300 text-black ">{'•'.repeat(item.password.length)} <img src="/copy.svg" className='w-5 cursor-pointer inline-block' onClick={() => handleCopy(item.password)} alt="copy" /></td>
                  <td className="py-2 px-4 border border-gray-900 bg-slate-300 text-black">
                    <div className='w-full h-full flex items-center gap-5'>
                      <div onClick={e => { handleEdit(e, item.id) }} className="edit   p-4 hover:animate-bounce  cursor-pointer bg-cover bg-no-repeat bg-center bg-[url('/edit.svg')]"></div>
                      <div onClick={e => { handleDelete(e, item.id) }} className="delete p-4 hover:animate-bounce  cursor-pointer bg-cover bg-no-repeat bg-center bg-[url('/delete.svg')]"></div>
                    </div>
                  </td>
                </tr>
              })}
            </tbody>
          </table>)}


        </div>
      </div>
    </>
  )
}

export default Manager
