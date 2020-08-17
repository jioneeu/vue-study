<template>
    <tr>
        <td-component v-for="(cellData, index) in row"
            :key="index"
            :cell-index="index"
            :row-index="rowIndex">
        </td-component>
    </tr>
</template>

<script>
import TdComponent from './TdComponent'; 

export default {
    components: {
        TdComponent,
    },
    computed: {
        row() {
            return this.$store.state.tableData[this.rowIndex];
        }
    },
    props: {
        rowIndex: Number, 
    },
}
</script>