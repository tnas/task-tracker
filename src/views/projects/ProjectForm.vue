<template>
    <section>
        <form @submit.prevent="save">
            <div class="field">
                <label for="projectName" class="label">Project Name</label>
                <input type="text" class="input" v-model="projectName" id="projectName">
            </div>
            <div class="field">
                <button class="button" type="submit">Save</button>
            </div>
        </form>   
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from '@/store';
import { ADD_PROJECT, CHANGE_PROJECT, NOTIFY } from '@/store/mutation-types';
import { NotificationType } from '@/interfaces/INotificationForm';

export default defineComponent({

    name: 'ProjectForm',

    mounted() {
        if (this.id) {
            const project = this.store.state.projects.find(proj => proj.id == this.id)
            this.projectName = project?.name || ''
        }
    },

    props: {
        id: {
            type: String
        }
    },

    data() {
        return {
            projectName: '',
        }
    },

    methods: {
        save() {
            
            if (this.id) {
                this.store.commit(CHANGE_PROJECT, {
                    id: this.id,
                    name: this.projectName
                })   
            }
            else {
                this.store.commit(ADD_PROJECT, this.projectName)
            }
            this.projectName = '';
            this.store.commit(NOTIFY, {
                title: 'New project has been saved',
                text: 'The project is available',
                type: NotificationType.SUCCESS
            })
            this.$router.push('/projects')
        }
    },

    setup() {
        const store = useStore()
        return {
            store
        }
    }
})
</script>

<style scoped>
.projects {
    padding: 1.25rem;
}
</style>

