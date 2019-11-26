/* // (32.3) 添加一些模拟数据
$.ajax({
    type: 'post',
    url: '/comments',
    data: {
        // 用户的id
        author: '5dd74cc60f0ee7531a00879f',
        content: '该换文字了',
        // 文章的id
        post: '5ddb4bd0b189ea5cd60f7648',
    },
    success: function (res) {
        console.log(res);
    }
}); */

// (32.2) 向服务器端发送请求，获取评论列表数据
$.ajax({
    type: 'get',
    url: '/comments',
    success: function (response) {
        // (32.7) 使用模板引擎将数据和HTML字符串进行拼接
        var html = template('commentsTpl', response);
        // (32.9) 将拼接好的字符串显示在页面中
        $('#commentsBox').html(html);


        // (33.3) 使用模板引擎将数据和HTML字符串进行拼接
        var pageHTML = template('pageTpl', response);
        // (33.5) 将拼接好的字符串显示在页面中
        $('#pageBox').html(pageHTML);
    }
});

// (33.7) 实现分页
function changePage(page) {
    // (33.8) 向服务器端发送请求，获取评论列表数据
    $.ajax({
        type: 'get',
        url: '/comments',
        // (33.9) data
        data: {
            page: page
        },
        success: function (response) {
            // (32.7) 使用模板引擎将数据和HTML字符串进行拼接
            var html = template('commentsTpl', response);
            // (32.9) 将拼接好的字符串显示在页面中
            $('#commentsBox').html(html);


            // (33.3) 使用模板引擎将数据和HTML字符串进行拼接
            var pageHTML = template('pageTpl', response);
            // (33.5) 将拼接好的字符串显示在页面中
            $('#pageBox').html(pageHTML);
        }
    });
}


// (34.2) 当审核按钮被点击的时候
$('#commentsBox').on('click', '.status', function () {
    // (34.4) 获取当前评论的状态
    var status = $(this).attr('data-status');
    // (34.4) 获取当前要修改的评论id
    var id = $(this).attr('data-id');
    // (34.5) 向服务器端发送请求，更改评论状态
    $.ajax({
        type: 'put',
        url: '/comments/' + id,
        data: {
            state: status == 0 ? 1 : 0
        },
        success: function () {
            location.reload();
        }
    })
});


// (35.1) 当删除按钮被点击时
$('#commentsBox').on('click', '.delete', function () {
    if (confirm('您真的要执行删除操作吗')) {
        // (35.3) 获取管理员要删除的评论的id
        var id = $(this).attr('data-id');
        // (35.4) 向服务器端发送请求，执行删除操作
        $.ajax({
            type: 'delete',
            url: '/comments/' + id,
            success: function () {
                location.reload();
            }
        })
    }
});