<template>
    <td @click="onClickTd">{{cellData}}</td>
</template>

<script>
export default {
    props: {
         cellData: String,
         rowIndex: Number,
         cellIndex: Number, 
    }, 
    methods: {
        check(a, b, c) {
            let str = a+b+c;
            if (str === "OOO" || str === "XXX") return true;
            else return false;
        },
        checkWinner(rootData) {
            const board = rootData.tableData;
            const ri = this.rowIndex;
            const ci = this.cellIndex;

            // horizontal check
            if (this.check(board[ri][0], board[ri][1], board[ri][2])) return true;
            
            // vertical check  
            if (this.check(board[0][ci], board[1][ci], board[2][ci])) return true;
        
            // diagonal check
            if (this.check(board[0][0], board[1][1], board[2][2])) return true;
            if (this.check(board[0][2], board[1][1], board[2][0])) return true;

            return null;
        },
        onClickTd() { 
            const rootData = this.$root.$data;
            
            // check if cell is empty 
            if(!this.cellData) {
                this.$set(rootData.tableData[this.rowIndex], this.cellIndex, rootData.turn);
                let win = this.checkWinner(rootData);

                // if nobody won and the board is full
                if(!win && rootData.turnCount === 9) {
                    rootData.draw = true;
                    setTimeout(() => {
                        rootData.tableData = [['','',''], ['','',''], ['','','']];
                        rootData.turn = 'O';
                        rootData.turnCount = 1;
                        rootData.winner = null;
                        rootData.draw = false;
                    }, 2000);
                // if the board is not full yet
                } else {
                    rootData.turnCount += 1;

                    if (win === true) {
                        rootData.winner = rootData.turn;
                        // reset initial values
                        setTimeout(() => {
                            rootData.tableData = [['','',''], ['','',''], ['','','']];
                            rootData.turn = 'O';
                            rootData.turnCount = 1;
                            rootData.winner = null;
                        }, 2000);
                    }
                    rootData.turn = rootData.turn === 'O' ?  'X' : 'O';
                }
            }
        }
    }
}
</script>