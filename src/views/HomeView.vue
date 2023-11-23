<script>
export default {
    data(){
        return{
            qnId:"",
            qTitle:"",
            published:"",
            startDate:"",
            endDate:"",
            quizData:[],
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


        const finalDate = document.getElementById("finalDate")
        var plusDate =new Date().getDate()
        const sevenDate =new Date().setDate(plusDate + 7)
        const sevenDatetime = new Date(sevenDate)



        const todayAfterSeven =sevenDatetime.toLocaleString(undefined,day).slice(0,-1)
        const tomonthAfterSeven =sevenDatetime.toLocaleString(undefined,month).slice(0,-1)
        const toyearAfterSeven =sevenDatetime.toLocaleString(undefined,year).slice(0,-1)
        const defaultDateAfterSeven = [toyearAfterSeven,tomonthAfterSeven,todayAfterSeven].join('-')
        console.log(defaultDateAfterSeven)
        finalDate.value = defaultDateAfterSeven
        console.log(finalDate.value)
        this.fetchData();
    },

    methods:{
            goToQuestion(){
                this.$router.push('/questionContent')
            },

            fetchData(){
                const url = 'http://localhost:8080/api/quiz/search';
            // 要帶入的值
            const queryParams = {
            title: "",
            startDate:null,
            endDate:null,
            
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
                this.quizData = response;
                console.log(this.quizData);


                this.qnId = response.quizVoList[0].questionnaire.id

                this.qTitle = response.quizVoList[0].questionnaire.title

                this.published = response.quizVoList[0].questionnaire.description

                this.startDate = response.quizVoList[0].questionnaire.startDate

                this.endDate = response.quizVoList[0].questionnaire.endDate


            });
            }
        }

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
            <input type="text">
        </div>
        <div class="questionTime">
            <p>開始 / 結束</p>
            <input type="date" id="startDate">
            <input type="date" id="finalDate">
            <button type="button">搜尋</button>
        </div>
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
            <tr v-for="(quiz,index) in quizData" :key="index">
                <td>{{ qnId }}</td>
                <td @click="goToQuestion">{{ qTitle }}</td>
                <td>{{ published}}</td>
                <td>{{ startDate }}</td>
                <td>{{ endDate }}</td>
                <td>{{ "前往觀看" }}</td>
            </tr>
        </table>
    </div>

    <div class="page">
        <div class="icon">
            <i class="fa-solid fa-angles-left"></i>
            <i class="fa-solid fa-angle-left"></i>
            <p>1</p>
            <i class="fa-solid fa-chevron-right"></i>
            <i class="fa-solid fa-angles-right"></i>
        </div>
    </div>

    <div class="buttonZone">
        <button type="button" @click="fetchData">印出資料</button>
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
