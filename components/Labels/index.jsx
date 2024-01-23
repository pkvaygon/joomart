"use client";
import React, { useEffect, useState } from 'react'
import {Button} from "@nextui-org/react";
export default function Labels(){
    const [labels,setLabels] = useState([])
    useEffect(() => {
      const test = async ()=> {
         const req = await fetch('/api/get-labels')
         const res = await req.json()
         setLabels(res)
         }
         test()
     },[])
return(
    <div className="flex flex-col gap-2">
        <h1>LABELS</h1>
        {
        labels.map(label =>(
            <Button variant="flat" style={{background: label.color, color: 'white'}} key={label.id} >{label.name}</Button>
            ))
        }
        </div>
    )

}