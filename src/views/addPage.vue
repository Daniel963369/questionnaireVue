<script>
export default{
    data(){
        return{
            questionnaire:{
                title:"",
                description:"",
                startDate:"",
                endDate:"",
            }
        }
    },


    methods:{
        goToAddPageQu(){
            this.$router.push('/addPageQu')
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
    }
}

</script>



<template>
<div class="body">
    <div class="title">
        <p>問卷</p>
        <p>題目</p>
        <p>問卷回饋</p>
        <p>統計</p>

        
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
        </div>
    </div>

    <div class="buttonZone">
        <button type="button">取消</button>
        <button type="button" @click="goToNextPage">下一步</button>
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
        margin-top:15%;
    }
}


</style>