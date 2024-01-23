import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  newtask: false,
  singletask: {} 
};

export const utilsSlice = createSlice({
  name: 'utils',
  initialState,
  reducers: {
    addAllData: (state, action) => {
      return {
        ...state,
        tasks: [...state.alltasks, action.payload]
      };
    },
    setOneTask: (state, action) => {
      const taskId = action.payload;
      const foundTask = state.tasks.find(task => task.id === taskId);
      if (foundTask) {
        return {
          ...state,
          one_task: foundTask,
        };
      }
      return {
        ...state,
        one_task: {},
      };
    },
    addNewTask: (state) => {
      return {
        ...state,
        newtask: true,
      };
    },
    cancelNewTask: (state) => {
      return {
        ...state,
        newtask: false
      }
    },
    getTaskByIdRedux: (state,action)=>{
    return{
    ...state,
    singletask: action.payload,
    newtask: true,
    }
    }
  },
});

export const { addNewTask,cancelNewTask,getTaskByIdRedux,addAllData } = utilsSlice.actions;

export default utilsSlice.reducer;
