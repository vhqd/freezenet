import store from "../store/store.js";
import axios from "axios";
const host = store.state.host;

/**
 * 获取首页轮播图
 */
export const getIndexBanner = (limit,page) =>{ return axios.get(host + "/api/banner?limit=" + limit + "&page=" + page).then((res) => {return res;}).catch((error) => {return error.response})};
/**
 * 获取首页分类专区
 */
export const getIndexClass = (limit,page) =>{ return axios.get(host + "/api/goods_type?limit=" + limit + "&page=" + page).then((res) => {return res;}).catch((error) => {return error.response})};



/**
 * 获取分类Tab一级菜单
 */
export const getCaiClassOne = (limit,page) =>{ return axios.get(host + "/api/goods_type?limit=" + limit + "&page=" + page).then((res) => {return res;}).catch((error) => {return error.response})};
/**
 * 获取分类Tab二级菜单
 */
export const getCaiClassChild = id =>{ return axios.get(host + "/api/get-second-type?id=" + id).then((res) => {return res;}).catch((error) => {return error.response})};
/**
 * 获取分类Tab二级菜单里面的菜品
 */
export const getCaiClassChildDetail = ( typeid , limit , page ) =>{ return axios.get(host + "/api/goods-list?typeid=" + typeid + "&limit=" + limit+ "&page=" + page).then((res) => {return res;}).catch((error) => {return error.response})};
/**
 * 获取商品详情
 */
export const getProductInfo = id =>{ return axios.get(host + "/api/goods/" + id).then((res) => {return res;}).catch((error) => {return error.response})};



/**
 * 获取购物车列表
 */
export const getCarList = (limit,page) =>{ return axios.get(host + "/api/shoppingcart?limit=" + limit + "&page=" + page).then((res) => {return res;}).catch((error) => {return error.response})};



/**
 *个人获取个人优惠券
 */
export const getCenterCoupons = ( limit , page ) =>{ return axios.get(host + "/api/get-self-redpacket?limit=" + limit+ "&page=" + page + "&is_receive=0").then((res) => {return res;}).catch((error) => {return error.response})};



/**
 *获取收货地址
 */
export const getDress = ( limit , page ) =>{ return axios.get(host + "/api/transport?limit=" + limit+ "&page=" + page + "&is_receive=0").then((res) => {return res;}).catch((error) => {return error.response})};
/**
 *新增收货地址
 */
export const AddDress = upData =>{ return axios.post(host + "/api/transport", upData).then((res) => {return res}).catch((error) => {return error.response})};
/**
 *编辑收货地址
 */
export const EditDress = ( item , upData ) =>{ return axios.put(host + "/api/transport/" + item.id, upData).then((res) => {return res}).catch((error) => {return error.response})};
/**
 *删除收货地址
 */
export const DeleDress = item  =>{ return axios.delete(host + "/api/transport/" + item.id).then((res) => {return res}).catch((error) => {return error.response})};
/**
 *修改默认收货地址
 */
export const DefaultDress = ( item , updata )  =>{ return axios.put(host + "/api/transport/" + item.id , updata).then((res) => {return res}).catch((error) => {return error.response})};