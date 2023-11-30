<script>
export default {
    data(){
        return{
            
        }

    }
}







</script>

<template>
    <!-- <div class="checkZone"> -->
        <!-- <div class="checkTimeZone">
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

</div> -->

</template>


<style lang="scss" scoped>

</style>