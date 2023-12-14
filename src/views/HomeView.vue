<script>
import  Chart  from 'chart.js/auto';
export default {
    data(){
        return{
            key:0,
            //資料庫問卷及問題的陣列
            quizData:[],
            qnId:"",
            //分頁
            perpage:10,
            currentPage:1,

            //時間
            currentDate:new Date(),

            //搜尋的日期
            searchName:"",
            searchStartDate:"",
            searchEndDate:"",
            //控制頁面的變數
            page:0,

            //問題的陣列
            question:[],
            questionOption:[],
            userList:[],
            userListAns:[],

            voters:[],

        }
    },



    mounted(){
        this.fetchData();
        this.timeAnalysis();

    },

    computed:{
        //分頁控制
        totalPage(){
            return Math.ceil(this.quizData.length/this.perpage)
        },
        pageStart(){
            return(this.currentPage-1)*this.perpage
        },

        pageEnd(){
            return this.currentPage *this.perpage
        },


        
    },

    methods:{

            isQuestionnaireEnded(endDate) {
                const currentDate = new Date();
                const questionnaireEndDate = new Date(endDate);

                return questionnaireEndDate < currentDate;
            },
            
        
            comeToChart(index){
                var globalIndex = (this.currentPage-1)*10 +index
                this.qnId = this.quizData[globalIndex].questionnaire.id

            // 添加条件检查，如果问卷已结束，则不执行后续逻辑
            if (this.isQuestionnaireEnded(this.quizData[globalIndex].questionnaire.endDate)) {
                    // 在这里可以添加一些提示，告知用户该问卷已结束
                    console.log("問卷已經結束,不能觀看統計資料");
                    return;
            }
                console.log(this.qnId)
                this.fetchUserList()
                .then(() => {
                    this.takeQuestion(index);
                    this.takeAnsCounts();
                    this.createChart();
                    this.page = 1
                })
            },

            takeQuestion(index){
                var globalIndex = (this.currentPage-1)*10 +index
                this.questionOption = this.quizData[globalIndex].question_list[0].option.split(';')
                // this.questionOption.push(this.quizData[globalIndex].question_list[globalIndex].option.split(';'))
                console.log([this.questionOption])
            },

            takeAnsCounts(){
                const optionCounts = []
                this.userListAns.forEach((ans)=>{
                    const options = ans.split(';')


                    options.forEach((option)=>{
                        const optionName = option.replace(/[(（].*?[)）]/g, '').trim();
                        if(optionCounts[option]){
                            optionCounts[option]++;
                        }else{
                            optionCounts[option] = 1
                        }
                        console.log(optionName)
                    })
                })
                this.voters = Object.values(optionCounts);
                console.log(this.voters)
                console.log(optionCounts)
            },


            fetchUserList(){
            const url = 'http://localhost:8080/api/user/searchUserList';
            const queryParams = new URLSearchParams({
                qnId:this.qnId
            })
            const urlWithParams = `${url}?${queryParams}`;
            
            return fetch(urlWithParams, {
            method: "GET", 
            headers: new Headers({
                "Content-Type": "application/json",
            }),
            })
            .then((response) => response.json())
            .catch((error) => console.error("Error:", error))
            .then((data) => {
                console.log(data)
                this.userList = data.userList
                let datay = ""
                this.userList.forEach((user)=>{
                    console.log(user.ans)
                    datay = datay + user.ans +';'
                    this.userListAns.push(user.ans)
                })
                console.log(datay)
                console.log(this.userList)
                console.log(this.userListAns)
            });
            },

                        
            createChart(){
            const ctx = document.getElementById('myChart');
    
            new Chart(ctx, {
                type: 'pie',
                data: {
                    labels:this.questionOption,
                datasets: [{
                    label: '投票數量',
                    data:this.voters,
                    borderWidth: 1
                }]
                },
                // options: {

                // }
  });
            console.log("創建圖表成功")
        },

            timeAnalysis(startDate,endDate){
                const startDate1 = new Date(startDate)
                const endDate1 = new Date(endDate)
                const currentDate = new Date()
                if(startDate1 > currentDate){
                    return "尚未開始"
                }
                else if(endDate1 < currentDate){
                    return "已結束"
                }
                else{
                    return "進行中"
                }
            },

            //前往後台
            goToBack(){
                this.$router.push('./HomeViewBack')
            },

            //返回首頁
            goToHomePage(){
                this.page = 0
            },

            //前往確認頁
            goToCheckPage(){
                this.page = 2
            },

            //搜尋的方法
            search(){
                    this.fetchData({title:this.searchName,startDate: this.startDate, endDate: this.endDate})
            },



            goToQuestion(quiz) {
            // 添加条件检查，如果问卷已结束，则不执行后续逻辑
                if (this.isQuestionnaireEnded(quiz.questionnaire.endDate)) {
                        // 在这里可以添加一些提示，告知用户该问卷已结束
                        console.log("問卷截止,禁止進入");
                        return;
                }
                this.$router.push({
                    name: 'Answer',
                    params: {
                        questionnaireContent: JSON.stringify(quiz)
                    }
                });
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
            startDate:this.searchStartDate,
            endDate:this.searchEndDate,
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
                this.quizData = response.quizVoList.filter(quiz => quiz.questionnaire.published);
                console.log(this.quizData)
                
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
            <input type="date" id="startDate" v-model="searchStartDate">
            <input type="date" id="finalDate" v-model="searchEndDate">
            <button type="button" @click="search">搜尋</button>
        </div>
    </div>

    <div class="blockContent">
        <div class="tableContent">
        <table>
            <tr class="headerTr">
                <div class="qnId">
                    <td>#</td>
                </div>
                <div class="questionnaireContent">
                    <td>問卷</td>
                </div>
                <div class="status">
                    <td>狀態</td>
                </div>
                <div class="qnStartTime">
                    <td>開始時間</td>
                </div>
                <div class="qnEndTime">
                    <td>結束時間</td>
                </div>
                <div class="viewStatic">
                    <td>觀看統計</td>
                </div>
            </tr>
            <tr v-for="(quiz,index) in quizData.slice(pageStart,pageEnd)" :key="index">
                <div class="ContentTr">
                <div class="questionnaireId">
                    <td>{{ quiz.questionnaire.id }}</td>
                </div>
                <div class="questionnaireTitle">
                    <td @click="goToQuestion(quiz)">{{ quiz.questionnaire.title }}</td>
                </div>
        


                <td>
                    <div class="whetherPublished">
                        <p>{{ timeAnalysis(quiz.questionnaire.startDate, quiz.questionnaire.endDate) }}</p>     
                    </div>
                </td>
                <div class="questionnaireStartDate">
                    <td>{{ quiz.questionnaire.startDate }}</td>
                </div>
                <div class="questionnaireEndDate">
                    <td>{{ quiz.questionnaire.endDate }}</td>
                </div>
                <div class="questionnaireView">
                    <td @click="comeToChart(index)">{{ "前往觀看" }}</td>
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



    <div class="mychartZone">
        <canvas id="myChart"></canvas>
    </div>

    <div v-if="page == 1">

    </div>
</template>


<style lang="scss" scoped>
.body{
    width:100%;
    height:100%;
    background-color:#EEB8B8;
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
        color:#C5DAD1;
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
        color:#C5DAD1;
        

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
                justify-content:space-around;
                border:1px solid black;
                width:90vw;
                color:#7E30E1;

                .qnId{
                    width:15%;
                    
                    td{
                        width:13.5vw;
                        text-align:center;
                        
                    }
                }

                .questionnaireContent{
                    width:25%;

                    td{
                        width: 22.5vw;
                        text-align:center;
                    }
                }

                .status{
                    width:10%;

                    td{
                        width:9vw;
                        text-align:center;
                    }
                }

                .qnStartTime{
                    width:15%;

                    td{
                        width:13.5vw;
                        text-align:center;
                    }
                }

                .qnEndTime{
                    width:15%;

                    td{
                        width:13.5vw;
                        text-align:center;
                    }
                }

                .viewStatic{
                    width:10%;

                    td{
                        width:9vw;
                        text-align:center;
                    }
                }
                
            }

            .ContentTr{
                border:3px solid palevioletred;
                margin-top:1%;
                display:flex;
                justify-content:space-around;

                .questionnaireId{
                    width:13.5vw;
                    

                    td{
                        width:13.5vw;
                        text-align:center;
                        color:#7E30E1;

                    }
                }

                .questionnaireTitle{
                    width:22.5vw;
                    color:#7E30E1;
                    
                    
                    td{
                        width:22.5vw;
                        text-align:center;
                    }
                }

                .whetherPublished{
                    width:9vw;
                    display:flex;
                    justify-content: center;
                    
                    p{
                        
                        color:#7E30E1;
                        text-align:center;
                    }
                }

                .questionnaireStartDate{
                    color:#7E30E1;
                    width:13.5vw;
                    td{
                        width:13.5vw;
                        text-align:center;
                    }
                }

                .questionnaireEndDate{
                    color:#7E30E1;
                    width:13.5vw;
                    td{
                        width:13.5vw;
                        text-align:center;
                    }
                }

                .questionnaireView{
                    width:9vw;

                    td{
                        width:9vw;
                        text-align: center;
                        color:#7E30E1;
                    }
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

.mychartZone{
    width:400px;
    height:400px;
}

</style>
