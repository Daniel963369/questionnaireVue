    <script>
import deleteConfirmation from './deleteConfirmation.vue'
    export default {
        data(){
            return{
                qnId:"",
                quTitle:"",
                qudesp:"",
                quStartDate:"",
                quEndDate:"",

                question_list:[],
                key:0,
                quizData:[],
                indexArr:[],
                perpage:10,
                currentPage:1,
                searchName:"",
                searchStartDate:"",
                searchEndDate:"",
                currentDate:new Date(),
                showDeleteConfirmation:false
            }
        },
        created(){

        },
        components:{
            deleteConfirmation
        },
        mounted(){
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

            this.fetchData();
            this.timeAnalysis();
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
            }
            
        },

        methods:{


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

                showConfirmation(){
                    this.showDeleteConfirmation = true
                },

                cancelDelete(){
                    this.showDeleteConfirmation = false
                },
                
                confirmDelete(){
                    this.showDeleteConfirmation = false
                },


                goToAddPage(){
                    this.$router.push('/addPage')
                },

                goToQuestion(){
                    this.$router.push('/questionContent')
                },

                search(){
                    this.fetchData({title:this.searchName,startDate: this.startDate, endDate: this.endDate})
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
                    this.quizData = response.quizVoList;
                    
                });
                },

                
                catchIndex(index){
                    var globalIndex = (this.currentPage-1)*10 +index
                    this.indexArr.push({qnId:this.quizData[globalIndex].questionnaire.id,currentPage:this.currentPage,index:index})
                    console.log(this.indexArr)
                    
                },

                goToCheckPage(index){
                    var globalIndex = (this.currentPage-1)*10 +index
                    this.qnId = this.quizData[globalIndex].questionnaire.id
                    this.quTitle  = this.quizData[globalIndex].questionnaire.title
                    this.qudesp = this.quizData[globalIndex].questionnaire.description
                    this.quStartDate = this.quizData[globalIndex].questionnaire.startDate
                    this.quEndDate = this.quizData[globalIndex].questionnaire.endDate
                    this.quPublished = this.quizData[globalIndex].questionnaire.published



                    


                    this.$router.push({
                        name:'addQuestionnairePage',
                        query:{
                            qnId:this.qnId,
                            quTitle:this.quTitle,
                            qudesp:this.qudesp,
                            quStartDate:this.quStartDate,
                            quEndDate:this.quEndDate,
                            quPublished:this.quPublished,
                        },
                    })
                },

            //     deleteData(){
            //         const deleteUrl = 'http://localhost:8080/api/quiz/deleteQuestionnaire';
            //         const quizIdDelete = this.qnId;

            //     fetch(`${deleteUrl}/${quizIdDelete}`, {
            //         method: "POST",
            //         mode: "cors", // 添加 CORS 設置
            //         headers: new Headers({
            //             "Content-Type": "application/json",
            //         }),
            //     })


            //     .then((res) => {
            //         if (!res.ok) {
            //             throw new Error(`HTTP error! Status: ${res.status}`);
            //         }
            //         return res.json();
            //     })
            //     .then((data) => {
            //         console.log("Quiz deleted successfully", data);
            //         this.fetchData(); // 刪除成功後重新加載數據
            //     })
            //     .catch((error) => {
            //         console.error("Error:", error);
            //     });
            // },

            deleteQn() {
                //終止方法的可愛變數
                let stopDel=false;
                // 後端需要的qnidList
                var data = [
                    
                ];
                //前端要得索引值
                var data1 = [
                    
                ];
            

                // 判斷我要去刪掉陣列問卷的哪幾個
                for (let i = 0; i < this.indexArr.length; i++) {
                    let indexNum = 0;
                    let bigNum =this.indexArr[i].currentPage
                    let smallNum =  this.indexArr[i].index
                    indexNum = this.perpage*(bigNum-1)+smallNum
                    data1.push(indexNum)
                    data.push(this.quizData[indexNum].questionnaire.id)
                }
                console.log(data)
                console.log(data1)


                // //判斷這幾個裡面有沒有已經出版在進行中的資料
                // for(let w = 0; w<data1.length ; w++){
                //     const SSdate = new Date(this.quizData[data1[w]].startDate);
                //     const NNdate = new Date(this.nowday);
                //     if(this.quizData[data1[w]].published == true && NNdate>=SSdate){
                //         stopDel=true;
                //         alert("你刪除的問卷當中有包含已開始的問卷所以禁止刪除");
                //         return stopDel;
                //     }
                // };

                
                // if(stopDel){
                //     alert("當中包含已出版且已經開始的問卷")
                //     this.indexArr=[];
                //     return 
                // }
                // 抓到當中有出版的直接終止掉-----------------------------------------------------------------

                

                // 把前端的資料刪掉
                for(let i = 0; i < this.quizData.length; i++){
                        for(let k = 0; k < this.indexArr.length; k++){
                        if(this.quizData[i].questionnaire.id== this.indexArr[k].qnId){
                            console.log(this.quizData)
                            console.log(this.quizData[i].questionnaire.id)
                            this.quizData.splice(i,1)
                            this.showDeleteConfirmation =false
                            
                        }
                    }
                }
                // this.quizData = this.quizData.filter((quiz) => !data.includes(quiz));
                // this.$forceUpdate();
                // this.quizData = this.quizData.filter((quiz) => !data.includes(quiz.qnId));

                // 前往後端刪資料
                var url = "http://localhost:8080/api/quiz/deleteQuestionnaire";
                fetch(url, {
                method: "POST", // or 'PUT'
                headers: new Headers({
                    "Content-Type": "application/json",
                }),
                body: JSON.stringify(data), // data can be string or {object}!
                })
                .then((res) => res.json())
                .then((response) => console.log("Success:", response));
            },
                },
                
            }
    </script>

    <template>
    <div class="body">
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

        <div class="iconZone">
            <i class="fa-solid fa-trash" @click="showConfirmation"></i>
            <deleteConfirmation :show="showDeleteConfirmation" @cancel="cancelDelete" @confirm="deleteQn" /> 
            <i class="fa-solid fa-plus" @click="goToAddPage"></i>
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
                    <div class="contentTr">
                    <div class="questionnaireId">
                        <input type="checkbox" :key="index" @click="catchIndex(index)" v-model="quiz.checked">
                        <td>{{ quiz.questionnaire.id }}</td>
                    </div>
                    <div class="questionnaireTitle">
                        <td @click="goToCheckPage(index)">{{ quiz.questionnaire.title }}</td>
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
                        <td>{{ quiz.questionnaire.endDate}}</td>
                    </div>

                    <div class="questionnaireView">
                        <td>{{ "前往觀看" }}</td>
                    </div>
                </div>
                </tr>
            </table>
        </div>
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

    .iconZone{
        display:flex;
        font-size:24pt;
        margin-top:2%;
        margin-left:5%;
        position:relative;

        .fa-plus{
            left:2%;
            position:absolute;
            cursor:pointer;
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

            .contentTr{
                border:3px solid palevioletred;
                margin-top:1%;
                display:flex;
                justify-content:space-around;

                .questionnaireId{
                    display:flex;
                    width:13.5vw;

                    input{
                        border:1px solid black;
                        margin-left:25%;
                    }
                    

                    td{
                        width:5vw;
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


    </style>
