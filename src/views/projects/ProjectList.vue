<template>
    <section>
        <router-link to="/projects/new" class="button">
            <span class="icon is-small">
                <i class="fas fa-plus"></i>
            </span>
            <span>New Project</span>
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
                        <button class="button ml-2 is-danger" @click="delete(proj.id)">
                            <span class="icon is-small">
                                <i class="fas fa-trash"></i>
                            </span>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>    
    </section>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from '@/store';
import { GET_PROJECTS, REMOVE_PROJECT } from '@/store/action-types';

export default defineComponent({

    name: 'ProjectList',

    methods: {
        delete(id: string) {
            this.store.dispatch(REMOVE_PROJECT, id)
        }
    },

    setup() {
        const store = useStore()
        store.dispatch(GET_PROJECTS)

        return {
            projects: computed(() => store.state.projects),
            store
        }
    }
})
</script>