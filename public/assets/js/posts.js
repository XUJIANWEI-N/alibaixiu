// (25.2) 向服务器端发送请求，获取文章列表数据
$.ajax({
    type: 'get',
    url: '/posts',
    success: function (response) {
        // (25.6) 使用模板引擎将数据和HTML字符串进行拼接
        var html = template('postsTpl', response);
        // (25.8) 将拼接好的字符串显示在页面中
        $('#postsBox').html(html);

        // (26.3) 使用模板引擎将数据和HTML字符串进行拼接
        var page = template('pageTpl', response);
        // (26.5) 将拼接好的字符串显示在页面中
        $('#page').html(page);
    }
});

/* // 移动到commont.js里了
// (25.9) 处理日期时间格式
function formateDate(date) {
    // 将日期时间字符串转换成日期对象
    date = new Date(date);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
} */


// (26.6) 分页
function changePage(page) {
    // (26.6) 向服务器端发送请求，获取文章列表数据
    $.ajax({
        type: 'get',
        url: '/posts',
        // (26.6) data
        data: {
            page: page
        },
        success: function (response) {
            // (25.6) 使用模板引擎将数据和HTML字符串进行拼接
            var html = template('postsTpl', response);
            // (25.8) 将拼接好的字符串显示在页面中
            $('#postsBox').html(html);

            // (26.3) 使用模板引擎将数据和HTML字符串进行拼接
            var page = template('pageTpl', response);
            // (26.5) 将拼接好的字符串显示在页面中
            $('#page').html(page);
        }
    });
}


// (27.1) 向服务器端发送请求，索要分类数据
$.ajax({
    type: 'get',
    url: '/categories',
    success: function (response) {
        // (27.4) 使用模板引擎将数据和HTML字符串进行拼接
        var html = template('categoryTpl', { data: response });
        // (27.6) 将拼接好的字符串显示在页面中
        $('#categoryBox').html(html);
    }
});


// (28.3) 当用户进行文章列表筛选的时候
$('#filterForm').on('submit', function () {
    // (28.4) 获取到管理员选择的过滤条件
    var formData = $(this).serialize();
    // (28.5) 向服务器端发送请求，根据条件索要文章列表数据
    $.ajax({
        type: 'get',
        url: '/posts',
        // (28.6) data
        data: formData,
        success: function (response) {
            // (25.6) 使用模板引擎将数据和HTML字符串进行拼接
            var html = template('postsTpl', response);
            // (25.8) 将拼接好的字符串显示在页面中
            $('#postsBox').html(html);

            // (26.3) 使用模板引擎将数据和HTML字符串进行拼接
            var page = template('pageTpl', response);
            // (26.5) 将拼接好的字符串显示在页面中
            $('#page').html(page);
        }
    });

    // (28.3) 阻止表单默认提交行为
    return false;
});


// (31.2) 当删除按钮被点击的时候
$('#postsBox').on('click', '.delete', function () {
    // (31.3) 弹出删除确认框和管理员确认是否真的要进行删除操作
    if (confirm('您真的要进行删除操作吗')) {
        // (31.5) 获取到管理员要删除的文章的id
        var id = $(this).attr('data-id');
        // (31.6) 向服务器端发送请求，执行删除操作
        $.ajax({
            type: 'delete',
            url: '/posts/' + id,
            success: function () {
                location.reload();
            }
        })
    }
});