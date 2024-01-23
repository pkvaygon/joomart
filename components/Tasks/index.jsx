"use client";
import React, { useEffect, useState } from 'react'
import {Input, Button} from "@nextui-org/react";
import {PlusIcon, SearchIcon} from '@/components/icons'
import TaskTab from "./TaskTab";
import {useDispatch} from 'react-redux'
import {addNewTask} from '@/storage/utilsSlice'
export default function Tasks({checkStatus}){
  const dispatch = useDispatch()
  const [tasks,setTasks] = useState([])
  useEffect(() => {
    const test = async ()=> {
       const req = await fetch('/api/get-tasks')
       const res = await req.json()
       setTasks(res)
       }
       test()
   },[])
return(
  <section>
    <div className="flex w-full justify-between items-center bg-[#EEEEEE] px-2">
            <div className='py-6'>
                <h1 className="text-lg">Tasks</h1>
                <h4>{tasks.length} total tasks</h4>
            </div>
            <div className="flex justify-between items-center">
            {
            !checkStatus && (
                    <div className="w-[340px] px-8 rounded-2xl flex justify-center items-center  text-white">
            <Input
        label="Search"
        isClearable
        radius="lg"
        classNames={{
          label: "text-black/50 dark:text-white/90",
        }}
        placeholder="Type to search..."
        startContent={
          <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
        }
          />
      </div>
              )
            }
      <div className="flex gap-2 p-1">
      <Button radius="full" variant="flat"  startContent={<PlusIcon/>}>
        AddProject
      </Button>
      <Button onClick={()=> dispatch(addNewTask())} type="button" radius="full" className="bg-black text-white" startContent={<PlusIcon/>}>
        AddTask
      </Button>
      </div>
      </div>
    </div>
    <div>
      <TaskTab tasks={tasks}/>
    </div>
    </section>
    )
}