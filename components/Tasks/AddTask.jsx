"use client";
import React from 'react'
import {Card, CardHeader, CardBody, CardFooter, Divider, Checkbox,Textarea} from "@nextui-org/react";
import {useDispatch,useSelector} from 'react-redux'
import {cancelNewTask} from '@/storage/utilsSlice'
import Members from './Task-comp/Members';
import Projects from './Task-comp/Projects';
import Labels from './Task-comp/Labels';
import Tags from './Task-comp/Tags';
export default function AddTask() {
  const dispatch = useDispatch()
  const oneTask = useSelector(state=> state.utils.singletask)

  return (
    <Card>
      <CardHeader className="flex gap-3">
              <div>
                  <Checkbox onClick={()=> dispatch(cancelNewTask())} radius="full" isReadOnly defaultSelected color="success">Mark as Complete</Checkbox>
      </div>
      </CardHeader>
      <Divider/>
      <CardBody>
      <Textarea
      isRequired
      radius="sm"
      label="Title"
      labelPlacement="outside"
      placeholder="Enter title of task"
      className="w-full"
    />
      </CardBody>
      <Divider/>
      <CardFooter className="flex flex-col gap-2 justify-start items-start w-full">
        <div className="w-full">
        <Members members={oneTask.members}/>
        </div>
        <div className="w-full">
        <Projects projectsId={oneTask.projects}/>
        </div>
        <div className="w-full">
          <Labels labelsId={oneTask.labels}/>
        </div>
        <div className="w-full">
          <Tags tagsId={oneTask.tags}/>
        </div>
      </CardFooter>
      
    </Card>
  )
}
