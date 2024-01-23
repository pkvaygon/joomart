"use client";
import Projects from '@/components/Projects'
import Labels from '@/components/Labels'
import Tasks from '@/components/Tasks'
import AddTask from '@/components/Tasks/AddTask';
import { useSelector } from 'react-redux';

export default function Home() {
  const checkStatus = useSelector(state => state.utils.newtask);

  return (
    <section className="flex justify-start items-start gap-2">
      <section className="w-[250px] max-w-[250px]">
        <Projects />
        <Labels />
      </section>
      <section className={checkStatus ? 'w-[40%]' : 'flex-1'}>
        <Tasks  checkStatus={checkStatus}/>
      </section>
      {checkStatus && (
        <section className="w-[40%]">
          <AddTask />
        </section>
      )}
    </section>
  );
}
