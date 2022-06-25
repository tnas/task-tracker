import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { ADD_TASK, CHANGE_TASK, DEFINE_TASKS, NOTIFY } from "./mutation-types";
import { INotificationForm } from '@/interfaces/INotificationForm'
import { GET_TASKS, NEW_TASK, UPDATE_TASK } from "./action-types";
import http from '@/http'
import ITaskform from "@/interfaces/ITaskForm";
import { project, ProjectState } from "./modules/project";

export interface AppState {
    tasks: ITaskform[],
    notifications: INotificationForm[],
    project: ProjectState
}

export const appKey: InjectionKey<Store<AppState>> = Symbol()

export const store = createStore<AppState>({

    state: {
        tasks: [],
        notifications: [],
        project: {
            projects: []
        }
    },

    mutations: {
        
        [NOTIFY] (state, notification: INotificationForm) {
            notification.id = new Date().getTime()
            state.notifications.push(notification)
            setTimeout(() => {
                state.notifications = state.notifications.filter(not => not.id != notification.id)
            }, 3000);
        },

        [DEFINE_TASKS] (state, tasks: ITaskform[]) {
            state.tasks = tasks
        },

        [ADD_TASK] (state, task: ITaskform) {
            state.tasks.push(task)
        },

        [CHANGE_TASK] (state, task: ITaskform) {
            const index = state.tasks.findIndex(tk => tk.id == task.id)
            state.tasks[index] = task
        },
    },

    actions: {

        [GET_TASKS] ({ commit }) {
            http.get('tasks')
                .then(resp => commit(DEFINE_TASKS, resp.data))
        },

        [NEW_TASK] ({commit}, task: ITaskform) {
            return http.post('/tasks', task)
                .then(resp => commit(ADD_TASK, resp.data))
        },

        [UPDATE_TASK] ({commit}, task: ITaskform) {
            return http.put(`/tasks/${task.id}`, task)
                .then(() => commit(CHANGE_TASK, task))
        },
    },

    modules: {
        project
    }

})

export function useStore() : Store<AppState> {
    return vuexUseStore(appKey)
}