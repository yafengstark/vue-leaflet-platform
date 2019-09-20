<template>
    <div class="comment-container">

        <h3>共有{{comment_num}}条评论</h3>
        <div>
            <!-- 发表评论-->

            <Form :model="formItem" label-position="top">
                <FormItem label="评论内容">
                    <Input v-model="formItem.textarea" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                           placeholder="Enter something..."></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="doComment()">评论</Button>
                </FormItem>
            </Form>
        </div>
        <Card dis-hover v-for="(item, index) in comments" :key="index">
            <div class="username">{{item.username}}</div>

            <div class="comment">{{item.content}}</div>
            <div class="createTime">评论时间：{{item.createTime | dateFormat}}</div>
            <div class="star">
                <div class='up'>
                    <Button shape="circle" icon="md-thumbs-up">{{item.star}}</Button>
                </div>

                <div class='down'>
                    <Button shape="circle" icon="md-thumbs-down">{{item.unstar}}</Button>
                </div>
            </div>
        </Card>

    </div>
</template>

<script>
    // 导入自己封装的轮播图子组件
    import {
        getMarkComments,
        postComment
    } from '../../api'



    export default {
        data() {
            return {
                comment_num: 10,
                comments: [],
                formItem: {
                    textarea: ''
                }
            };
        },
        created() {
            this.getComments();
        },
        methods: {
            async getComments() {
                const responseBody = await getMarkComments(this.id);
                if (responseBody.status === 200) {

                    responseBody.result.forEach((comment) => {
                        this.comments.push({
                            id: comment.markComment.pkId,
                            username: comment.username,
                            content: comment.markComment.content,
                            createTime: comment.markComment.comDate,
                            star: 11,
                            unstar: 1
                        })
                    });

                    this.$Message.info('获取评论成功');

                } else {
                    this.$Message.info('获取评论失败！' + responseBody.message);
                }
            },
            async doComment() {
                const responseBody = await postComment(this.$cookies.get('token'), this.id, this.formItem.textarea);


                if (responseBody.status === 200) {
                    this.$Message.info(' 发表成功');
                    var comment = responseBody.result;
                    this.comments.push({
                        id: comment.markComment.pkId,
                        username: comment.username,
                        content: comment.markComment.content,
                        createTime: comment.markComment.comDate,
                        star: 11,
                        unstar: 1
                    })


                } else {
                    this.$Message.info('发表失败！' + responseBody.message);
                }
            }
        },
        components: {
            // 注册子组件

        },
        props: ["id"],
    };
</script>

<style lang="scss" scoped>

    .comment-container {

        .username {
            font-size: 20px;

        }
        .comment {
            margin-left: 20px;
        }
        .createTime {

        }
        .star {
            display: flex;
            justify-content: flex-end;
            .up {

            }
            .down {
                margin-left: 10px;
            }
        }

    }

</style>
