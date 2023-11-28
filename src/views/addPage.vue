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

            question:{
                quId:"",
                qTitle: "",
                optionType: "",
                isNecessary:false,
                qOption: ""
            },

            questionArr:[],

            controlPage:0
        }
    },




    methods:{
        goToAddPageQu(){
            this.controlPage = 1
        },

        submitQuestionnaire() {
      // 做一些前端驗證，確保資料有效性

      // 發送 POST 請求到後端 API
            this.saveQuestionnaire();
        },

        timeAnalysis(){
            const currentDate = new Date();
            if(this.questionnaire.startDate && this.questionnaire.endDate){
                const startDate = new Date(this.questionnaire.startDate);
                const endDate = new Date(this.questionnaire.endDate);

                if(startDate < currentDate){
                this.questionnaire.published = false
            }
                else{
                this.questionnaire.published = true
            }
            }
        },


        saveQuestionnaire() {
        const saveUrl = "http://localhost:8080/api/quiz/create";
        const dataToSend = {
            questionnaire:this.questionnaire,
            question:this.question
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
        this.submitQuestionnaire();
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
        <input type="text" v-model="question.qTitle">
        <div class="typeZone">
            <input type="text" v-model="optionType">
        </div>
        <div class="necessaryZone">
            <input type="checkbox" name="" id="" v-model="question.isNecessary">必填
        </div>
    </div>

    <div class="opZone">
        <p>選項:</p>
        <input type="text" v-model="question.qOption">
        <button type="button">加入</button>
    </div>

    <i class="fa-solid fa-trash"></i>

    <div class="deletequZone">
        <div class="deleteheader">
            <p>編號</p>
            <p>內容</p>
            <p>問題種類</p>
            <p>必填</p>
            <p>編輯</p>
        </div>
    </div>

    <div class="quButtonZone">
        <button type="button">上一步</button>
        <button type="button" @click="submitQuestionnaire">送出</button>
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


</style>