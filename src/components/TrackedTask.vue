<template>
    <TaskBox>
        <div class="columns">
            <div class="column is-7">
                {{ task.description || 'Task with no description' }}
            </div>
            <div class="column">
                <StopWatch :timeInSeconds="task.timeInSeconds" />
            </div>
        </div>
    </TaskBox>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import StopWatch from './StopWatch.vue'
import ITaskForm from '../interfaces/ITaskForm'
import TaskBox from './TaskBox.vue'

export default defineComponent({
    name: 'TrackedTask',
    components: {
        StopWatch, TaskBox
    },
    props: {
        task: {
            type: Object as PropType<ITaskForm>,
            required: true
        }
    }
})
</script>
