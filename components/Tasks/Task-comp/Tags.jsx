"use client";
import React from 'react';
import { Select, SelectItem, Chip } from "@nextui-org/react";

export default function Tags({ tagsId }) {
  const [allTags, setAllTags] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const req = await fetch('/api/get-tags');
        const tags = await req.json();
        const tagsNames = tagsId.map(tagId => {
          const tag = tags.find(tag => tag.id === tagId);
          return { id: tagId, name: tag ? tag.name : "Unknown" };
        });
        setAllTags(tagsNames);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [tagsId]);

  return (
    <Select
      items={allTags}
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
      {(tag) => (
        <SelectItem key={tag.id} textValue={tag.name}>
          {tag.name}
        </SelectItem>
      )}
    </Select>
  );
}
