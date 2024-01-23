"use client";
import React, { useEffect, useState } from 'react';
import { Autocomplete, AutocompleteItem, Chip } from "@nextui-org/react";
import { useSelector, useDispatch } from 'react-redux';
import { addProjects, removeProjects } from '@/storage/projectSlice';

export default function Projects() {
  const reduxProjects = useSelector(state => state.collections.projects);
  const dispatch = useDispatch();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const req = await fetch('/api/get-projects');
      const res = await req.json();
      setProjects(res);
    }

    fetchData();
  }, []);

  const handleAdd = (project) => {
    dispatch(addProjects({ id: project.id, name: project.name }));
  };

  const handleRemove = (project) => {
    dispatch(removeProjects(project));
  };

  return (
    <div className="flex flex-col gap-6">
      <h1>PROJECTS</h1>
      <Autocomplete
        label="Select a project"
        className="max-w-xs mb-2"
      >
        {projects.map((project) => (
          <AutocompleteItem
            selectedKeys={projects}
            key={project.id}
            value={project.name}
            onClick={() => handleAdd(project)}
          >
            {project.name}
          </AutocompleteItem>
        ))}
      </Autocomplete>
      <div className="flex flex-wrap gap-1">
        {reduxProjects.map((project) => (
          <Chip key={project.id} onClose={() => handleRemove(project)}>
            {project.name}
          </Chip>
        ))}
      </div>
    </div>
  );
}
