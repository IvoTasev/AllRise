<template>
    <div>

    </div>
</template>

<script>
    export default {
        beforeCreate(){
            let thisPage = window.location.pathname;
            let newPage = thisPage.split('/');
            console.log("Redirecting to: " + newPage[0] + "/" + newPage[2]);
            this.$router.push(newPage[0] + "/" + newPage[2]);
        }

    }
</script>

<style scoped>

</style>