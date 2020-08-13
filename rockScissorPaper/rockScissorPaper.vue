<template>
  <div>
    <div id="computer" :style="computedStyleObject"></div>
    <div>
      <button @click="onClickButton('rock')">Rock</button>
      <button @click="onClickButton('scissor')">Scissor</button>
      <button @click="onClickButton('paper')">Paper</button>
    </div>
    <div> {{ result }} </div>
    <div>Points: {{ score }}</div>
  </div>
</template>

<script>
  const rspCoords = { 
    rock: '0',
    scissor: '-142px',
    paper: '-284px',
  };

  const scores = {
    scissor: 1,
    rock: 0,
    paper: -1,  
  };

  const computerChoice = (imgCoord) => {
    return Object.entries(rspCoords).find(function (v) {
      return v[1] === imgCoord;
    })[0];j
  };

  let interval = null;

  export default {
    data() {
      return {
        imgCoord: rspCoords.rock,
        result: '',
        score: 0,
      };
    },
    methods: {
      changeHand() {
          interval = setInterval(() => {
            if (this.imgCoord === rspCoords.rock) {
              this.imgCoord = rspCoords.scissor;
            } else if (this.imgCoord === rspCoords.scissor) {
              this.imgCoord = rspCoords.paper;
            } else {
              this.imgCoord = rspCoords.rock;
            }
          }, 100);
      },
      onClickButton(choice) {
        clearInterval(interval);
        const myScore = scores[choice];
        const cpuScore = scores[computerChoice(this.imgCoord)];
        const diff = myScore - cpuScore;
        if (diff === 0) {
          this.result = "draw";
        } else if ([-1, 2].includes(diff)) {
          this.result = 'I won';
          this.score += 1;
        } else {
          this.result = 'I lost';
          this.score -= 1;
        }
        setTimeout(() => {
          this.changeHand();
        }, 1000);
      }
    },
    computed: {
      computedStyleObject() {
        return {
          background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${this.imgCoord} 0`,
        };
      }
    },
    beforeCreate() {
      console.log('beforeCreated');
    },
    created() {
      console.log('created');
    },
    beforeMount() {
      console.log('beforeMounted')
    },
    mounted() {
      console.log('mounted');
      this.changeHand();
    },
    beforeUpdate() {
      console.log('beforeMount')
    },
    updated() {
      console.log('updated')
    },
    beforeDestroy() {
      console.log('before destroy');
      clearInterval(interval); // memory leak
    },
    destroyed() {
      console.log('destroyed');
    },
  }
</script>

<style scoped>
  #computer {
    width: 142px;
    height: 200px;
  }
</style>
