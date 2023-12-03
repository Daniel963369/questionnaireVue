


<script>
// 在 Answer.vue 组件中

export default {

    props: {
        questionnaireContent: {
            type:String,
            required: true,
    },
  },
    data(){
        return{
            questionnaireData:[],
            answerQuestion:{},
            question:[],
            page:0,

            personInformation:{
                name:"",
                phoneNumber:"",
                email:"",
                age:"",
                radioValue:"",
            },
            
        }
    },


    mounted() {



        // this.questionnaireData = JSON.parse(this.questionnaireContent);
        // console.log(this.questionnaireData);


    // 直接解析传递过来的 JSON 字符串
    const serializedObject = JSON.parse(this.questionnaireContent);
    this.questionnaireData = serializedObject.questionnaire;
    this.question = serializedObject.question || [];
    console.log(this.questionnaireData);
    console.log(this.question);




    },
    methods: {

        goToCheckPage(){
            this.page = 1
        },

        goToHomePage(){
            this.$router.push('/HomeView')
        }
    },
};
</script>



<template>
    <div class="answerZone" v-if="page == 0">
        <div class="questionnaireData">
            <div class="questionnaireTime">
                <p>{{ questionnaireData.startDate + "~" }}</p>
                <p>{{ questionnaireData.endDate}}</p>
            </div>
            <p>{{ questionnaireData.title }}</p>
            <p>{{ questionnaireData.description }}</p>
        </div>

        <div class="information">
                <div class="name">
                    <label for="">姓名</label>
                    <input type="text" placeholder="請填寫姓名" v-model="personInformation.name">
                </div>
                <div class="phoneNumber">
                    <label for="">電話號碼</label>
                    <input type="text" placeholder="請填寫電話" v-model="personInformation.phoneNumber">
                </div>

                <div class="mail">
                    <label for="">Email</label>
                    <input type="text" placeholder="請填寫E-mail"  v-model="personInformation.email">
                </div>
                <div class="age">
                    <label for="">年齡</label>
                    <input type="text" placeholder="請填寫年齡" v-model="personInformation.age">
                </div>
        </div>



        <div class="reasonZone">
            <p>請說明理由</p>
            <input type="text">
        </div>

        <div class="checkButtonZone">

        <button type="button" @click="goToCheckPage">送出</button>
        </div>
</div>


<div class="checkAnswerZone" v-if="page == 1">

        <div class="questionnaireData1">
            <div class="questionnaireTime1">
                <p>{{ questionnaireData.startDate + "~" }}</p>
                <p>{{ questionnaireData.endDate}}</p>
            </div>
            <p>{{ questionnaireData.title }}</p>
            <p>{{ questionnaireData.description }}</p>
        </div>

        <div class="information1">
                <div class="name1">
                    <label for="">姓名</label>
                <p>{{personInformation.name}}</p>
                </div>
                <div class="phoneNumber1">
                    <label for="">電話號碼</label>
                    <p>{{personInformation.phoneNumber}}</p>
                </div>

                <div class="mail1">
                    <label for="">Email</label>
                    <p><p>{{personInformation.email}}</p></p>
                </div>
                <div class="age1">
                    <label for="">年齡</label>
                    <p>{{personInformation.age}}</p>
                </div>
        </div>

        <div class="reasonZone1">
            <p>請說明理由</p>
            <input type="text">
        </div>




        <div class="checkButtonZone">

        <button type="button" @click="goToHomePage">送出</button>
        </div>


</div>

</template>


<style lang="scss" scoped>
.answerZone{
    width:100%;
    height:100%;
    background-color:palegreen;

    .questionnaireData{
        width:100%;


        .questionnaireTime{
            display:flex;
            width:100%;
            margin-left:80%;
        }

        p{
            text-align:center;
        }
    }





    .information{
        width:100vw;
        text-align:center;
        margin-top:2%;
        
        .name{
            margin-bottom:1%;
        }
        .phoneNumber{
            margin-right:2%;
            margin-bottom:1%;
        }

        .mail{
            margin-right:0.5%;
            margin-bottom:1%;
        }
    }



    .reasonZone{
        text-align:center;
        margin-top:2%;
    }

    .checkButtonZone{
        margin-left:60%;
        margin-top:3%;
    }

}

.checkAnswerZone{
    width:100%;
    height:100%;
    background-color:palegreen;

        .questionnaireData1{
            width:100%;


        .questionnaireTime1{
            display:flex;
            width:100%;
            margin-left:80%;
        }

        p{
            text-align:center;
        }
    }



        .information1{
            width:100vw;
            text-align:center;
            margin-top:2%;
            
            .name{
                margin-bottom:1%;
            }
            .phoneNumber{
                margin-right:2%;
                margin-bottom:1%;
            }

            .mail{
                margin-right:0.5%;
                margin-bottom:1%;
            }
        }

        .reasonZone1{
            text-align:center;
            margin-top:2%;
        }

        .checkButtonZone{
            margin-left:60%;
            margin-top:3%;
        }
    }






</style>


