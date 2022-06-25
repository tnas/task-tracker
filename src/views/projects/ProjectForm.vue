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
import { defineComponent, ref } from 'vue';
import { useStore } from '@/store';
import { NotificationType } from '@/interfaces/INotificationForm';
import useNotifier from '@/hooks/notifier'
import { NEW_PROJECT, UPDATE_PROJECT } from '@/store/action-types';

export default defineComponent({

    name: 'ProjectForm',

    props: {
        id: {
            type: String
        }
    },

    methods: {
        save() {
            
            if (this.id) {
                this.store.dispatch(UPDATE_PROJECT, {
                    id: this.id,
                    name: this.projectName
                }).then(() => this.refreshForm())   
            }
            else {
                this.store.dispatch(NEW_PROJECT, this.projectName)
                    .then(() => {
                        this.refreshForm()
                    })
            }
        },

        refreshForm() {
            this.projectName = '';
            this.notify(NotificationType.SUCCESS, 'Project Available', 'The project has been saved successfully')
            this.$router.push('/projects')
        }
    },

    setup(props) {
        
        const store = useStore()
        const { notify } = useNotifier()
        const projectName = ref("")

        if (props.id) {
            const project = store.state.project.projects.find(proj => proj.id == props.id)
            projectName.value = project?.name || ''
        }

        return {
            store,
            notify,
            projectName
        }
    }
})
</script>

<style scoped>
.projects {
    padding: 1.25rem;
}
</style>

