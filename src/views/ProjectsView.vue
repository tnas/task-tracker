<template>
    <section class="projects">
        <h1 class="title">Projects</h1>
        <router-link to="/projects/new" class="button">
            <span class="icon is-small">
                <i class="fas fa-plus"></i>
            </span>
        </router-link>
        <table class="table is-fullwidth">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="proj in projects" :key="proj.id">
                    <td>{{ proj.id }}</td>
                    <td>{{ proj.name }}</td>
                    <td>
                        <router-link :to="`/projects/${proj.id}`" class="button">
                            <span class="icon is-small">
                                <i class="fas fa-pencil-alt"></i>
                            </span>
                        </router-link>
                    </td>
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

    setup() {
        const store = useStore()
        return {
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

