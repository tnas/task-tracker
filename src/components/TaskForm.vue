<template>

    <div class="box">
        <div class="columns">
            <div class="column is-8" role="form" aria-label="Task creation form">
                <input type="text" class="input" placeholder="Task to Start">
            </div>
            <div class="column">
                <div class="is-flex is-align-items is-justify-content-space-between">
                    <section>
                        <strong>00:00:00</strong>
                    </section>
                    <button class="button">
                        <span class="icon">
                            <i class="fas fa-play"></i>
                        </span>
                        <span>play</span>
                    </button>
                    <button class="button">
                        <span class="icon">
                            <i class="fas fa-stop"></i>
                        </span>
                        <span>stop</span>
                    </button>
                </div>
            </div>
        </div>
    </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'TaskForm'
});
</script>

