<div class="header">

    <div class="dl-title">
        <span class="dl-title-text">用户信息</span>
    </div>
</div>
<div class="screenlet-body">
    <form method="post" action="<@ofbizUrl>saveUser</@ofbizUrl>" name="loginform">
        <table class="basic-table" cellspacing="0">
            <tr>
                <td class="label">用户名：</td>
                <td><input type="text" name="userName" value="${userName!""}" size="20"/><input type="hidden" name="userId" value=""></td>
            </tr>

            <tr>
                <td class="label">密码：</td>
                <td><input type="text" name="userPassword" value="${userPassword!""}" size="20"/></td>
            </tr>

            <tr>
                <td class="label">地址：</td>
                <td><input type="text" name="adr" value="${adr!""}" size="20"/></td>
           </tr>
            <tr>
                <td class="label">年龄：</td>
                <td><input type="text" name="age" value="${age!""}" size="20"/></td>
            </tr>
            <tr>
                <td class="label">性别：</td>
                <td><input type="text" name="sex" value="${sex!""}" size="20"/></td>
            </tr>
            <tr>
                <td class="label">身份证：</td>
                <td><input type="text" name="IdCard" value="${IdCard!""}" size="20"/></td>
            </tr>

            <tr>
                <td colspan="2" align="center"><input type="submit" value="保存"/></td>
            </tr>
        </table>
        <br/>
    </form>
</div>