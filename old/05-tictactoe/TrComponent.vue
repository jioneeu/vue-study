<template>
    <tr>
        <td-component v-for="(cellData, index) in row"
            :key="index"
            :cell-data="cellData"
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
    props: {
        row: Array,
        rowIndex: Number, 
    },
}
</script>