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
import { defineComponent, computed } from 'vue';
import { useStore } from '@/store';

export default defineComponent({

    name: 'ProjectsView',

    data() {
        return {
            projectName: '',
        }
    },

    methods: {
        save() {
            this.store.commit('ADD_PROJECT', this.projectName)
            this.projectName = '';
        }
    },

    setup() {
        const store = useStore()
        return {
            store,
            projects: computed(() => store.state.projects)
        }
    }
})
</script>

<style scoped>
.projects {
    padding: 1.25rem;
}
</style>

