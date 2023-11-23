<script>
export default {
    data(){
        return{

        }
    },

    props:[
        "flow"
    ],

    
}


</script>



<template>
<div class="body">
    <div class="designTitle">
        <h1>最強本土劇演員票選</h1>
    </div>

    <div class="designDescription">
        <p>投給你最喜歡的本土劇演員，並為他加油打氣，一個人只有一票。注意請留真實資料，不要洗票喔!</p>
        <p>活動完成後，會送出小禮物，屆時將進行公平抽獎，所以記得要留EMAIL以及手機。</p>
    </div>

    <div class="information">
        <div class="name">
            <label for="">姓名</label>
            <p>{{ flow.name }}</p>
        </div>
        <div class="phoneNumber">
            <label for="">電話號碼</label>
            <p>{{ flow.phoneNumber }}</p>
        </div>

        <div class="mail">
            <label for="">Email</label>
            <p>{{ flow.email }}</p>
        </div>
        <div class="age">
            <label for="">年齡</label>
            <p>{{ flow.age }}</p>
        </div>
    </div>

    <div class="voteZone">
        <p>請投給以下一位</p>
        <p>{{ flow.radioValue }}</p>
    </div>
</div>

</template>


<style lang="scss" scoped>
.designTitle{
    text-align:center;
    margin-top:9%;
}

.designDescription{
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
        margin-top:7%;
        margin-right:20%;

        .voteRadio{
            width:100vw;
            display:flex;
            flex-direction:column;
        }

        .N1{
            display:flex;
            justify-content: center;
            margin-right:20%;
            
            label{
                margin-left:5%;
            }
        }
        .N2{
            display:flex;
            justify-content: center;
            margin-right:20%;

            label{
                margin-left:5%;
            }
        }
        .N3{
            display:flex;
            justify-content: center;
            margin-right:20%;

            label{
                margin-left:5%;
            }
        }
        .N4{
            display:flex;
            justify-content: center;
            margin-right:20%;

            label{
                margin-left:5%;
            }
        }
    }

    .btn{
        width:100vw;

        .cancelBtn{
            margin-left:30%;
        }

        .checkBtn{
            margin-left:5%;
        }
    }



</style>