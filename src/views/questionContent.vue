<script>
import questionflow from '../components/questionflow.vue';
export default {
    data(){
        return{
            qdesp:"",
            qTitle:"",
            qdesp:"",
            startDate:"",
            endDate:"",
            question_list:[
                {
                    option: ""
                }
            ],
            key:0,

            quizData:[],

            personInformation:{
                name:"",
                phoneNumber:"",
                email:"",
                age:"",
                radioValue:"",
            },
            controlPage:0,
        }
    },

    mounted(){
        this.fetchData();
    },

    components:{
        questionflow
    },
    methods:{
        toFlowPage(){
            this.controlPage = 1
        },

        fetchData(){
            const url = 'http://localhost:8080/api/quiz/search';
            // 要帶入的值
            const queryParams = {
            title:this.searchName,
            startDate:"",
            endDate:"",
            };
            
            const filteredParams = Object.fromEntries(Object.entries(queryParams).filter(([_, v]) => v !== null && v !== undefined));

            const queryParamsString = new URLSearchParams(filteredParams).toString();

            // 將查詢字串附加到 URL
            const urlWithParams = `${url}?${queryParamsString}`;

            fetch(urlWithParams, {
            method: "GET", 
            headers: new Headers({
                "Content-Type": "application/json",
            }),
            })
            .then((res) => res.json())
            .catch((error) => console.error("Error:", error))
            .then((response) => {
                this.quizData = response.quizVoList;
                console.log(this.quizData)
                this.quizData.forEach((quiz) => {
                    this.qTitle = quiz.questionnaire.title;
                    this.qdesp = quiz.questionnaire.description;
                    this.startDate = quiz.questionnaire.startDate;
                    this.endDate = quiz.questionnaire.endDate;
                    this.question_list.option = quiz.question_list.option
                });
            });
        }
    }
}


</script>

<template>
<div class="body" v-if="controlPage == 0">
    <div class="voteDate">
        <time datetime="2023/10/31">{{ startDate + "~" }}</time>
        <time datetime="2023/11/07">{{ endDate }}</time>
    </div>
    <div class="designTitle">
        <h1>{{qTitle}}</h1>
    </div>

    <div class="designDescription">

        <p>{{qdesp}}</p>
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
            <input type="text" placeholder="請填寫E-mail" v-model="personInformation.email">
        </div>
        <div class="age">
            <label for="">年齡</label>
            <input type="text" placeholder="請填寫年齡" v-model="personInformation.age">
        </div>
    </div>

    <div class="voteZone">
        <p>請投給以下一位</p>
        <div class="voteRadio">
                <div v-for="(qoption,index) in question_list.option" :key="index">
                    <input type="radio" :value="qoption">
                    <label>{{ qoption }}</label>
                </div>
        </div>
    </div>

    <div class="btn">
        <button type="button" class="cancelBtn">取消</button>
        <button type="button" class="checkBtn" @click="toFlowPage">送出</button>
        <button type="button" @click="fetchData">印出資料</button>
    </div>
</div>

<div class="questionZone" v-if="controlPage == 1">
    <questionflow  :flow="personInformation"/>
</div>


</template>


<style lang="scss" scoped>
.body{
    width:100vw;
    background-color:aqua;
    position:relative;
    .voteDate{
        position:absolute;
        left:80%;
        top:0%;
        font-size:16pt;
        background-color:black;
        color:white;
    }
    .designTitle{
        text-align:center;
        margin-top:9%;
    }

    .designDescription{
        text-align:center;
        margin-top:3%;
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

    .voteZone{
            text-align:center;
            flex-direction:column;
            margin-top:7%;
            margin-right:20%;

            .voteRadio{
                width:100vw;
                display:flex;
                flex-direction:column;
            }

            .N1{
                display:flex;
                justify-content: center;
                margin-right:20%;
                
                label{
                    margin-left:5%;
                }
            }
            .N2{
                display:flex;
                justify-content: center;
                margin-right:20%;

                label{
                    margin-left:5%;
                }
            }
            .N3{
                display:flex;
                justify-content: center;
                margin-right:20%;

                label{
                    margin-left:5%;
                }
            }
            .N4{
                display:flex;
                justify-content: center;
                margin-right:20%;

                label{
                    margin-left:5%;
                }
            }
        }

        .btn{
            width:100vw;

            .cancelBtn{
                margin-left:30%;
            }

            .checkBtn{
                margin-left:5%;
            }
        }
}
</style>