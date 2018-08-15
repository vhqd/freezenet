<template>
    <div>
        <BackBar :dTitle='dTitle'></BackBar>
        <div class="problems-content">
            <h2>常见问题</h2>
        </div>
    </div>
</template>

<script>
    import BackBar from '../common/BackBar.vue'

    export default{
        data(){
            return{
                dTitle:'常见问题'
            }
        },
        components:{
            BackBar
        }
    }
</script>

<style scoped>
    .problems-content{padding-top: 1rem;}
</style>
