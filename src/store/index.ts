import IProjectForm from "@/interfaces/IProjectForm";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { ADD_PROJECT, ADD_TASK, CHANGE_PROJECT, DEFINE_PROJECTS, DEFINE_TASKS, DELETE_PROJECT, NOTIFY } from "./mutation-types";
import { INotificationForm } from '@/interfaces/INotificationForm'
import { GET_PROJECTS, GET_TASKS, NEW_PROJECT, NEW_TASK, REMOVE_PROJECT, UPDATE_PROJECT } from "./action-types";
import http from '@/http'
import ITaskform from "@/interfaces/ITaskForm";

interface AppState {
    projects: IProjectForm[],
    tasks: ITaskform[],
    notifications: INotificationForm[]
}

export const appKey: InjectionKey<Store<AppState>> = Symbol()

export const store = createStore<AppState>({

    state: {
        projects: [],
        tasks: [],
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
        },

        [DEFINE_PROJECTS] (state, projects: IProjectForm[]) {
            state.projects = projects
        },

        [DEFINE_TASKS] (state, tasks: ITaskform[]) {
            state.tasks = tasks
        },

        [ADD_TASK] (state, task: ITaskform) {
            state.tasks.push(task)
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
        },

        [GET_TASKS] ({ commit }) {
            http.get('tasks')
                .then(resp => commit(DEFINE_TASKS, resp.data))
        },

        [NEW_TASK] ({commit}, task: ITaskform) {
            return http.post('/tasks', task)
                .then(resp => commit(ADD_TASK, resp.data))
        }
    }

})

export function useStore() : Store<AppState> {
    return vuexUseStore(appKey)
}