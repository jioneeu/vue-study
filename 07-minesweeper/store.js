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
        openedCount: 0,
     },
     getters: { 

     },
     mutations: {
        [START_GAME](state, {row, col, mine} ){
            state.data = {
                row, 
                col, 
                mine,
            };
            state.tableData = plantMine(row, col, mine);
            state.timer = 0;
            state.halted = false;
            state.openedCount =  0;
        },
        [OPEN_CELL](state, { row, col }){
            let openedCount = 0;

            const checked = [];
            function checkAround(row, col) { // check surrounding 8 areas
                let outOfBound = row < 0 || row >= state.tableData.length || 
                                 col < 0 || col >= state.tableData[0].length;
                if (outOfBound) { 
                    return;  
                }
                
                if ([CODE.OPENED, 
                     CODE.FLAG, 
                     CODE.MINE, 
                     CODE.FLAG_MINE, 
                     CODE.QUESTION_MINE, 
                     CODE.QUESTION].includes(state.tableData[row][col])) { 
                    return; 
                }

                if (checked.includes(row + '/' + col)) {
                    return;
                } else {
                    checked.push(row + '/' + col);
                }

                let  around = [];

                if(state.tableData[row - 1]) {
                    around = around.concat([
                        state.tableData[row - 1][col - 1], 
                        state.tableData[row - 1][col],
                        state.tableData[row - 1][col + 1]
                    ]);
                }

                around = around.concat([
                    state.tableData[row][col - 1], 
                    state.tableData[row][col + 1],
                ]);

                if(state.tableData[row + 1]) {
                    around = around.concat([
                        state.tableData[row + 1][col - 1],
                        state.tableData[row + 1][col],
                        state.tableData[row + 1][col + 1],
                    ]);
                }

                const counted = around.filter(function (v) {
                    return [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v);
                });
                
                if(counted.length === 0 && row >= -1) { // if no mine's found 
                    const near = [];

                    if (row-1 > -1) {
                        near.push([row - 1, col - 1]);
                        near.push([row - 1, col]);
                        near.push([row - 1, col + 1]);
                    }
                    near.push([row, col - 1]);
                    near.push([row, col + 1]);

                    if (row + 1 < state.tableData.length) {    
                        near.push([row + 1, col - 1]);
                        near.push([row + 1, col]);
                        near.push([row + 1, col + 1]);
                    }

                    near.forEach((n) => {
                        if(state.tableData[n[0]][n[1]] !== CODE.OPENED) {
                            checkAround(n[0], n[1]);
                        }
                    });
                }

                if(state.tableData[row][col] === CODE.NORMAL) {
                    openedCount += 1;
                }
                Vue.set(state.tableData[row], col, counted.length); 
            }

            checkAround(row, col);
            let halted = false;
            let result = ''; 
            if (state.data.row * state.data.col - state.data.mine === state.openedCount + openedCount) {
                halted = true; 
                result = `It took you  ${state.timer} seconds to win the game!`
            } 
            console.log(state.data.row, state.data.col, state.data.mine, state.openedCount, openedCount);
            state.openedCount += openedCount;
            state.halted = halted;
            state.result = result;
        },
        [CLICK_MINE](state, { row, col }) {
            state.halted = true;
            Vue.set(state.tableData[row], col, CODE.CLICKED_MINE);
        },
        [FLAG_CELL](state, { row, col }){
            if (state.tableData[row][col] === CODE.MINE) {
                Vue.set(state.tableData[row], col, CODE.FLAG_MINE);
            } else {
                Vue.set(state.tableData[row], col, CODE.FLAG);
            }
        },
        [QUESTION_CELL](state, { row, col }) {
            if (state.tableData[row][col] === CODE.FLAG_MINE) {
                Vue.set(state.tableData[row], col, CODE.QUESTION_MINE);
            } else {
                Vue.set(state.tableData[row], col, CODE.QUESTION);
            }
        },
        [NORMALIZE_CELL](state, { row, col }){
            if (state.tableData[row][col] === CODE.QUESTION_MINE) {
                Vue.set(state.tableData[row], col, CODE.MINE);
            } else {
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