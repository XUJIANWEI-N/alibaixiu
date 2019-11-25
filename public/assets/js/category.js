// (16.3) 当添加分类表单发生提交行为的时候
$('#addCategory').on('submit', function () {
    // (16.4) 获取用户在表单中输入的内容
    var formData = $(this).serialize();
    // (16.5) 向服务器端发送请求，添加分类
    $.ajax({
        type: 'post',
        url: '/categories',
        data: formData,
        success: function () {
            location.reload();
        }
    });
    // (16.3) 阻止表单默认提交行为
    return false;
});


// (17.1) 发送ajax请求，向服务器端索要分类列表数据
$.ajax({
    type: 'get',
    url: '/categories',
    success: function (response) {
        // (17.6) 将服务器端返回的数据和HTML模板进行拼接
        var html = template('categoryListpl', { data: response });
        // (17.8) 将拼接好的内容放到页面中
        $('#categoryBox').html(html);
    }
});


// (18.1) 为编辑按钮添加点击事件
$('#categoryBox').on('click', '.edit', function () {
    // (18.3) 获取要修改的分类数据的id
    var id = $(this).attr('data-id');
    // (18.4) 根据id获取分类数据的详细信息
    $.ajax({
        type: 'get',
        url: '/categories/' + id,
        success: function (response) {
            // (19.3) 将服务器端返回的数据和HTML模板进行拼接
            var html = template('modifyCategoryTpl', response);
            // (19.6) 将拼接好的内容放到页面中
            $('#formBox').html(html);
        }
    })
});


// (20.1) 当修改分类数据表单发生提交行为的时候
$('#formBox').on('submit', '#modifyCategory', function () {
    // (20.2) 获取管理员在表单中输入的内容
    var formData = $(this).serialize();
    // (20.3) 获取要修改的分类id
    var id = $(this).attr('data-id');
    // (20.4) 发生请求，修改分类数据
    $.ajax({
        type: 'put',
        url: '/categories/' + id,
        data: formData,
        success: function () {
            location.reload();
        }
    });

    // (20.1) 阻止表单的默认提交行为
    return false;
});


// (21.2) 当删除按钮被点击的时候
$('#categoryBox').on('click', '.delete', function () {
    if (confirm('您真的要执行删除操作吗')) {
        // (21.3) 获取要删除的分类数据id
        var id = $(this).attr('data-id');
        $.ajax({
            type: 'delete',
            url: '/categories/' + id,
            success: function () {
                location.reload();
            }
        })
    }
});