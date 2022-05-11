import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import TasksView from '../views/TasksView.vue'
import ProjectsView from '../views/ProjectsView.vue'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'tasks',
        component: TasksView
    },
    {
        path: '/projects',
        name: 'projects',
        component: ProjectsView
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;