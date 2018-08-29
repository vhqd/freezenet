<template>
    <div>  
        <h4>{{content.info}}</h4>
        <p style="float:right">{{content.question_answer}}</p>
        <div>{{content.question_answer}}</div>
    </div>    
</template>

<script>
    import { problemsDetail } from '../../http/http.js'
    export default{
        data(){
            return{
                content:{}
            }
        },
        activated(){
         
        },
        mounted(){  
            let id = this.$route.query.id
            problemsDetail(id).then(res => {
                let content = res.data.data.info
                this.content = content
            })
        }
    }
</script>

<style>

</style>

