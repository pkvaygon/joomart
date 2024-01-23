"use client";
import React from 'react';
import { Select, SelectItem, Chip } from "@nextui-org/react";

export default function Projects({ projectsId }) {
  const [allProjects, setAllProjects] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const req = await fetch('/api/get-projects');
        const projects = await req.json();
        const projectsNames = projectsId.map(projectId => {
          const project = projects.find(project => project.id === projectId);
          return {id: projectId, name: project.name}
        });
        setAllProjects(projectsNames);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [projectsId]);

  return (
    <Select
      items={allProjects}
      defaultSelectedKeys={'all'}
      label="Projects"
      variant="bordered"
      isMultiline={true}
      selectionMode="multiple"
      placeholder="Select a project"
      labelPlacement="outside"
      classNames={{
        base: "w-full",
        trigger: "min-h-unit-12 py-2",
      }}
      renderValue={(items) => {
        return (
          <div className="flex flex-wrap gap-2">
            {items.map((item) => (
              <Chip key={item.id}>{item.data.name}</Chip>
            ))}
          </div>
        );
      }}
    >
      {(user) => (
        <SelectItem key={user.id} textValue={user.name}>
         {user.name}
        </SelectItem>
      )}
    </Select>
  );
}
