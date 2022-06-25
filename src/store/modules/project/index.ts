import http from "@/http";
import IProjectForm from "@/interfaces/IProjectForm";
import { AppState } from "@/store";
import { GET_PROJECTS, NEW_PROJECT, UPDATE_PROJECT, REMOVE_PROJECT } from "@/store/action-types";
import { ADD_PROJECT, CHANGE_PROJECT, DELETE_PROJECT, DEFINE_PROJECTS } from "@/store/mutation-types";
import { Module } from "vuex";

export interface ProjectState {
    projects: IProjectForm[]
}

export const project: Module<ProjectState, AppState> = {

    mutations: {
        [ADD_PROJECT] (state, projectName: string) {
            const project = {
                id: new Date().toISOString(),
                name: projectName
            } as IProjectForm

            state.projects.push(project)
        },

        [CHANGE_PROJECT] (state, project: IProjectForm) {
            const index = state.projects.findIndex(proj => proj.id == project.id)
            state.projects[index] = project
        },

        [DELETE_PROJECT] (state, id: string) {
            state.projects = state.projects.filter(proj => proj.id != id)
        },

        [DEFINE_PROJECTS] (state, projects: IProjectForm[]) {
            state.projects = projects
        }
    },

    actions: {
        [GET_PROJECTS] ({ commit }) {
            http.get('projects')
                .then(resp => commit(DEFINE_PROJECTS, resp.data))
        },

        [NEW_PROJECT] (context, projectName: string) {
            return http.post('/projects', {
                name: projectName
            })
        },

        [UPDATE_PROJECT] (context, project: IProjectForm) {
            return http.put(`/projects/${project.id}`, project)
        },

        [REMOVE_PROJECT] ({commit}, id: string) {
            return http.delete(`/projects/${id}`)
                .then(() => commit(DELETE_PROJECT, id))
        }
    }
}