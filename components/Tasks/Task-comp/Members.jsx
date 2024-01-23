"use client";
import React from 'react';
import {Select, SelectItem, Chip} from "@nextui-org/react";
export default function Members({members}){
    const [items, setItems] = React.useState([])
    React.useEffect(() => {
      const fetchData = async () => {
        try {
          const req = await fetch('/api/get-users');
          const users = await req.json();
          const membersArray = members.map(memberId => {
            const user = users.find(user => user.id === memberId);
            return { id: memberId, name: user ? user.name : "Unknown" };
          });
          setItems(membersArray);
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }, [members]);

    return(
      <Select
      items={items}
      defaultSelectedKeys={'all'}
      label="Members"
      variant="bordered"
      isMultiline={true}
      selectionMode="multiple"
      placeholder="Select a member"
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
        )

}