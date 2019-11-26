// (41.3) 当管理员选择logo图片时
$('#logo').on('change', function () {
    // (41.4) 获取到管理员选择到的图片
    var file = this.files[0];
    // (41.4) 创建formData对象，实现二进制文件上传
    var formData = new FormData();
    // (41.4) 将管理员选择到的文件添加到formData对象中
    formData.append('logo', file);
    // (41.5) 向服务器端发送请求，实现文件上传
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        // 告诉$.ajax方法不要处理data属性对应的参数
        processData: false,
        // 告诉$.ajax方法不要设置参数类型
        contentType: false,
        success: function (response) {
            $('#hiddenLogo').val(response[0].logo);
            // (42.6) 将logo图片显示在页面中
            $('#preview').attr('src', response[0].logo);
        }
    })
});


// (42.2) 当网站设置表单发生提交行为时
$('#settingsForm').on('submit', function () {
    // (42.3) 获取管理员在表单中输入的内容
    var formData = $(this).serialize();
    // (42.4) 向服务器端发生请求，实现网站设置数据添加功能
    $.ajax({
        type: 'post',
        url: '/settings',
        data: formData,
        success: function () {
            location.reload();
        }
    })

    // (42.2) 阻止表单默认提交行为
    return false;
});


// (43.1) 向服务器端发送请求，索要网站设置数据
$.ajax({
    type: 'get',
    url: '/settings',
    success: function (response) {
        if (response) {
            // (43.2) 将logo地址存储在隐藏域中
            $('#hiddenLogo').val(response.logo);
            // (43.3) 将logo显示在页面中
            $('#preview').attr('src', response.logo);
            // (43.3) 将网站标题显示在页面中
            $('input[name="title"]').val(response.title);
            // (43.4) 将站点描述显示在页面中
            $('textarea[name="description"]').html(response.description);
            // (43.3) 将站点关键字显示在页面中
            $('input[name="keywords"]').val(response.keywords);
            // (43.5) 将是否开启评论功能显示在页面中
            $('input[name="comment"]').prop('checked', response.comment);
            // (43.5) 将评论是否经过人工审核显示在页面中
            $('input[name="review"]').prop('checked', response.review);
        }
    }
})