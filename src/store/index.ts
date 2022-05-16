import IProjectForm from "@/interfaces/IProjectForm";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { ADD_PROJECT, CHANGE_PROJECT, DELETE_PROJECT } from "./mutation-types";

interface AppState {
    projects: IProjectForm[]
}

export const appKey: InjectionKey<Store<AppState>> = Symbol()

export const store = createStore<AppState>({

    state: {
        projects: []
    },

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
        }
    }

})

export function useStore() : Store<AppState> {
    return vuexUseStore(appKey)
}