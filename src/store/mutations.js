import {

    OWNCONTENT,
    ALLCONTENT,
    OWNINFO,
    COMMITINFO



}from './mutation-types'

export default{
  

[ALLCONTENT](state,{allcontent,contentinfo}){
    state.allcontent= allcontent;
    state.contentinfo= contentinfo;
},
[OWNCONTENT](state,{owncontent,owncontentinfo}){
    state.owncontent= owncontent;
    state.owncontentinfo= owncontentinfo;
},
[OWNINFO](state,{owninfo}){
    state.owninfo= owninfo;
   
},
[COMMITINFO](state,{commitinfo}){
    state.commitinfo= commitinfo;
   
},

}