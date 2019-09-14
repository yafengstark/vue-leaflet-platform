/*
直接更新state的多个方法的对象
 */


export default {
    setUser(state, user) {
        state.user.userNo = user.userNo;
        state.user.username = user.username;
        state.user.token = user.token;
    },
    clearTargetList(state) {
        state.targetList = []
    },
    setMessageView(state, {message}) {
        state.messageView = message;
    },
    setTargetSubName(state, {name}) {
        console.log(name)
        state.targetSubName = name;
    },
    pageIndexIncrement(state) {
        state.pageIndex++;
    },
    addToTargetList(state, {marks}) {

        // console.log('run here this');
        // // console.log(this);
        // // console.log(responseBody);
        // console.log(state.messageView)

        marks.forEach(mark => {
            state.targetList.push(
                {
                    pk_id: mark.pkId,
                    name: mark.name,
                    lat: 120,
                    lon: 120,
                    summarize: '100人',
                    description: '是第一个成立的子公司',
                    clazz_code: {
                        id: 100,
                        name: '一级部门'
                    }
                }
            );
        });

    }

}