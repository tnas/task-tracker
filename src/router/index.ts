import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import TasksView from '../views/TasksView.vue'
import ProjectsView from '../views/ProjectsView.vue'
import ProjectForm from '@/views/projects/ProjectForm.vue'

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
    },
    {
        path: '/projects/new',
        name: 'new project',
        component: ProjectForm
    },
    {
        path: '/projects/:id',
        name: 'edit project',
        component: ProjectForm,
        props: true
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;