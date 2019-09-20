/*
直接更新state的多个方法的对象

在 mutation 中混合异步调用会导致你的程序很难调试。
例如，当你调用了两个包含异步回调的 mutation 来改变状态，你怎么知道什么时候回调和哪个先回调呢？这就是为什么我们要区分这两个概念。在 Vuex 中，mutation 都是同步事务：


 */


export default {
    setUser(state, user) {
        state.user.userNo = user.userNo;
        state.user.username = user.username;
        state.user.token = user.token;
    },
    /**
     * 搜索前的清除标注
     *
     * @param state
     */
    clearMarkList(state) {
        state.markList = [];
        state.pageIndex = 0;
    },
    setMessageView(state, {message}) {
        state.messageView = message;
    },
    checkToken(state, {token}) {

        console.log(token);

        if (token !== null && token !== undefined && token !== '') {
             state.isPass = true;
        }else{
            state.isPass = false;
        }
        console.log(state.isPass);
    },
    /**
     *
     * @param state
     * @param map
     */
    setMap(state, {map}){
        console.log('store.setMap begin----');
        console.log(map);
        state.myMap = map;
        console.log('store.setMap end----');
    },
    /**
     *
     * @param state
     * @param location
     */
    setMyMapRect(state, {minLon, maxLon, minLat, maxLat}){

        state.myMapHandleObject.rectangle = {
            minLon: minLon,
            maxLon: maxLon,
            minLat: minLat,
            maxLat: maxLat,
        };
    },
    /**
     * 地图跳转
     * @param state
     * @param lat
     * @param lon
     * @param zoom
     */
    fly(state,{lat, lon,zoom}){
        // console.log('store fly');
        // console.log(state.myMap);
        state.myMap.flyTo([lat, lon], zoom);
    },
    /**
     *
     * @param state
     * @param name 关键字
     */
    setMarkSubName(state, {name}) {
        state.targetSubName = name;
    },
    pageIndexIncrement(state) {
        state.pageIndex++;
    },
    /**
     *
     * @param state
     * @param marks
     */
    addToMarkList(state, {marks}) {


        marks.forEach(mark => {
            state.markList.push(
                {
                    pk_id: mark.pkId,
                    name: mark.name,
                    lat: mark.lat,
                    lon: mark.lon,
                    summarize: '100人',
                    description: mark.description,
                    // clazz_code: {
                    //     id: 100,
                    //     name: '一级部门'
                    // }
                }
            );
        });

    },
    removeMarkFromList(state, {markId}) {
        var index = 0;

        console.log('markId：' + markId);

        for (var i = 0; i < state.markList.length; i++) {
            let mark = state.markList[i];
            console.log(mark.pk_id);
            if (mark.pk_id == markId) {
                index = i;
            }
        }
        console.log('待删除的下标：' + index);

        let arr = state.markList;
        state.markList = arr.slice(0, index).concat(arr.slice(index + 1, arr.length))

    }

}