<template>
    <table>
        <tr-component v-for="(row, rowIndex) in tableData" 
            :key="rowIndex" 
            :row="row" 
            :rowIndex="rowIndex">
        </tr-component>
    </table>
</template>

<script>
import TrComponent from './TrComponent';
 
export default {
    props: {
        tableData: Array,
    },
    components: {
        TrComponent,
    },
}
</script>