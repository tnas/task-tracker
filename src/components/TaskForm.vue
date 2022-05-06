<template>

    <div class="box">
        <div class="columns">
            <div class="column is-8" role="form" aria-label="Task creation form">
                <input type="text" class="input" placeholder="Task to Start">
            </div>
            <div class="column">
                <TaskTimer />
            </div>
        </div>
    </div>

</template>

<script>
import { defineComponent } from 'vue'
import TaskTimer from './TaskTimer.vue'

export default defineComponent({
    name: 'TaskForm',
    components: {
        TaskTimer
    }
})
</script>


