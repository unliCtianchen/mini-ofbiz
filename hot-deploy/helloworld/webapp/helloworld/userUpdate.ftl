<div class="header">

    <div class="dl-title">
        <span class="dl-title-text">用户信息</span>
    </div>
</div>
<div class="screenlet-body">
    <form method="post" action="<@ofbizUrl>saveUser</@ofbizUrl>" name="loginform">
        <table class="basic-table" cellspacing="0">
        <#list userInfoList as user>
            <tr>
                <td class="label">用户名：</td>
                <td><input type="text" name="userName" value="${user.userName!}" size="20"/><input type="hidden" name="userId" value="${user.userId!}"></td>
            </tr>

            <tr>
                <td class="label">密码：</td>
                <td><input type="text" name="userPassword" value="${user.userPassword!}" size="20"/></td>
            </tr>

            <tr>
                <td class="label">地址：</td>
                <td><input type="text" name="adr" value="${user.adr!}" size="20"/></td>
            </tr>
            <tr>
                <td class="label">年龄：</td>
                <td><input type="text" name="age" value="${user.age!}" size="20"/></td>
            </tr>
            <tr>
                <td class="label">性别：</td>
                <td><input type="text" name="sex" value="${user.sex!}" size="20"/></td>
            </tr>
            <tr>
                <td class="label">身份证：</td>
                <td><input type="text" name="IdCard" value="${user.IdCard!}" size="20"/></td>
            </tr>

            <tr>
                <td></td>
                <td colspan="1" align="center"><input type="submit" value="保存"/>&nbsp&nbsp&nbsp<input type="button" value="返回" onclick="rebank()"/></td>

            </tr>
        </#list>
        </table>
        <br/>
    </form>
</div>
<script>
    function  rebank() {
        location="<@ofbizUrl>user</@ofbizUrl>";
    }

</script>