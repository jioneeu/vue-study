<template>
  <div>
    <h1>{{ result }} </h1>
    <form @submit.prevent="onSubmitForm">
      <input ref="answer" minlength="4" maxlength="4" v-model="value">
      <button type="submit">Enter</button>
    </form>
    <div>Attempts: {{ tries.length }}</div>
    <ul>
      <li v-for="t in tries"> 
        <div>{{ t.try }}</div>
        <div>{{ t.result }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
const getNumbers = () => {
  const candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];
  for (let i=0; i<4; ++i) {
    const chosen = candidates.splice(Math.floor(Math.random() * (9-i)), 1)[0];
    array.push(chosen);
  }
  return array;
}

export default {
  data() {
    return {
      answer: getNumbers(),
      tries: [],
      value: '',
      result: '',
    }
  },
  methods: {
    onSubmitForm(e) {
      if (this.value == this.answer.join('')) {
        alert(`Yes! The answer was ${this.answer.join(',')}`);
        this.tries.push({
          try: this.value,
          result: "Homerun!",
        });
        this.tries = [];
        this.result = '';
      } else {
        let strike = 0;
        let ball = 0;
        const answerArray = this.value.split('').map(v => parseInt(v));
        for (let i=0; i<4; ++i) {
          if (answerArray[i] === this.answer[i]) {
            ++strike;
          } else if(this.answer.includes(answerArray[i])) {
            ++ball;
          }
        }
        this.tries.push({
          try: this.value,
          result: `${strike} strike(s), ${ball} ball(s).`
        });
      }

        if (this.tries.length >= 10) {
        this.result = `Previouse game's answer was ${this.answer.join(',')}`; 
        alert(`${this.result}. Restarting the game.`);
        this.tries = [];
        this.answer = getNumbers();
      }

      this.value = '';
      this.$refs.answer.focus();
    },
  },
}
</script>

        <style>

</style>
