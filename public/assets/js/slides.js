// (37.3) 当管理员选择文件的时候
$('#file').on('change', function () {
    // (37.4) 用户选择到的文件，只能选择一个文件
    var file = this.files[0];
    // (37.5) 创建formData对象实现二进制文件上传
    var formData = new FormData();
    // (37.5) 将管理员选择到的文件添加到formData对象中
    formData.append('image', file);
    // (37.6) 向服务器端发送请求，实现图片上传
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        // 告诉$.ajax方法不要处理data属性对应的参数
        processData: false,
        // 告诉$.ajax方法不要设置参数类型
        contentType: false,
        success: function (response) {
            $('#image').val(response[0].image);
        }
    })
});


// (38.3) 当轮播图表单发生提交行为时
$('#slidesForm').on('submit', function () {
    // (38.4) 获取管理员在表单中输入的内容
    var formData = $(this).serialize();
    // (38.5) 向服务器端发送请求，添加轮播图数据
    $.ajax({
        type: 'post',
        url: '/slides',
        data: formData,
        success: function () {
            location.reload();
        }
    })

    // (38.3) 阻止表单默认提交行为
    return false;
});


// (39.1) 向服务器端发送请求，索要图片轮播列表数据
$.ajax({
    type: 'get',
    url: '/slides',
    success: function (response) {
        // (39.5) 使用模板引擎将数据和HTML字符串进行拼接
        var html = template('slidesTpl', { data: response });
        // (39.7) 将拼接好的字符串显示在页面中
        $('#slidesBox').html(html);
    }
});


// (40.2) 当删除按钮被点击时
$('#slidesBox').on('click', '.delete', function () {
    if (confirm('您真的要执行删除操作吗')) {
        // (40.3) 获取管理员要删除的轮播图数据id
        var id = $(this).attr('data-id');
        // (40.4) 向服务器端发送请求，实现轮播图数据删除功能
        $.ajax({
            type: 'delete',
            url: '/slides/' + id,
            success: function () {
                location.reload();
            }
        })
    }
});
