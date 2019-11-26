// (3.2) 退出登录
$('#logout').on('click', function () {
    // (3.3) 弹出提示框，确保用户不是按错了
    var isConfirm = confirm('您真的要退出吗?');
    if (isConfirm) {
        // (3.4) 用户点击了确定按钮，进行请求
        $.ajax({
            type: 'post',
            url: '/logout',
            success: function () {
                // (3.4) 接口文档返回的数据是：{"message": "退出成功"}；退出成功，跳转到登录页面
                location.href = 'login.html';
            },
            error: function () {
                alert('退出失败');
            }
        })
    }
});


// (25.9) 处理日期时间格式
function formateDate(date) {
    // 将日期时间字符串转换成日期对象
    date = new Date(date);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
}


// (44.1) 向服务器端发送请求，索要登录用户信息
$.ajax({
    type: 'get',
    url: '/users/' + userId,
    success: function (response) {
        // (44.2) 将用户头像显示在页面中
        $('.profile .avatar').attr('src', response.avatar);
        // (44.2) 将用户名称显示在页面中
        $('.profile .name').html(response.nickName);
    }
});