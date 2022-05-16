import IProjectForm from "@/interfaces/IProjectForm";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { ADD_PROJECT, CHANGE_PROJECT, DELETE_PROJECT, NOTIFY } from "./mutation-types";
import { INotificationForm } from '@/interfaces/INotificationForm'

interface AppState {
    projects: IProjectForm[],
    notifications: INotificationForm[]
}

export const appKey: InjectionKey<Store<AppState>> = Symbol()

export const store = createStore<AppState>({

    state: {
        projects: [],
        notifications: []
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
        },
        [NOTIFY] (state, notification: INotificationForm) {
            notification.id = new Date().getTime()
            state.notifications.push(notification)
            setTimeout(() => {
                state.notifications = state.notifications.filter(not => not.id != notification.id)
            }, 3000);
        }
    }

})

export function useStore() : Store<AppState> {
    return vuexUseStore(appKey)
}