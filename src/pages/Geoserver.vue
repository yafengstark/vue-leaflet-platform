<template>
    <div class="container">

        <h2> geoserver api</h2>


        <h3>负载</h3>
         <div v-html="metric">

         </div>

    </div>
</template>

<script>

    import axios from 'axios'


    export default {
        data() {
            return {
                metric: '<div>未获取</div>'
            };
        },
        created() {
            this.ready()

        },
        methods: {
            async ready() {
                axios({
                    method: 'get',
                    url: 'http://localhost/geoserver/rest/about/system-status.html',
                    headers: {
//                        'content-type': 'application/json',
//                        'accept': 'text/json'
                    },
                    params: {

//                        'test':1
                    }
                })
                    .then((response) => {
                        console.log(response);
                        this.metric = response.data;
                    })
                    .catch((error) => {
                            console.log(error);
                        }
                    );

            }
        },
        props: [],
        components: {


        }
    };
</script>

<style lang="scss" scoped>

</style>
