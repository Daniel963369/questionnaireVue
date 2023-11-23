<script>
import questionflow from '../components/questionflow.vue';
export default {
    data(){
        return{
            vote:{
                number:"001",
                title:"最強本土劇演員票選",
            },

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
    components:{
        questionflow
    },
    methods:{
        toFlowPage(){
            this.controlPage = 1
        },
    }
}


</script>

<template>
<div class="body" v-if="controlPage == 0">
    <div class="voteDate">
        <time datetime="2023/10/31">{{ nowTime }}</time>
        <time datetime="2023/11/07">202311/07</time>
    </div>
    <div class="designTitle">
        <h1>{{vote.title}}</h1>
    </div>

    <div class="designDescription">
        <p>投給你最喜歡的本土劇演員，並為他加油打氣，一個人只有一票。注意請留真實資料，不要洗票喔!</p>
        <p>活動完成後，會送出小禮物，屆時將進行公平抽獎，所以記得要留EMAIL以及手機。</p>
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
            <div class="N1">
                <input type="radio" value="劉文聰" v-model="personInformation.radioValue">
                <label for="">劉文聰</label>
            </div>
            <div class="N2">
                <input type="radio" value="黃志中" v-model="personInformation.radioValue">
                <label for="">黃志中</label>
            </div>
            <div class="N3">
                <input type="radio" value="葉美琪" v-model="personInformation.radioValue">
                <label for="">葉美琪</label>
            </div>
            <div class="N4">
                <input type="radio" value="黃志龍" v-model="personInformation.radioValue">
                <label for="">黃志龍</label>
            </div>
        </div>
    </div>

    <div class="btn">
        <button type="button" class="cancelBtn">取消</button>
        <button type="button" class="checkBtn" @click="toFlowPage">送出</button>
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