


<script>
// 在 Answer.vue 组件中

export default {

    props: {
        questionnaireId: {
            type:Object,
            required: true,
    },
  },
    data(){
        return{
            questionnaireData:[],
            answerQuestion:{},
            question:[],
            
        }
    },


    mounted() {

        const serializedObject = JSON.parse(this.questionnaireId)
        this.questionnaireData = serializedObject
        console.log(this.questionnaireData)

        
        const questionJSON = this.$route.query.question;
        if (questionJSON) {
        // 將 JSON 字串轉換回陣列
        this.question = JSON.parse(questionJSON);
        
        // 現在你可以在這裡使用 this.question
        console.log(this.question);
    }
    this.answerQuestion = this.question


    },
    methods: {
    },
};
</script>



<template>

<p>{{ questionnaireData }}</p>
<p>{{ answerQuestion }}</p>

</template>


<style lang="scss" scoped></style>


