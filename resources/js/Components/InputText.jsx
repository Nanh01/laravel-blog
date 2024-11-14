import React, { useState } from 'react'

export default function InputText({id, name,label, value = "", placeholder, setData}) {
  
  return (
    <div className="form-group flex items-center">
      <label className="w-1/5 text-white" htmlFor={id}>{label}</label>
      <input className='w-4/5 text-gray-600 ml-3' id={id} name={name} value={value} placeholder={placeholder} onChange={(event) => setData(name, event.target.value)}></input>
    </div>
  )
}
