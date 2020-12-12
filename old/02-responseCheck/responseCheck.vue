<template>
  <div>
    <div id="screen" :class="state" @click="onClickScreen"> {{ message }}</div>
    <template v-if="result.length">
      <div>Average time:  {{ avg }}ms</div>
      <button @click="onReset"> Reset </button>
    </template>
  </div>
</template>

<script>
let startTime = 0;
let endTime = 0;
let timeout = null;
  export default {
    data() {
      return {
        result: [],
        state: 'waiting',
        message: 'Click to start',
      };
    },
    computed: {
      avg() {
        // caching이 된다
        return this.result.reduce((a, c) => a+c, 0) / this.result.length || 0;
      }
    },
    methods: {
      onReset() {
        this.result = []
      },
      onClickScreen() {
        if (this.state === 'waiting') {
          this.state = 'ready';
          this.message = "Click when green."
          timeout = setTimeout(() => {
            this.state = 'now';
            this.message = "Click now!";
            startTime = new Date();
          }, Math.floor(Math.random() * 1000) + 2000);
        } else if(this.state === 'ready') {
          clearTimeout(timeout);
          this.state = 'waiting';
          this.message = "Too fast! Click when green."
        } else if (this.state === 'now') {
          endTime = new Date();
          this.state = 'waiting';
          this.message = "Click to start."
          this.result.push (endTime - startTime);
        }
      }
    },
  }
</script>

<style scoped>
  div#screen {
    width: 300px;
    height: 200px;
    text-align: center;
    user-select: none;
  }

  div#screen.waiting {
    background-color: aqua;
  }

  div#screen.ready {
    background-color: red;
    color: white;
  }

  div#screen.now {
    background-color: greenyellow;  
  }
</style>
