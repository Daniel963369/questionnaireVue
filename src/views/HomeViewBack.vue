    <script>
    export default {
        data(){
            return{
                key:0,
                quizData:[],
                indexArr:[],
                perpage:10,
                currentPage:1,
                searchName:"",
                
            }
        },
        created(){

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
            }
            
        },

        methods:{

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
                });
                },

                
                catchIndex(index){
                    var globalIndex = (this.currentPage-1)*10 +index
                    this.indexArr.push({qnId:this.quizData[globalIndex].questionnaire.id,currentPage:this.currentPage,index:index})
                    console.log(this.indexArr)
                    console.log(this.quizData)
                    
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
                <input type="date" id="startDate">
                <input type="date" id="finalDate">
                <button type="button" @click="search">搜尋</button>
            </div>
        </div>

        <div class="iconZone">
            <i class="fa-solid fa-trash" @click="deleteQn"></i>
            <i class="fa-solid fa-plus" @click="goToAddPage"></i>
        </div>

        <div class="blockContent">
            <table>
                <tr>
                    <td>#</td>
                    <td>問卷</td>
                    <td>狀態</td>
                    <td>開始時間</td>
                    <td>結束時間</td>
                    <td>觀看統計</td>
                </tr>
                <tr v-for="(quiz,index) in quizData.slice(pageStart,pageEnd)" :key="index">
                    <input type="checkbox" :key="index" @click="catchIndex(index)" v-model="quiz.checked">
                    <td>{{ quiz.questionnaire.id }}</td>
                    <td @click="goToQuestion">{{ quiz.questionnaire.title }}</td>
                    <td>{{ quiz.questionnaire.published }}</td>
                    <td>{{ quiz.questionnaire.startDate }}</td>
                    <td>{{ quiz.questionnaire.endDate}}</td>
                    <td>{{ "前往觀看" }}</td>
                </tr>
            </table>
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


            table{

            tr{
                width:90vw;
                display:flex;
                justify-content:space-around;
                border:1px solid black;

                td{
                    cursor:pointer;
                    color:blue;
                    
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
