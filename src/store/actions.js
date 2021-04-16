
// import axios from 'axios'
import {

 
  ALLCONTENT,
  OWNCONTENT,
  OWNINFO,
  COMMITINFO


} from './mutation-types'
import {  getOwnContent, getAllContent, getInfo,comments } from '../api/con'
export default {
 
 

  //获取所有文章的数据
  async getallcontent({ commit }) {
    const result = await getAllContent();
    //  console.log(result)
    commit(ALLCONTENT, { allcontent: result.data.message, contentinfo: result.data.array })
  },

  //获取个人文章的数据
  async getowncontent({ commit }, params) {
    const result = await getOwnContent(params);
    // console.log(result)
    commit(OWNCONTENT, { owncontent: result.data.message, owncontentinfo: result.data.array })
  },


  //获取个人信息

  async getinfo({ commit }, params) {
    const result = await getInfo(params);
    // console.log(result);
    commit(OWNINFO, { owninfo: result.data.message[0] })
  },
  //发表评论
  async committo({commit},params){
    const result = await comments(params);
    // console.log(result);
    commit(COMMITINFO,{commitinfo:result.data.message})
  }
}