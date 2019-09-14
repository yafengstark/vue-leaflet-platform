<template>
    <div class="header-contain">
        <!--<a>管理平台</a>-->

        <Menu class="header-menu" mode="horizontal" theme="light" width="auto" active-name="1">
            <MenuItem name="1">
                <Icon type="ios-paper" />
                 标注管理
            </MenuItem>
            <MenuItem name="2">
                <Icon type="ios-people" />
                分类编码
            </MenuItem>
            <MenuItem name="3">
                <Icon type="ios-paper" />
                数据统计
            </MenuItem>
            <MenuItem class="header-search" name="4">
                <Input search placeholder="Enter something..." />
            </MenuItem>
            <MenuItem name="5">
                <Icon type="ios-notifications" size="32" />
            </MenuItem>
            <MenuItem name="6">
                <Icon type="ios-chatbubbles" size="32"/>
            </MenuItem>

            <MenuItem name="7">
                <Icon type="ios-person" size="32"/>
            </MenuItem>
        </Menu>

    </div>
</template>

<script>
    // 导入自己封装的轮播图子组件


    export default {
        data() {
            return {};
        },
        created() {

        },
        methods: {
            async getlunbotu() {

            }
        },
        components: {
            // 注册子组件

        }
    };
</script>

<style lang="scss" scoped>

    .header-contain{

        .logo{

        }
        .header-menu {
            display: inline-block;
            width: 100%;
            .header-search{
                width: 30%;
            }
        }

    }


</style>
