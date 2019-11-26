// (22.2) 向服务器端发送请求，获取文章分类数据
$.ajax({
    type: 'get',
    url: '/categories',
    success: function (response) {
        // (22.6) 使用模板引擎将数据和HTML字符串进行拼接
        var html = template('categoryTpl', { data: response });
        // (22.7) 将拼接好的字符串显示在页面中
        $('#category').html(html);
    }
});


// (23.1) 当管理员选择文件的时候，触发事件
$('#parentBox').on('change', '#feature', function () {  // $('#feature').on('change', function () { 
    // (23.2) 获取到管理员选择到的文件，只能选择一个文件
    var file = this.files[0];
    // (23.3) 创建formData对象，实现二进制文件上传
    var formData = new FormData();
    // (23.3) 将管理员选择到的文件追加到formData对象中
    formData.append('cover', file);
    // (23.4) 实现文章封面图片上传
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        // 告诉$.ajax方法不要处理data属性对应的参数
        processData: false,
        // 告诉$.ajax方法不要设置参数类型
        contentType: false,
        success: function (response) {
            // (23.6) 
            $('#thumbnail').val(response[0].cover);
        }
    })
});


// (24.2) 当添加文章表单提交的时候
$('#addForm').on('submit', function () {
    // (24.3) 获取管理员在表单中输入的内容
    var formData = $(this).serialize();
    // (24.4) 向服务器端发送请求，实现添加文章功能
    $.ajax({
        type: 'post',
        url: '/posts',
        data: formData,
        success: function () {
            // (24.5) 文章添加成功，跳转到文章列表页面
            location.href = '/admin/posts.html'
        }
    })

    // (24.2) 阻止表单默认提交的行为
    return false;
});


// (29.4) 获取游览器地址栏中的id参数
var id = getUrlParams('id');
// (29.5) 当前管理员是在做修改文章操作
if (id != null) {
    //(29.6) 根据id获取文章的详细信息
    $.ajax({
        type: 'get',
        url: '/posts/' + id,
        success: function (response) {
            // (29.11) 向服务器端发送请求，获取文章分类数据
            $.ajax({
                type: 'get',
                url: '/categories',
                success: function (categories) {
                    response.categories = categories;
                    // (29.9) 使用模板引擎将数据和HTML字符串进行拼接
                    var html = template('modifyTpl', response);
                    // (29.16) 将拼接好的字符串显示在页面中
                    $('#parentBox').html(html);
                }
            });
        }
    })
}

// (29.2) 从浏览器的地址栏中获取查询参数
function getUrlParams(name) {
    var paramsAry = location.search.substr(1).split('&');
    // (29.3) 循环数组
    for (var i = 0; i < paramsAry.length; i++) {
        var tmp = paramsAry[i].split('=');
        if (tmp[0] == name) {
            return tmp[1];
        }
    }
    return null;
}


// (30.1) 当修改文章信息表单发生提交行为的时候
$('#parentBox').on('submit', '#modifyForm', function () {
    // (30.2) 获取管理员在表单中输入的内容
    var formData = $(this).serialize();
    // (30.4) 获取管理员正在修改的文章id值
    var id = $(this).attr('data-id');
    $.ajax({
        type: 'put',
        url: '/posts/' + id,
        data: formData,
        success: function () {
            location.href = '/admin/posts.html';
        }
    })

    // (30.1) 阻止表单默认提交行为
    return false;
});