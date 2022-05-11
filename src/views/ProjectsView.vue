<template>
    <section class="projects">
        <h1 class="title">Projects</h1>
        <form @submit.prevent="save">
            <div class="field">
                <label for="projectName" class="label">Project Name</label>
                <input type="text" class="input" v-model="projectName" id="projectName">
            </div>
            <div class="field">
                <button class="button" type="submit">Save</button>
            </div>
        </form>
        <table class="table is-fullwidth">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="proj in projects" :key="proj.id">
                    <td>{{ proj.id }}</td>
                    <td>{{ proj.name }}</td>
                </tr>
            </tbody>
        </table>    
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import IProjectForm from '../interfaces/IProjectForm'

export default defineComponent({

    name: 'ProjectsView',

    data() {
        return {
            projectName: '',
            projects: [] as IProjectForm[]
        }
    },

    methods: {
        save() {
            const project: IProjectForm = {
                name: this.projectName,
                id: new Date().toISOString()
            };
            this.projects.push(project);
            this.projectName = '';
        }
    }
})
</script>

<style scoped>
.projects {
    padding: 1.25rem;
}
</style>

