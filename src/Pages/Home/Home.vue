<template>
  <div class="home">
    <div class="container mt-3">
      <div class="row justify-content-md-center mb-5">
        <div class="col-lg-9 leftside">
          <b-carousel
            id="carousel-1"
            v-model="slide"
            :interval="4000"
            controls
            indicators
            background="#ababab"
            img-width="1024"
            img-height="480"
            style="text-shadow: 1px 1px 2px #333;"
            @sliding-start="onSlideStart"
            @sliding-end="onSlideEnd"
          >
            <!-- Text slides with image -->
             <b-carousel-slide>
              <template v-slot:img>
                <img
                  class="d-block img-fluid w-100"
                  width="1024"
                  height="480"
                  src="../.././assets/image/04.jpg"
                  alt="image slot"
                  style="height:200px"
                />
              </template>
            </b-carousel-slide>

            <!-- Slides with custom text -->
           <b-carousel-slide>
              <template v-slot:img>
                <img
                  class="d-block img-fluid w-100"
                  width="1024"
                  height="480"
                  src="../.././assets/image/01.jpg"
                  alt="image slot"
                  style="height:200px"
                />
              </template>
            </b-carousel-slide>

            <!-- Slides with image only -->
            <b-carousel-slide>
              <template v-slot:img>
                <img
                  class="d-block img-fluid w-100"
                  width="1024"
                  height="480"
                  src="../.././assets/image/03.jpg"
                  alt="image slot"
                  style="height:200px"
                />
              </template>
            </b-carousel-slide>

            <!-- Slides with img slot -->
            <!-- Note the classes .d-block and .img-fluid to prevent browser default image alignment -->
            <b-carousel-slide>
              <template v-slot:img>
                <img
                  class="d-block img-fluid w-100"
                  width="1024"
                  height="480"
                  src="../.././assets/image/02.jpg"
                  alt="image slot"
                  style="height:200px"
                />
              </template>
            </b-carousel-slide>
          </b-carousel>
        </div>
        <!-- <div class="col-lg-3 d-none d-md-none d-sm-none d-lg-block">
          <div class="row">
            <b-img src="https://picsum.photos/1024/400/?image=41" fluid alt="Responsive image"></b-img>
          </div>
          <div class="row">
            <b-img src="https://picsum.photos/1024/400/?image=41" fluid alt="Responsive image"></b-img>
          </div>
        </div>-->
      </div>
      <div class="row justify-content-md-center mt-3">
        <div class="col-lg-9">
          <div class="mb-3" v-for="(item,index) in allcontent" :key="index">
            <b-card>
              <h5>
                <span id="touch" @click="toActicle(item.id,item.readcount)">{{item.title}}</span>
              </h5>
              <b-card-text class="mt-4">
                <b-img :src="item.image" width="32" alt="placeholder" rounded="circle"  v-if="item.image"></b-img>
                <b-img :src=" defaultimage" width="32" alt="placeholder" rounded="circle" v-else></b-img>
                <span class="ml-2">{{item.author}}</span>
                 <p class="text-right mb-0"> <i class="el-icon-view" style="font-size:18px"></i> <span >{{item.readcount}}</span> </p>
              </b-card-text>
            </b-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      slide: 0,
      sliding: null,
     defaultimage: "http://localhost:4000/upload/vMWrHwDnN_Iln67tDmG7Hylx.jpg",
    };
  },
  mounted() {
    this.$store.dispatch("getallcontent");
   
  },
  computed: {
    ...mapState(["allcontent"])
  },
  
  methods: {
    onSlideStart(slide) {
      this.sliding = true;
    },
    onSlideEnd(slide) {
      this.sliding = false;
    },
    toActicle(id,count) {
      // console.log(id);
      this.$router.push({
        name: "toActicle",
        query: {
          id: id,
          count:count
        }
      });
    },
   
  }
};
</script>
<style scoped>
.leftside {
  height: 200px;
}
#touch:hover {
  cursor: pointer;
}
</style>


