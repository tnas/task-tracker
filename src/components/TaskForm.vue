<template>

    <div class="box form">
        <div class="columns">
            <div class="column is-8" role="form" aria-label="Task creation form">
                <input type="text" class="input" placeholder="Task to Start" v-model="description">
            </div>
            <div class="column">
                <TaskTimer @onFinishTimer="finishTask" />
            </div>
        </div>
    </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TaskTimer from './TaskTimer.vue'

export default defineComponent({

    name: 'TaskForm',

    emits: ['onSaveTask'],

    components: {
        TaskTimer
    },

    data() {
        return {
            description: ''
        }
    },

    methods: {
        finishTask(elapsedTime: number) : void {
            this.$emit('onSaveTask', {
                timeInSeconds: elapsedTime,
                description: this.description
            });
            this.description = '';
        }
    }
})
</script>

<style>
    .form {
        color: var(--primary-text);
    }
</style>

