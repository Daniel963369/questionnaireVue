<script>
export default {
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


            methods:{
                goToQuestion(){
                    this.$router.push('/answerPage')
                },

                goToBack(){
                    this.$router.push('./HomeViewBack')
                },


                setPage(page){
                    if(page <= 0 || page > this.totalPage){
                        return
                    }
                    this.currentPage = page
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
                    console.log(this.quizData);

                
                });
                }
        },
    }








</script>

<template>
    <div class="checkZone">
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