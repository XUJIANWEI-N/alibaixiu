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