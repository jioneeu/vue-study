<template>
  <div>
    <h1>{{ result }}</h1> 
    <form @submit.prevent="onSubmitForm">
      <input ref="answer" minlength="4" maxlength="4" v-model="value">
      <button>入力</button>
    </form>
    <div>Attempt: {{ attempts.length }}</div>
    <ul>
      <li v-for="attempt in attempts">
        <div>{{ attempt.try }}</div>
        <div>{{ attempt.result }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        attempts: [],
        value: '',
        result: '',
      }
    },
    methods: {
      onSubmitForm(e) {
        this.attempts.push({
          try: this.value,
          result: 'Homerun!',
        });
        this.$refs.answer.focus();
        this.value = '';
        console.log(this.attempts);
      }
    },
  }
</script>

<style>
</style>
