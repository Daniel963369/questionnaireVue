


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
            },

            userList:[]
            
        }   
    },


    mounted() {



        // this.questionnaireData = JSON.parse(this.questionnaireContent);
        // console.log(this.questionnaireData);


    // 直接解析传递过来的 JSON 字符串
    const serializedObject = JSON.parse(this.questionnaireContent);
    this.questionnaireData = serializedObject.questionnaire;
    this.question = serializedObject.question_list || [];
    console.log(this.questionnaireData);
    console.log(this.question);
    this.userList.qnId = this.questionnaireData.id
    console.log(this.userList.qnId)


    for(let i = 0;i<this.question.length;i++){
        this.userList.qId = this.question[i].quId
    }
    console.log(this.userList.qId)


    




    },
    methods: {

        goToCheckPage(){
            this.page = 1
        },

        goToHomePage(){
            this.AnswerTransfer();
            this.$router.push('/HomeView')
        },

        AnswerTransfer(){
            const saveUrl = 'http://localhost:8080/api/user/write';

            const dataToSend = {
                userList:this.userList
            }

            for(let i = 0;i<this.question.length;i++){
                this.userList.push({
                    qnId:this.questionnaireData.id,
                    qId:this.question[i].quId,
                    name:this.userList.name,
                    phoneNumber:this.userList.phoneNumber,
                    email:this.userList.email,
                    age:this.userList.age,
                    ans:"紅茶"
                })
            }
            fetch(saveUrl, {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify(dataToSend),
        })
        .catch((error) => {
            console.error("Error saving questionnaire:", error);
            });

            console.log(dataToSend)


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
            <div class="questionnaireTitle">
                <p>{{ questionnaireData.title }}</p>
            </div>
            <div class="questionnaireDesp">
                <p>{{ questionnaireData.description }}</p>
            </div>
        </div>

        <div class="information">
                <div class="name">
                    <label for="">姓名</label>
                    <input type="text" placeholder="請填寫姓名" v-model="userList.name">
                </div>
                <div class="phoneNumber">
                    <label for="">電話號碼</label>
                    <input type="text" placeholder="請填寫電話" v-model="userList.phoneNumber">
                </div>

                <div class="mail">
                    <label for="">Email</label>
                    <input type="text" placeholder="請填寫E-mail"  v-model="userList.email">
                </div>
                <div class="age">
                    <label for="">年齡</label>
                    <input type="text" placeholder="請填寫年齡" v-model="userList.age">
                </div>
        </div>



        <div class="reasonZone">
            <p>請說明理由</p>
            <input type="text">
        </div>

        <div class="voteZone">
        <div v-for="(voteQuestion,index) in question" :key="index">
            <div class="voteTitle">
                <p>{{ voteQuestion.qTitle }}</p>
                <p>請投給下列選項:</p>
            </div>

            <div class="voteRadio">
                <div v-for="(qoption,index) in voteQuestion.option.split(';')" :key="index">
                <input type="radio" value="qoption" v-model="userList.ans">
                <label>{{ qoption }}</label>
                </div>
            </div>
        </div>
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
            <div class="questionnaireTitle1">
                <p>{{ questionnaireData.title }}</p>
            </div>
            <div class="questionnaireDesp1">
                <p>{{ questionnaireData.description }}</p>
            </div>
        </div>

        <div class="information1">
                <div class="name1">
                    <label for="">姓名</label>
                <p>{{userList.name}}</p>
                </div>
                <div class="phoneNumber1">
                    <label for="">電話號碼</label>
                    <p>{{userList.phoneNumber}}</p>
                </div>

                <div class="mail1">
                    <label for="">Email</label>
                    <p><p>{{userList.email}}</p></p>
                </div>
                <div class="age1">
                    <label for="">年齡</label>
                    <p>{{userList.age}}</p>
                </div>
        </div>

        <div class="reasonZone1">
            <p>請說明理由</p>
            <input type="text">
        </div>

        <div class="voteZone1">
        <div v-for="(voteQuestion,index) in question" :key="index">
            <div class="voteTitle1">
                <p>{{ voteQuestion.qTitle }}</p>
                <p>請投給下列選項:</p>
                {{ voteQuestion.option }}
            </div>

            <div class="voteRadio1">
            </div>
        </div>
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
    background-color:darkcyan;

    .questionnaireData{
        width:100%;


        .questionnaireTime{
            font-size:18pt;
            color:beige;
            display:flex;
            width:100%;
            margin-left:80%;
        }

        .questionnaireTitle{
            text-align:center;
            font-size:26pt;
            color:beige;
            font-weight:bold;
        }

        .questionnaireDesp{
            font-size:16pt;
            color:beige;
            text-align:center;
        }
    }

        .voteZone{
            text-align:center;
            flex-direction:column;
            margin-top:5%;


            .voteTitle{
                text-align:center;
                color:beige;
            }
            .voteRadio{
                width:100vw;
                display:flex;
                flex-direction:column;
                color:beige;
                margin-bottom:3%;
            }
        }




    .information{
        width:100vw;
        text-align:center;
        margin-top:2%;
        
        .name{
            margin-bottom:1%;
            color:beige;
        }
        .phoneNumber{
            margin-right:2%;
            margin-bottom:1%;
            color:beige;
        }

        .mail{
            margin-right:0.5%;
            margin-bottom:1%;
            color:beige;
        }

        .age{
            color:beige;
        }
    }



    .reasonZone{
        text-align:center;
        margin-top:2%;
        color:beige;
        p{
            margin-left:2%;
        }

        input{
            margin-left:3%;
        }
    }

    .checkButtonZone{
        margin-left:60%;
        margin-top:3%;
        button{
            width:5vw;
            background-color:blue;
            color:white;
        }
    }

}

.checkAnswerZone{
    width:100%;
    height:100%;
    background-color:darkcyan;

        .questionnaireData1{
            width:100%;


        .questionnaireTime1{
            font-size:18pt;
            color:beige;
            display:flex;
            width:100%;
            margin-left:80%;
        }

        .questionnaireTitle1{
            text-align:center;
            font-size:26pt;
            color:beige;
            font-weight:bold;
        }

        .questionnaireDesp1{
            font-size:16pt;
            color:beige;
            text-align:center;
        }
    }



        .information1{
            width:100vw;
            text-align:center;
            margin-top:2%;
            
            .name1{
                margin-bottom:1%;
                color:beige;
            }
            .phoneNumber1{
                margin-right:2%;
                margin-bottom:1%;
                color:beige;
            }

            .mail1{
                margin-right:0.5%;
                margin-bottom:1%;
                color:beige;
            }

            .age1{
                margin-right:0.5%;
                margin-bottom:1%;
                color:beige;
            }
        }

        .reasonZone1{
            text-align:center;
            margin-top:2%;
            color:beige;
        }

        
        .voteZone1{
            text-align:center;
            flex-direction:column;
            margin-top:5%;


            .voteTitle1{
                text-align:center;
                color:beige;
            }
            .voteRadio1{
                width:100vw;
                display:flex;
                flex-direction:column;
                color:beige;
                margin-bottom:3%;
            }
        }

        .checkButtonZone{
            margin-left:60%;
            margin-top:3%;
        }
    }






</style>


