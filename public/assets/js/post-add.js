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
$('#feature').on('change', function () {
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