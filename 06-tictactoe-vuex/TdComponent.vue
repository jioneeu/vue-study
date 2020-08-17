<template>
    <td @click="onClickTd">{{cellData}}</td>
</template>

<script>
import { mapState } from 'vuex';
import { NO_WINNER, 
        CLICK_CELL, 
        SET_WINNER, 
        RESET_GAME,
        CHANGE_TURN, 
        INCREASE_TURN_COUNT } from './store';

export default {
    props: {
         rowIndex: Number,
         cellIndex: Number,  
    }, 
    computed: {
        ...mapState({
            tableData: state => state.tableData,
            turn: state => state.turn, 
            turnCount: state => state.turnCount, 
            cellData: state => state.tableData[rowIndex][cellIndex],
        }),
        cellData() {
            return this.$store.state.tableData[this.rowIndex][this.cellIndex];
        },

    },
    methods: {
        check(a, b, c) {
            let str = a+b+c;
            if (str === "OOO" || str === "XXX") return true;
            else return false;
        },
        checkWinner() {
            const board = this.tableData;
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
            console.log('onClickTd');        
            // check if cell is empty 
            if(!this.cellData) {
                this.$store.commit(CLICK_CELL, {row: this.rowIndex, col: this.cellIndex});
                let win = this.checkWinner();

                // if nobody won and the board is full
                if(!win && this.turnCount === 9) {
                    this.$store.commit(NO_WINNER);
                    setTimeout(() => {
                        this.$store.commit(RESET_GAME);
                    }, 2000);
                // if the board is not full yet
                } else {
                    this.$store.commit(INCREASE_TURN_COUNT);

                    if (win === true) {
                        this.$store.commit(SET_WINNER, this.turn);
                        // reset initial values
                        setTimeout(() => {
                            this.$store.commit(RESET_GAME);
                        }, 2000);
                    }
                    this.$store.commit(CHANGE_TURN);
                }
            }
        }
    }
}
</script>