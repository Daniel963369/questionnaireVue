<script>
export default {
    data(){
        return{
            qnId:"",
            qTitle:"",
            published:"",
            startDate:"",
            endDate:"",
            key:0,
            quizData:[],
            perpage:10,
            currentPage:1,
            currentDate:new Date(),
            searchName:"",
            page:0,
            question:[],

            personInformation:{
                name:"",
                phoneNumber:"",
                email:"",
                age:"",
                radioValue:"",
            },
            
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

    computed:{
        totalPage(){
            return Math.ceil(this.quizData.length/this.perpage)
        },
        pageStart(){
            return(this.currentPage-1)*this.perpage
        },

        pageEnd(){
            return this.currentPage *this.perpage
        },

        formattedCurrentDate(){
            const year = this.currentDate.getFullYear();
            const month = String(this.currentDate.getMonth() + 1).padStart(2, '0'); // 注意月份是从 0 开始的
            const day = String(this.currentDate.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        }
        
    },

    methods:{

            goToHomePage(){
                this.page = 0
            },
            goToCheckPage(){
                this.page = 2
            },

            goToQuestion(){
                
                this.page = 1
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
                const newQuId = this.question.length + 1
                this.question.push({qnId:newQuId,qTitle:this.quizData[0].question_list.qTitle,optionType:this.quizData[0].question_list.optionType,
                    isNecessary:this.quizData[0].necessary, option:this.quizData[0].option})

                    console.log(this.question)


            
            });
            }
    },

}
</script>

<template>
<div class="body" v-if="page == 0">
    <div class="header">
        <p class="headerTitle">火星村網路投票網</p>
        <div class="membership">
            <i class="fa-solid fa-user"></i>
            <p>會員登入</p>
        </div>
    </div>
    <div class="questionHeader">
        <div class="questionTitle">
            <p>問卷標題</p>
            <input type="text" v-model="searchName" >
        </div>
        <div class="questionTime">
            <p>開始 / 結束</p>
            <input type="date" id="startDate">
            <input type="date" id="finalDate">
            <button type="button" @click="search">搜尋</button>
        </div>
    </div>

    <div class="blockContent">
        <div class="tableContent">
        <table>
            <tr class="headerTr">
                <td>#</td>
                <td>問卷</td>
                <td>狀態</td>
                <td>開始時間</td>
                <td>結束時間</td>
                <td>觀看統計</td>
            </tr>
            <tr v-for="(quiz,index) in quizData.slice(pageStart,pageEnd)" :key="index">
                <div class="ContentTr">
                <div class="questionnaireId">
                    <td>{{ quiz.questionnaire.id }}</td>
                </div>
                <div class="questionnaireTitle">
                    <td @click="goToQuestion">{{ quiz.questionnaire.title }}</td>
                </div>
        


                <td>
                    <div class="whetherPublished">
                        <td v-if="quiz.questionnaire.startDate > currentDate">尚未開始</td>
                        <td v-if="currentDate > quiz.questionnaire.endDate">已結束</td>
                        <td v-else="quiz.questionnaire.startDate < currentDate && currentDate < quiz.questionnaire.endDate">進行中</td>
                    </div>
                </td>
                <div class="questionnaireStartDate">
                    <td>{{ quiz.questionnaire.startDate }}</td>
                </div>
                <div class="questionnaireEndDate">
                    <td>{{ quiz.questionnaire.endDate }}</td>
                </div>
                <div class="questionnaireView">
                    <td>{{ "前往觀看" }}</td>
                </div>
            </div>
            </tr>
        </table>
    </div>

        <button type="button" @click="goToBack">前往後台</button>
    </div>

    <div class="page">
<div class="pagination">
<div class="page-item" @click.prevent="setPage(currentPage-1)">
    <a class="page-link" href="#" aria-label="Previous">
      <span aria-hidden="true">&laquo;</span>
    </a>
</div>
  <div class="page-item" :class="{'active': (currentPage === (n))}"
  v-for="(n, index) in totalPage" :key="index" @click.prevent="setPage(n)">
    <a class="page-link" href="#">{{ n }}</a>
</div>
  <div class="page-item" @click.prevent="setPage(currentPage+1)">
    <a class="page-link" href="#" aria-label="Next">
      <span aria-hidden="true">&raquo;</span>
    </a>
</div>
</div>
    </div>
</div>

<div class="answerZone" v-if="page == 1">
    <div class="checkZone">
        <div class="checkTimeZone">
            <div class="checkStartTime">
                {{ quizData[0].questionnaire.startDate + "~" }}
            </div>
            <div class="checkEndTime">
                {{ quizData[0].questionnaire.endDate }}
            </div>
        </div>
        <div class="checkTitleZone">
            <p>{{ quizData[0].questionnaire.title }}</p>
        </div>

        <div class="checkDespZone">
            <p>{{ quizData[0].questionnaire.description }}</p>
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

        <div class="voteZone">
            <div v-for="(voteQuestion,index) in question" :key="index">
            <div class="voteTitle">
                <p>{{ voteQuestion.qTitle }}</p>
                <p>請投給下列選項:</p>
            </div>

            <div class="voteRadio">
                <div v-for="(qoption,index) in voteQuestion.option" :key="index">
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

        <button type="button" @click="goToCheckPage">送出</button>
    </div>

    </div>

</div>

<div class="checkAnswerZone" v-if="page == 2">
    <div class="checkZone1">
        <div class="checkTimeZone1">
            <div class="checkStartTime1">
                {{ quizData[0].questionnaire.startDate + "~" }}
            </div>
            <div class="checkEndTime1">
                {{ quizData[0].questionnaire.endDate }}
            </div>
        </div>
        <div class="checkTitleZone1">
            <p>{{ quizData[0].questionnaire.title }}</p>
        </div>

        <div class="checkDespZone1">
            <p>{{ quizData[0].questionnaire.description }}</p>
        </div>

        <div class="information1">
                <div class="name1">
                    <label for="">姓名</label>
                    {{personInformation.name}}
                </div>
                <div class="phoneNumber1">
                    <label for="">電話號碼</label>
                     {{personInformation.phoneNumber}}
                </div>

                <div class="mail1">
                    <label for="">Email</label>
                     {{personInformation.email}}
                </div>
                <div class="age1">
                    <label for="">年齡</label>
                    {{personInformation.age}}
                </div>
        </div>

        <div class="voteZone1">
            <div v-for="(voteQuestion,index) in question" :key="index">
            <div class="voteTitle1">
                <p>{{ voteQuestion.qTitle }}</p>
                <p>請投給下列選項:</p>
            </div>

            <div class="voteRadio1">
                <div v-for="(qoption,index) in voteQuestion.option" :key="index">
                <input type="radio" value="qoption">
                <label>{{ qoption }}</label>
                </div>
            </div>
        </div>
            
        </div>

        <div class="reasonZone1">
            <p>請說明理由</p>
            <input type="text">
        </div>

    <div class="checkButtonZone">

        <button type="button" @click="goToHomePage">確認並送出</button>
    </div>

    </div>
</div>




</template>


<style lang="scss" scoped>
.body{
    width:100vw;
    height:100vh;
    background-color:palegreen;
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
.questionHeader{
    width:70vw;
    height:25vh;
    margin:0 5%;
    border:1px solid black;
    flex-direction:column;
    
    

    .questionTitle{
        display:flex;
        margin-left:5%;
        margin-top:2%;

        p{
            font-size:22pt;
        }

        input{
            width:20vw;
            height:5vh;
        }
    }

    .questionTime{
        display:flex;
        margin-left:5%;
        height:5vh;
        margin-top:5%;

        p{font-size:22pt;}

        input{
            margin-left:2%;
        }

        button{
            margin-left:5%;
            width:5vw;
            height:5vh;
        }
    }
}


.blockContent{
        width:90vw;
        margin:0 5%;
        border:1px solid black;
        margin-top:3%;


        
        .tableContent{

            .headerTr{
                display:flex;
                border:1px solid black;
                width:90vw;
                justify-content:space-around;
                color:blue;
                
            }

            .ContentTr{
                border:3px solid palevioletred;
                margin-top:1%;
                display:flex;
                position:relative;

                .questionnaireId{
                    color:blue;
                    margin-left:6%;
                }

                .questionnaireTitle{
                    color:blue;
                    margin-left:9%;
                    
                }

                .whetherPublished{
                    position:relative;
                    left:270%;
                    color:blue;
                    
                }

                .questionnaireStartDate{
                    color:blue;
                    margin-left:22%;
                }

                .questionnaireEndDate{
                    color:blue;
                    margin-left:12%;
                }

                .questionnaireView{
                    color:blue;
                    margin-left:12%;
                }
            }

        }
    }

    .page{
        display:flex;
        margin-top:2%;
        margin-left:10%;

        .icon{
            width:10vw;
            font-size:15pt;
            display:flex;
            justify-content:space-around;
            position:relative;
            font-weight:bold;

            p{
                font-weight:bold;
                font-family:cursive;
                text-align:center;
            }
            

            
        }
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

.checkAnswerZone{
        .checkZone1{
        width:100%;
        height:100%;
        background-color:palegreen;

        .checkTimeZone1{
            display:flex;
            border:1px solid black;

            .checkStartTime1{
                margin-left:80%;
            }


        }

        .checkTitleZone1{
            text-align:center;
            margin-top:1%;
        }

        .checkDespZone1{
            text-align:center;
            margin-top:3%;
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

        .voteZone1{
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

        .reasonZone1{
            text-align:center;
            margin-top:2%;
        }

        .checkButtonZone{
            margin-left:60%;
            margin-top:3%;
        }
    }

}
</style>
