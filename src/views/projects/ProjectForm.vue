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
import { useRouter } from 'vue-router';

export default defineComponent({

    name: 'ProjectForm',

    props: {
        id: {
            type: String
        }
    },

    setup(props) {
        
        const store = useStore()
        const { notify } = useNotifier()
        const router =  useRouter()
        const projectName = ref("")

        if (props.id) {
            const project = store.state.project.projects.find(proj => proj.id == props.id)
            projectName.value = project?.name || ''
        }

        const refreshForm = () => {
            projectName.value = '';
            notify(NotificationType.SUCCESS, 'Project Available', 'The project has been saved successfully')
            router.push('/projects')
        }

        const save = () => {
            
            if (props.id) {
                store.dispatch(UPDATE_PROJECT, {
                    id: props.id,
                    name: projectName.value
                }).then(() => refreshForm())   
            }
            else {
                store.dispatch(NEW_PROJECT, projectName.value)
                    .then(() => {
                        refreshForm()
                    })
            }
        }

        return {
            projectName,
            save
        }
    }
})
</script>

<style scoped>
.projects {
    padding: 1.25rem;
}
</style>

