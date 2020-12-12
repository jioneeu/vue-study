import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const NO_WINNER = 'NO_WINNER';
export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const RESET_GAME = 'RESET_GAME';
export const CHANGE_TURN = 'CHANGE_TURN';
export const INCREASE_TURN_COUNT = 'INCREASE_TURN_COUNT';

export default new Vuex.Store({
     state: {
        tableData: [
            ['', '', ''], 
            ['', '', ''], 
            ['', '', ''],
        ],
        winner: null,
        draw: false,
        turn: 'O',
        turnCount: 1,
     },
     getters: { 

     },
     mutations: {
        [SET_WINNER](state, winner) {
             state.winner  = winner;
        },
        [CLICK_CELL](state, { row, col }) {
          Vue.set(state.tableData[row], col,  state.turn);
        },
        [CHANGE_TURN](state) {
            state.turn = state.turn === 'O' ? 'X' : 'O';
        },
        [NO_WINNER](state) {
            state.draw = true;
            [RESET_GAME];
        },
        [INCREASE_TURN_COUNT](state) {
            state.turnCount += 1;
        },
        [RESET_GAME](state) {
            state.turn = 'O';
            state.tableData = [
                ['', '', ''],
                ['', '', ''],
                ['', '', '']
            ];
            state.turnCount = 1;
            state.draw = false;
            state.winner = null;
        },
     },
     actions: {

     }
});