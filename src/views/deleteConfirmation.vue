<script>


export default{

    props:['show'],

    methods:{
        cancel(){
            this.$emit('cancel');
        },

        confirm(){
            this.$emit('confirm')
        }
    }
}


</script>

<template>

<div v-if="show">
    <div class="body">
        <div class="modalContent">
            <p>確定刪除?</p>

            <button @click="cancel">取消</button>
            <button @click="confirm">刪除</button>
        </div>
    </div>  

</div>


</template>

<style lang="scss">

.modalContent{
    width:100vw;
    margin-left:50%;
}


</style>