<script>
export default{
    data(){
        return{
            questionnaire:{
                title:"",
                description:"",
                published:"",
                startDate:null,
                endDate:null,
            },

            question_list:[
                {
                    quId:0,
                    qTitle: "",
                    optionType: "",
                    necessary:false,
                    option: ""
                }
            ],


            question:[],

            controlPage:0
        }
    },

    mounted(){
        const startDate = document.getElementById("startDate")
        const currentDate = new Date()
        const day = {day:'numeric'}
        const year = {year:'numeric'}
        const month = {month:'long'}
        const today = currentDate.toLocaleString(undefined,day).slice(0,-1)
        const tomonth = currentDate.toLocaleString(undefined,month).slice(0,-1)
        const toyear = currentDate.toLocaleString(undefined,year).slice(0,-1)
        const defaultDate =[toyear,tomonth,today].join('-')
        startDate.value = defaultDate

        this.currentDate =[toyear,tomonth,today].join('-')



        // const finalDate = document.getElementById("finalDate")
        // var plusDate =new Date().getDate()
        // const sevenDate =new Date().setDate(plusDate + 7)
        // const sevenDatetime = new Date(sevenDate)



        // const todayAfterSeven =sevenDatetime.toLocaleString(undefined,day).slice(0,-1)
        // const tomonthAfterSeven =sevenDatetime.toLocaleString(undefined,month).slice(0,-1)
        // const toyearAfterSeven =sevenDatetime.toLocaleString(undefined,year).slice(0,-1)
        // const defaultDateAfterSeven = [toyearAfterSeven,tomonthAfterSeven,todayAfterSeven].join('-')
        // console.log(defaultDateAfterSeven)
        // finalDate.value = defaultDateAfterSeven
        // console.log(finalDate.value)
        this.fetchData();
    },




    methods:{

        transmitQu(){
            const newQuId = this.question.length + 1
            this.question.push({quId:newQuId,qTitle:this.question_list.qTitle,optionType:this.question_list.optionType
            ,isNecessary:this.question_list.necessary, option:this.question_list.option})

            console.log(this.question)
            console.log(this.questionnaire)
        },

        goToAddPageQu(){
            this.controlPage = 1
        },

        goToCheckPage(){
            this.controlPage = 2
        },

        submitQuestionnaire() {
      // 做一些前端驗證，確保資料有效性

      // 發送 POST 請求到後端 API
            this.saveQuestionnaire();
            this.$router.push('/HomeView')
        },

        timeAnalysis(){
            const currentDate = new Date();
            if(this.questionnaire.startDate && this.questionnaire.endDate){
                const startDate = new Date(this.questionnaire.startDate);
                const endDate = new Date(this.questionnaire.endDate)
                if(startDate > currentDate){
                this.questionnaire.published = false

            }else if(startDate < currentDate && currentDate < endDate){
                this.questionnaire.published = true
            }
                else if(currentDate > endDate){
                this.questionnaire.published = true

            }
            }
        },


        saveQuestionnaire() {
        const saveUrl = "http://localhost:8080/api/quiz/create";
        const dataToSend = {
            questionnaire:this.questionnaire,
            question_list:this.question
        }
        fetch(saveUrl, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
        body:JSON.stringify(dataToSend),
        })
            .then((response) => response.json())
            .then((data) => {
            console.log("Questionnaire saved successfully", data);
            // 在這裡可以執行成功保存後的操作
            })
            .catch((error) => {
            console.error("Error saving questionnaire:", error);
            });

            console.log(dataToSend)
        },

        goToNextPage() {
        // 在這裡可以執行一些前端操作
        // 例如驗證資料是否填寫完整、格式是否正確等
        // 如果通過驗證，再調用 submitQuestionnaire 方法
        // this.submitQuestionnaire();
        // 你也可以添加其他邏輯，例如跳轉到下一頁
        this.goToAddPageQu();
    },
    }
}

</script>



