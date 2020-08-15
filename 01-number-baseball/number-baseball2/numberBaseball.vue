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
  const getNumbers = () => {
    const candidates = [1 ,2, 3, 4, 5, 6, 7, 8, 9];
    const arr = [];
    for (let i=0; i<4; ++i) {
      const chosen = candidates.splice(Math.floor(Math.random() * (9-i)), 1)[0];
      arr.push(chosen);
    }
    return arr;
  }

  export default {
    data() {
      return {
        answer: getNumbers(),
        attempts: [],
        value: '',
        result: '',
      };
    },
    methods: {
      onSubmitForm(e) {
        if (this.value === this.answer.join('')) { // if correct
          this.attempts.push ({
            try: this.value, 
            result: 'Homerun',
          });
          this.result = 'Homerun';
          alert(`Homerun! Yes it's [${this.answer.join(' ')}]`);
          this.value = '';
          this.answer = getNumbers();
          this.attempts = [];
        } else {
          if (this.attempts.length >= 9) {
            this.result = `The answer was [${this.answer.join(' ')}]!`;
            alert("Starting a new game.");
            this.value = '';
            this.answer = getNumbers();
            this.attempts = [];
          }
          let strike = 0;
          let ball = 0;
          const answerArray = this.value.split('').map(v => parseInt(v));
          for (let i=0; i<4; ++i) {
            if (answerArray[i] === this.answer[i]) { // strike
              ++strike;
            } else if (this.answer.includes(answerArray[i])) { // ball
              ++ball;
            }
          }

          this.attempts.push ({
            try: this.value,
            result: `Strike: ${strike}   Ball: ${ball}`
          })
        }

        this.$refs.answer.focus();
        this.value = '';
        console.log(this.answer);
      }
    },
  }
</script>

<style>
</style>
