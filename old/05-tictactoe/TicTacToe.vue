<template>
<div>
    <table-component :table-data="tableData"></table-component>
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
import TableComponent from './TableComponent';

export default {
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
            winner: null,
            draw: false,
            turn: 'O',
            turnCount: 1,
        }
    }, 
    computed: {

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