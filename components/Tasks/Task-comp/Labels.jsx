"use client";
import React from 'react';
import { Select, SelectItem, Chip } from "@nextui-org/react";

export default function Projects({ labelsId }) {
  const [allLabels, setAllLabels] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const req = await fetch('/api/get-labels');
        const labels = await req.json();
        const labelsNames = labelsId.map(labelsId => {
          const label = labels.find(label => label.id === labelsId);
          return {id: labelsId, name: label.name}
        });
        setAllLabels(labelsNames);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [labelsId]);

  return (
    <Select
      items={allLabels}
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
      {(label) => (
        <SelectItem key={label.id} textValue={label.name}>
         {label.name}
        </SelectItem>
      )}
    </Select>
  );
}