<template>
<div class="body" v-if="controlPage ==0">
    <div class="header">
        <p class="headerTitle">火星村網路投票網</p>
        <div class="membership">
            <i class="fa-solid fa-user"></i>
            <p>會員登入</p>
        </div>
    </div>
    <div class="title">
        <p>問卷</p>
        <p>題目</p>
        <p>問卷回饋</p>
        <p>統計</p>
    </div>
        
    <div class="content">
            <div class="qnTitle">
                <p>問卷名稱:</p>
                <input type="text" v-model="questionnaire.title">
            </div>

            <div class="qndesp">
                <p>問卷說明:</p>
                <input type="text"  v-model="questionnaire.description">
            </div>

            <div class="startTime">
                <p>開始時間:</p>
                <input type="date" id="startDate"  v-model="questionnaire.startDate">
            </div>

            <div class="endTime">
                <p>結束時間:</p>
                <input type="date" id="endDate"  v-model="questionnaire.endDate" @input="timeAnalysis">
            </div>

            <div class="buttonZone">
                <button type="button">取消</button>
                <button type="button" @click="goToNextPage">下一步</button>
            </div>

        </div>
    </div>



<div class="quZone" v-if="controlPage == 1">
    <div class="quheader">
        <p class="quheaderTitle">火星村網路投票網</p>
        <div class="qumembership">
            <i class="fa-solid fa-user"></i>
            <p>會員登入</p>
        </div>
    </div>

    
    <div class="qutitle">
        <p>問卷</p>
        <p>題目</p> 
        <p>問卷回饋</p>
        <p>統計</p>
    </div>

    <div class="questionZone">
        <p>問題</p>
        <input type="text" v-model="question_list.qTitle">
        <div class="typeZone">
            <select v-model="question_list.optionType">
                <option value="">--請選擇題型--</option>
                <option value="multi">多選題</option>
                <option value="single">單選題</option>
            </select>
        </div>
        <div class="necessaryZone">
            <input type="checkbox" name="" id="" v-model="question_list.necessary">必填
        </div>
    </div>

    <div class="opZone">
        <p>選項:</p>
        <input type="text" v-model="question_list.option">
        <button type="button" @click="transmitQu">加入</button>
    </div>

    <i class="fa-solid fa-trash"></i>

    <div class="deletequZone">
        <div class="deleteheader">
            <table>
                <tr>
                    <td>編號</td>
                    <td>內容</td>
                    <td>問題種類</td>
                    <td>必填</td>
                    <td>編輯</td>
                </tr>
                <tr v-for="(qu,index) in question" :key="index">
                    <td>{{ qu.quId }}</td>
                    <td>{{ qu.qTitle }}</td>
                    <td>{{ qu.optionType }}</td>
                    <td>
                        <span v-if="qu.isNecessary">是</span>
                        <span v-else>否</span>
                    </td>
                    <td>{{"編輯"}}</td>
                </tr>
            </table>
        </div>
    </div>

    <div class="quButtonZone">
        <button type="button">上一步</button>
        <button type="button" @click="goToCheckPage">送出</button>
    </div>

</div>

<div class="checkZone" v-if="controlPage == 2">
    <div class="checkTimeZone">
        <div class="checkStartTime">
            {{ questionnaire.startDate + "~" }}
        </div>
        <div class="checkEndTime">
            {{ questionnaire.endDate }}
        </div>
    </div>
    <div class="checkTitleZone">
        <p>{{ questionnaire.title }}</p>
    </div>

    <div class="checkDespZone">
        <p>{{ questionnaire.description }}</p>
    </div>

    <div class="information">
            <div class="name">
                <label for="">姓名</label>
                <input type="text" placeholder="請填寫姓名">
            </div>
            <div class="phoneNumber">
                <label for="">電話號碼</label>
                <input type="text" placeholder="請填寫電話">
            </div>

            <div class="mail">
                <label for="">Email</label>
                <input type="text" placeholder="請填寫E-mail">
            </div>
            <div class="age">
                <label for="">年齡</label>
                <input type="text" placeholder="請填寫年齡">
            </div>
    </div>

    <div class="voteZone">
        <div v-for="(voteQuestion,index) in question" :key="index">
            <div class="voteTitle">
                <p>{{ voteQuestion.qTitle }}</p>
                <p>請投給下列選項:</p>
            </div>

            <div class="voteRadio">
                <div v-for="(qoption,index) in voteQuestion.option.split(';')" :key="index">
                <input type="radio" value="qoption">
                <label>{{ qoption }}</label>
                </div>
            </div>
        </div>
    </div>

    <div class="reasonZone">
        <p>請說明理由</p>
        <input type="text">
    </div>

    <div class="checkButtonZone">

        <button type="button" @click="submitQuestionnaire">儲存並發布</button>
    </div>

</div>

</template>


