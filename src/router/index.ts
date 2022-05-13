import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import TasksView from '../views/TasksView.vue'
import ProjectsView from '../views/ProjectsView.vue'
import ProjectForm from '@/views/projects/ProjectForm.vue'
import ProjectList from '@/views/projects/ProjectList.vue'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'tasks',
        component: TasksView
    },
    {
        path: '/projects',
        component: ProjectsView,
        children: [
            {
                path: '',
                name: 'projects',
                component: ProjectList
            },
            {
                path: 'new',
                name: 'new project',
                component: ProjectForm
            },
            {
                path: ':id',
                name: 'edit project',
                component: ProjectForm,
                props: true
            },
        ]

        
    }

]

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;