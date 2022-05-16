import IProjectForm from "@/interfaces/IProjectForm";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { ADD_PROJECT, CHANGE_PROJECT, DELETE_PROJECT } from "./mutation-types";
import { INotificationForm, NotificationType } from '@/interfaces/INotificationForm'

interface AppState {
    projects: IProjectForm[],
    notifications: INotificationForm[]
}

export const appKey: InjectionKey<Store<AppState>> = Symbol()

export const store = createStore<AppState>({

    state: {
        projects: [],
        notifications: [
            {
                id: 1,
                text: 'A success notification',
                title: 'Success',
                type: NotificationType.SUCCESS
            },
            {
                id: 2,
                text: 'A danger notification',
                title: 'Danger',
                type: NotificationType.DANGER
            },
            {
                id: 3,
                text: 'A failure notification',
                title: 'Failure',
                type: NotificationType.FAILURE
            }
        ]
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