<style lang="scss" scoped>
.body{
    width:100vw;
    height:100vh;
    background-color:palegreen;
    position: relative;

    .header{
    width:100vw;
    height:10vh;
    display:flex;
    justify-content: center;
    background-color:black;
    position: relative;

    .headerTitle{
        font-family:Verdana, Geneva, Tahoma, sans-serif;
        font-weight:bold;
        font-size:35pt;
        animation-name:neon;
        animation-duration:2s;
        animation-iteration-count:infinite;
        color:white;
    }
    @keyframes neon {
        0%{color:green;text-shadow:0px 0px 20px yellow;}
        25%{color:pink;text-shadow:0px 0px 50px blue;}
        50%{color:aqua;text-shadow:0px 0px 20px blueviolet;}
        100%{color:wheat;text-shadow:0px 0px 50px bisque;}
    }

    .membership{
        font-weight:bold;
        width:10vw;
        height:10vh;
        position:absolute;
        left:80%;
        display:flex;
        top:20%;
        font-size:17pt;
        color:white;
        

        i{
            margin-right:8%;
            margin-top:3%;
        }
    }
}
    .title{
        display:flex;
        border:1px solid black;
        justify-content:space-around;
        width:60%;
        margin:0 20%;
        margin-top:2%;
        position: relative;
    }

    .content{
            margin-top:3%;
            text-align:center;
            width:60%;
            position:absolute;
            
            .qnTitle{
                margin-left:50%;
                margin-bottom:2%;
                display:flex;
            }

            .qndesp{
                margin-left:50%;
                margin-bottom:2%;
                display:flex;
            }

            .startTime{
                margin-left:50%;
                margin-bottom:2%;
                display:flex;
            }

            .endTime{
                margin-left:50%;
                margin-bottom:2%;
                display:flex;
                display:flex;
            }
        }

    .buttonZone{
        position:absolute;
        left:75%;
        margin-top:2%;
    }
}

.quZone{
    background-color:palegreen;
    width:100vw;
    height:100vh;
    .quheader{
    width:100vw;
    height:10vh;
    display:flex;
    justify-content: center;
    background-color:black;
    position: relative;

    .quheaderTitle{
        font-family:Verdana, Geneva, Tahoma, sans-serif;
        font-weight:bold;
        font-size:35pt;
        animation-name:neon;
        animation-duration:2s;
        animation-iteration-count:infinite;
        color:white;
    }
    @keyframes neon {
        0%{color:green;text-shadow:0px 0px 20px yellow;}
        25%{color:pink;text-shadow:0px 0px 50px blue;}
        50%{color:aqua;text-shadow:0px 0px 20px blueviolet;}
        100%{color:wheat;text-shadow:0px 0px 50px bisque;}
    }

    .qumembership{
        font-weight:bold;
        width:10vw;
        height:10vh;
        position:absolute;
        left:80%;
        display:flex;
        top:20%;
        font-size:15pt;
        color:white;
        i{
            margin-right:8%;
            margin-top:3%;
        }
    }
}
    .qutitle{
        display:flex;
        justify-content: center;
        border:1px solid black;
        justify-content: space-around;
        width:80%;
        margin:0 10%;
        margin-top:2%;
    }

    .questionZone{
        display:flex;
        margin-top:3%;
        margin-left:40%;

        .dropdown{
            margin-left:2%;
        }

        .necessaryZone{
            margin-left:2%;
            margin-top:1%;
        }
    }

    .opZone{
        display:flex;
        margin-top:2%;
        margin-left:40%;
    }

    i{
        font-size:30pt;
        margin-top:2%;
        margin-left:30%;
    }

    .deletequZone{
        
        .deleteheader{
            display:flex;
            margin-top:2%;
            justify-content:space-around;
            background-color:palegreen;
            width:60%;
            margin:0 20%;
        }
    }

    .quButtonZone{
        margin-top:3%;
        margin-left:80%;
    }
}

.checkZone{
    width:100%;
    height:100%;
    background-color:palegreen;

    .checkTimeZone{
        display:flex;
        border:1px solid black;

        .checkStartTime{
            margin-left:80%;
        }


    }

    .checkTitleZone{
        text-align:center;
        margin-top:1%;
    }

    .checkDespZone{
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
            margin-top:5%;


            .voteTitle{
                text-align:center;
            }
            .voteRadio{
                width:100vw;
                display:flex;
                flex-direction:column;
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


</style>