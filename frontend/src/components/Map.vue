<template>
    <div>
        <h1>Your coordinates:</h1>
        <p>{{coordinates.lat}} Latitude, {{coordinates.lng}} Longitude</p>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                coordinates: {
                    lat: 0,
                    lng: 0
                }
            }
        },
        create() {
            //get user coordinates
            this.$getLocation({})
                .then(coordinates => {
                    this.coordinates = coordinates;
                });
        }
    }
</script>