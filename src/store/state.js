/*
状态对象
 */
export default {
    messageView: undefined,// this.$Message的同一对象
    myMap: undefined, // leaflet map = myMap.mapObject
    myMapHandleObject:{
        rectangle:{ // 框选的框
            minLon: -180,
            maxLon: 180,
            minLat: -90,
            maxLat: 90,
        }

    },
    isPass: false, // token是否通过验证
    user:{
        username:"",
        userNo:'',
        token:''
    },
    markList:[], // 首页目标列表
    pageIndex: 1, // 首页分页下标
    markSubName: '', // 标注部分名称
}