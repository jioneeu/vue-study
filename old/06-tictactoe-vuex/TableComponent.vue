<template>
    <table>
        <tr-component v-for="(row, rowIndex) in tableData" 
            :key="rowIndex" 
            :rowIndex="rowIndex">
        </tr-component>
    </table>
</template>

<script>
import TrComponent from './TrComponent';
 
export default {
    computed: {
        tableData() {
            return this.$store.state.tableData;
        }
    },
    components: {
        TrComponent,
    },
}
</script>