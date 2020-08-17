import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const START_GAME = 'START_GAME';
export const OPEN_CELL = 'OPEN_CELL';
export const CLICK_MINE = 'CLICK_MINE';
export const FLAG_CELL = 'FLAG_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const NORMALIZE_CELL = 'NORMALIZE_CELL';
export const INCREMENT_TIMER = 'INCREMENT_TIMER';

export const CODE = {
    MINE: -7,
    NORMAL: -1, 
    QUESTION: -2,
    FLAG: -3,
    QUESTION_MINE: -4,
    FLAG_MINE: -5,
    CLICKED_MINE: -6,
    OPENED: 0,
};

const plantMine = (row, col, mine) => {
    const candidate = Array(row * col).fill().map((arr,i) => {
        return i;
    });
    const shuffle = [];

    while (candidate.length > row * col - mine) {
        const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
        shuffle.push(chosen);
    }

    const data = [];
    for(let i=0; i<row; ++i) {
        const rowData = [];
        data.push(rowData);
        for (let j=0; j<col; ++j) {
            rowData.push(CODE.NORMAL);
        }
    }

    for(let k=0; k<shuffle.length; ++k) {
        const ver = Math.floor(shuffle[k] / col);
        const hor = shuffle[k] % col; 
        data[ver][hor] = CODE.MINE;
    }

    return data;
};

export default new Vuex.Store({
     state: {
        tableData: [],
        data: {
            row: 0,
            col: 0,
            mine: 0,
        },
        timer: 0,
        halted: true,
        result: '',
     },
     getters: { 

     },
     mutations: {
        [START_GAME](state, {row, col, mine} ){
            state.date = {
                row, 
                col, 
                mine,
            };
            state.tableData = plantMine(row, col, mine);
            state.timer = 0;
            state.halted = false;
        },
        [OPEN_CELL](state, { row, col }){
            Vue.set(state.tableData[row], col, CODE.OPENED);
        },
        [CLICK_MINE](state) {

        },
        [FLAG_CELL](state, { row, col }){
            if (state.tableData[row][col] === CODE.MINE) {
                console.log('mine-flag');
                Vue.set(state.tableData[row], col, CODE.FLAG_MINE);
            } else {
                console.log('normal-flag');
                Vue.set(state.tableData[row], col, CODE.FLAG);
            }
        },
        [QUESTION_CELL](state, { row, col }) {
            if (state.tableData[row][col] === CODE.FLAG_MINE) {
                console.log('mine-flag-question');
                Vue.set(state.tableData[row], col, CODE.QUESTION_MINE);
            } else {
                console.log('normal-flag-question');
                Vue.set(state.tableData[row], col, CODE.QUESTION);
            }
        },
        [NORMALIZE_CELL](state, { row, col }){
            if (state.tableData[row][col] === CODE.QUESTION_MINE) {
                console.log('mine-flag-question-mine');
                Vue.set(state.tableData[row], col, CODE.MINE);
            } else {
                console.log('normal-flag-question-normal');
                Vue.set(state.tableData[row], col, CODE.NORMAL);
            }
        },
        [INCREMENT_TIMER](state){
            state.timer += 1;
        }, 
     },
     actions: {

     }
});