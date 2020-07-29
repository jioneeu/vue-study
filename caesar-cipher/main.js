const app = new Vue({
  el: '#root',
  data: {
    shift: 1,
    word: '',
    ciphered: '',
  },
  methods: {
    caesarCipher() {
      let size = this.word.length;
      let newWord = ''

      this.shift = (isNaN(this.shift)) ? 1 : 1*(this.shift);
      for(let i = 0; i<size; i+=1) {
        let ascii = this.convertToAscii(this.word[i]);
        newWord += String.fromCharCode(ascii);
      }
      this.ciphered = newWord;
    },
    convertToAscii(c) {
      let shift = this.shift % 26;
      let charCode = c.charCodeAt(0);
      if (charCode >= 65 && charCode <= 90) {
        if (charCode + shift > 90) {
          charCode = 64 + (charCode + shift) % 90;
        } else {
          charCode += shift;
        }
      }

      return charCode;
    }
  },
})

