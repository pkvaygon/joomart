import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projects: [],
};

export const projectSlice = createSlice({
  name: 'collections',
  initialState,
  reducers: {
    addProjects: (state, action) => {
      const { id, name } = action.payload;
      return {
        ...state,
        projects: [...state.projects, { id, name }]
      };
    },
    removeProjects: (state, action) => {
      const { id, name } = action.payload;
      return {
        ...state,
        projects: state.projects.filter(project => project.id !== id || project.name !== name)
      };
    },
  },
});

export const { addProjects, removeProjects } = projectSlice.actions;
export default projectSlice.reducer;
