<template>
    <table>
        <tr v-for="(rowData, rowIndex) in tableData" :key="rowIndex">
            <td v-for="(colData, colIndex) in rowData" 
                :key="colIndex" 
                :style="colDataStyle(rowIndex, colIndex)" 
                @click="onClickTd(rowIndex, colIndex)"
                @contextmenu.prevent="onRightClickTd(rowIndex, colIndex)">
                {{colDataText(rowIndex, colIndex)}}
            </td>
        </tr>
    </table>
</template>

<script>
import { mapState } from 'vuex';
import { CODE, 
         OPEN_CELL, 
         FLAG_CELL,
         QUESTION_CELL,
         NORMALIZE_CELL, 
         CLICK_MINE} from './store';
export default {
    computed: {
        ...mapState(['tableData', 'halted']),
        colDataStyle(state) { 
            return (row, col) => {
                switch(this.$store.state.tableData[row][col]) {
                    case CODE.NORMAL:
                    case CODE.MINE:
                        return {
                            background: '#444',
                        };
                    case CODE.CLICKED_MINE:
                        return {
                            background: '#f00',
                            fontWeight: 'bold',
                            fontSize: '1.5em',
                        }
                    case CODE.REST_MINE:
                        return {
                            background: '#ffbbbb',
                            fontWeight: 'bold',
                            fontSize: '1.5em',  
                        }
                    case CODE.OPENED:
                        return {
                            background: 'white',
                        };
                    case CODE.FLAG:
                    case CODE.FLAG_MINE:
                        return {
                            color: 'red',
                            background: 'yellow',
                            fontSize: '2em',
                            fontWeight: 'bold',
                        };
                    case CODE.QUESTION:
                    case CODE.QUESTION_MINE: 
                        return {
                            background: 'yellow',
                            fontSize: '2em',
                            fontWeight: 'bold',
                        };
                    default: 
                        return {};
                } 
            }
        },
        colDataText() {
            return (row, col) => {
                switch(this.$store.state.tableData[row][col]) {
                    case CODE.MINE: 
                        return 'X';
                    case CODE.NORMAL:
                        return '';
                    case CODE.FLAG_MINE:
                    case CODE.FLAG:
                        return '!';
                    case CODE.QUESTION_MINE:
                    case CODE.QUESTION:
                        return '?';
                    case CODE.CLICKED_MINE:
                    case CODE.REST_MINE:
                        return '*';
                    default:
                        return this.$store.state.tableData[row][col] || '';
                }
            }
        },
    },
    methods: {
        onClickTd(row, col) {
            if (this.halted) {
                return;
            }

            switch(this.tableData[row][col]) {
                case CODE.NORMAL:
                    return this.$store.commit(OPEN_CELL, { row, col });
                case CODE.MINE:
                    return this.$store.commit(CLICK_MINE, { row, col });
                default:
                    return ;
            }
        },
        onRightClickTd(row, col) {
            if (this.halted) {
                return;
            }
            console.log(row, col);
            switch(this.tableData[row][col]) {
                case CODE.NORMAL:
                case CODE.MINE:
                    console.log('normal');
                    this.$store.commit(FLAG_CELL, { row, col });
                    return;
                case CODE.FLAG_MINE:
                case CODE.FLAG:
                    console.log('flag');
                    this.$store.commit(QUESTION_CELL, { row, col })
                    return;
                case CODE.QUESTION_MINE:
                case CODE.QUESTION:
                    console.log('question');
                    this.$store.commit(NORMALIZE_CELL, { row, col })
                    return;
                default:
                    return;
            }
        }
    }
}
</script>