import store from "../store/store.js";
import axios from "axios";
const host = store.state.host;


/**
 * 获取Token
 * 
 */
export const getToken = ( data ) =>{ return axios.post(host + "/api/login",data).then((res) => {return res;}).catch((error) => {return error.response})};

/* 获取Tokentest
* 
*/
export const getTokentest = () =>{ return axios.get(host + "/getToken").then((res) => {return res;}).catch((error) => {return error.response})};

/* 获取WXinfo
* 
*/
export const getUserWXInfo = () =>{ return axios.get(host + "/getInfo").then((res) => {return res;}).catch((error) => {return error.response})};

/* 发送手机验证码
* 
*/
export const sendPhoneYzm = ( phone ) =>{ return axios.post(host + "/api/config/send-sms", phone).then((res) => {return res;}).catch((error) => {return error.response})};

/**
 * 获取首页轮播图
 * @param limit分页条数
 * @param page当前页码
 */
export const getIndexBanner = (limit , page) =>{ return axios.get(host + "/api/banner?limit=" + limit + "&page=" + page).then((res) => {return res;}).catch((error) => {return error.response})};
/**
 * 获取首页分类专区
 */
export const getIndexClass = (limit , page) =>{ return axios.get(host + "/api/goods_type?limit=" + limit + "&page=" + page).then((res) => {return res;}).catch((error) => {return error.response})};



/**
 * 获取分类Tab一级菜单
 */
export const getCaiClassOne = (limit , page) =>{ return axios.get(host + "/api/goods_type?limit=" + limit + "&page=" + page).then((res) => {return res;}).catch((error) => {return error.response})};
/**
 * 获取分类Tab二级菜单
 */
export const getCaiClassChild = id =>{ return axios.get(host + "/api/get-second-type?id=" + id).then((res) => {return res;}).catch((error) => {return error.response})};
/**
 * 获取分类Tab二级菜单里面的菜品
 * @param limit分页条数
 */
export const getCaiClassChildDetail = (typeid , limit , page) =>{ return axios.get(host + "/api/goods-list?typeid=" + typeid + "&limit=" + limit+ "&page=" + page).then((res) => {return res;}).catch((error) => {return error.response})};
/**
 * 获取商品详情
 */
export const getProductInfos = objid =>{ return axios.get(host + "/api/goods/" + objid).then((res) => {return res;}).catch((error) => {return error.response})};



/**
 * 获取购物车列表
 */
export const getCarList = (limit , page) =>{ return axios.get(host + "/api/shoppingcart?limit=" + limit + "&page=" + page).then((res) => {return res;}).catch((error) => {return error.response})};

/**
 * 添加购物车
 */
export const AddCarShop = upData =>{ return axios.post(host + "/api/shoppingcart", upData).then((res) => {return res;}).catch((error) => {return error.response})};

/**
 * 删除购物车
 */
export const DeleCarShop = id =>{ return axios.delete(host + "/api/shoppingcart/"+id).then((res) => {return res;}).catch((error) => {return error.response})};

/**
 * 修改购物车
 */
export const EditCarShop = (id , upData) =>{ return axios.put(host + "/api/shoppingcart/"+id , upData).then((res) => {return res;}).catch((error) => {return error.response})};

/**
 * 提交购物车
 */
export const AddOrder = upData  =>{ return axios.post(host + "/api/order/" , upData).then((res) => {return res;}).catch((error) => {return error.response})};



/**
 * 搜索商品
 */
export const SearchWord = word =>{ return axios.get(host + "/api/get-search-goods?key_word="+word).then((res) => {return res;}).catch((error) => {return error.response})};

/**
 * 获取搜索关键字
 */
export const GetKeyWord = ()  =>{ return axios.get(host + "/api/get-history").then((res) => {return res;}).catch((error) => {return error.response})};

/**
 * 获取搜索热门关键字
 */
export const GetKeyHotWord = ()  =>{ return axios.get(host + "/api/get-hot").then((res) => {return res;}).catch((error) => {return error.response})};

/**
 * 获取搜索热门关键字
 */
export const DeleKeyWord = ()  =>{ return axios.put(host + "/api/delete-history").then((res) => {return res;}).catch((error) => {return error.response})};





/**
 *查询可领取的优惠券
 */
export const getCoupons = (limit , page) =>{ return axios.get(host + "/api/get-self-redpacket?limit=" + limit+ "&page=" + page).then((res) => {return res;}).catch((error) => {return error.response})};

/**
 *删除过期优惠券
 */
export const deletCoupons = id =>{ return axios.delete(host + "/api/get-self-redpacket?id=" + id).then((res) => {return res;}).catch((error) => {return error.response})};

/**
 *获取个人优惠券
 */
export const getCenterCoupons = (limit , page) =>{ return axios.get(host + "/api/get-self-redpacket?limit=" + limit+ "&page=" + page + "&is_receive=0").then((res) => {return res;}).catch((error) => {return error.response})};

/**
 *获取个人订单
 */
export const getOrders = (limit , page) =>{ return axios.get(host + "/api/get-self-order?order_status=0&limit=" + limit+ "&page=" + page).then((res) => {return res;}).catch((error) => {return error.response})};


/**
 *获取收货地址
 */
export const getDress = (limit , page) =>{ return axios.get(host + "/api/transport?limit=" + limit+ "&page=" + page + "&is_receive=0").then((res) => {return res;}).catch((error) => {return error.response})};
/**
 *新增收货地址
 */
export const AddDress = upData =>{ return axios.post(host + "/api/transport", upData).then((res) => {return res}).catch((error) => {return error.response})};
/**
 *编辑收货地址
 */
export const EditDress = (item , upData) =>{ return axios.put(host + "/api/transport/" + item.id, upData).then((res) => {return res}).catch((error) => {return error.response})};
/**
 *删除收货地址
 */
export const DeleDress = item  =>{ return axios.delete(host + "/api/transport/" + item.id).then((res) => {return res}).catch((error) => {return error.response})};
/**
 *修改默认收货地址
 */
export const DefaultDress = (item , updata)  =>{ return axios.put(host + "/api/transport/" + item.id , updata).then((res) => {return res}).catch((error) => {return error.response})};