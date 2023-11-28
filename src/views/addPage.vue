<script>
export default{
    data(){
        return{
            questionnaire:{
                title:"",
                description:"",
                published:"",
                startDate:"",
                endDate:"",
            },

            question:{
                qTitle: "",
                optionType: "",
                isNecessary:false,
                qOption: ""
            },

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


        saveQuestionnaire() {
        const saveUrl = "http://localhost:8080/api/quiz/create";

        fetch(saveUrl, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
        body: JSON.stringify(this.questionnaire),
        })
            .then((response) => response.json())
            .then((data) => {
            console.log("Questionnaire saved successfully", data);
            // 在這裡可以執行成功保存後的操作
            })
            .catch((error) => {
            console.error("Error saving questionnaire:", error);
            });

            console.log(this.questionnaire)
        },

        goToNextPage() {
        // 在這裡可以執行一些前端操作
        // 例如驗證資料是否填寫完整、格式是否正確等
        // 如果通過驗證，再調用 submitQuestionnaire 方法
        this.submitQuestionnaire();
        // 你也可以添加其他邏輯，例如跳轉到下一頁
        this.goToAddPageQu();
    },

        submitQuestion() {
            // 做一些前端验证，确保数据有效性

            // 发送 POST 请求到后端 API
            this.saveQuestion();
            },

            saveQuestion() {
            const saveUrl = "http://localhost:8080/api/question/create";

            // 你可以在这里进行一些数据处理，例如将前端的 isNecessary 转换为后端的 is_necessary

            fetch(saveUrl, {
                method: "POST",
                headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify(this.question)
            })
                .then((response) => response.json())
                .then((data) => {
                console.log("Question saved successfully", data);
                // 在这里可以执行成功保存后的操作
                })
                .catch((error) => {
                console.error("Error saving question:", error);
                });
                console.log(this.question);
            }
    }
}

</script>



<template>
<div class="body" v-if="controlPage ==0">
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
                <input type="date" id="endDate"  v-model="questionnaire.endDate">
            </div>

            <div class="buttonZone">
                <button type="button">取消</button>
                <button type="button" @click="goToNextPage">下一步</button>
            </div>

        </div>
    </div>



<div class="quZone" v-if="controlPage == 1">
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
            <input type="text" v-model="optionType">選擇題型
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
        <div class="header">
            <p>編號</p>
            <p>內容</p>
            <p>問題種類</p>
            <p>必填</p>
            <p>編輯</p>
        </div>
    </div>

    <div class="quButtonZone">
        <button type="button">上一步</button>
        <button type="button" @click="submitQuestion">送出</button>
    </div>

</div>

</template>


<style lang="scss" scoped>
.body{
    width:100%;
    height:100%;
    position: relative;
    .title{
        display:flex;
        border:1px solid black;
        justify-content:space-around;
        width:60%;
        margin:0 20%;
        margin-top:10%;
        position: relative;


        .content{
            margin-top:10%;
            text-align:center;
            width:60%;
            position:absolute;
            
            .qnTitle{
                margin-bottom:2%;
                display:flex;
            }

            .qndesp{
                margin-bottom:2%;
                display:flex;
            }

            .startTime{
                margin-bottom:2%;
                display:flex;
            }


            
            
            .qnTitle{
                display:flex;
            }

            .qndesp{
                display:flex;
            }

            .startTime{
                display:flex;
            }

            .endTime{
                display:flex;
            }
        }
    }

    .buttonZone{
        position:absolute;
        left:45%;
        margin-top:20%;
    }
}

.quZone{
    width:100%;
    height:100%;

    .qutitle{
        display:flex;
        justify-content: center;
        border:1px solid black;
        justify-content: space-around;
        width:80%;
        margin:0 10%;
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
        
        .header{
            display:flex;
            margin-top:2%;
            justify-content:space-around;
            background-color:palegreen;
            width:60%;
            margin:0 20%;
        }
    }
}


</style>