<template>
<div>
    <table-component></table-component>
    <div v-if="draw">
        Draw!
    </div>
    <div v-else-if="winner == null">
        It's <b>{{turn}}</b>  's turn
    </div>
    <div v-else-if="winner != null">
        <b>{{winner}}</b> won the game!
    </div>
</div>
</template>

<script>
import { mapState } from 'vuex';
import store from './store';
import TableComponent from './TableComponent';

export default {
    store,
    components: {
        TableComponent,
    },
    data() {
        return {
            tableData: [
                ['', '', ''], 
                ['', '', ''], 
                ['', '', ''],
            ],
        }
    }, 
    computed: {
        ...mapState(['winner', 'turn', 'turnCount', 'draw']),
        ...mapState({
            winner: state => state.winner,
            turn: state => state.turn, 
            turnCount: state => state.turnCount,
            draw: state => state.draw,
        }),
    },
    methods: {

    },
}
</script>

<style>
     table {
         border-collapse: collapse;
     }
     td {
         border: 1px solid black;
         width: 40px;
         height: 40px;
         text-align: center;
     }
</style>