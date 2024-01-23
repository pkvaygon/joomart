"use client";
import { Chip, Checkbox, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { useDispatch, useSelector } from 'react-redux';
import { getTaskByIdRedux } from '@/storage/utilsSlice';

export default function TaskTab({ tasks }) {
  const reduxProjects = useSelector(state => state.collections.projects);
  const dispatch = useDispatch();
  const statusColorMap = {
    "done": "success",
    "in-progress": "warning",
    "todo": "danger",
  };

  
  
  const formatDueDate = (dueDate) => {
    const date = new Date(dueDate);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  }

  const getTask = async (id) => {
    try {
      const req = await fetch(`/api/get-tasks/${id}`)
      const res = await req.json()
      dispatch(getTaskByIdRedux(res))
    } catch (error) {
      console.error(error);
    }
  }

  const filteredTasks = reduxProjects.length > 0
  ? tasks.filter(task => reduxProjects.some(project => task.projects.includes(project.id)))
  : tasks;
  return (
    <Table radius="none" shadow="none" aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>Ready</TableColumn>
        <TableColumn>Task</TableColumn>
        <TableColumn>STATUS</TableColumn>
        <TableColumn>Due Date</TableColumn>
      </TableHeader>
      <TableBody>
        {filteredTasks.map(task => (
          <TableRow   className="transition-colors hover:bg-gray-200" onClick={() => getTask(task.id)} key={task.id}>
            <TableCell><Checkbox isReadOnly defaultSelected color={task.completed ? "success" : "default"}></Checkbox></TableCell>
            <TableCell>{task.title}</TableCell>
            <TableCell>
              <Chip color={statusColorMap[task.status]}>{task.status === "todo" ? "Not Started" : task.status}</Chip>
            </TableCell>
            <TableCell>{formatDueDate(task.dueDate)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
