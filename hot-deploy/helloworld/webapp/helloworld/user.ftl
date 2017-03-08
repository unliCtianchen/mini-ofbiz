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
                <td><input type="text" id="userName" name="userName" value="${userName!""}" size="20"/><input type="hidden" name="userId" value=""></td>
            </tr>

            <tr>
                <td class="label">密码：</td>
                <td><input type="text" id="userPassword" name="userPassword" value="${userPassword!""}" size="20"/></td>
            </tr>

            <tr>
                <td class="label">地址：</td>
                <td><input type="text" id="adr" name="adr" value="${adr!""}" size="20"/></td>
           </tr>
            <tr>
                <td class="label">年龄：</td>
                <td><input type="text" id="age" name="age" value="${age!""}" size="20"/></td>
            </tr>
            <tr>
                <td class="label">性别：</td>
                <td><input type="text" id="sex" name="sex" value="${sex!""}" size="20"/></td>
            </tr>
            <tr>
                <td class="label">身份证：</td>
                <td><input type="text" id="IdCrad" name="IdCard" value="${IdCard!""}" size="20"/></td>
            </tr>

            <tr>
                <td></td>
                <td colspan="1" align="center"><input type="submit" value="保存"/>&nbsp&nbsp&nbsp<input type="button" value="返回" onclick="rebank()"/>&nbsp&nbsp&nbsp<input type="button" value="查看" onclick="querUserInfo()"/>&nbsp&nbsp&nbsp<input type="button" value="查询" onclick="querUserInfolist()"/></td>

            </tr>
        </table>
        <br/>
        <table>
            <tr><td>ID：</td><td>用户名：</td><td>密码：</td><td>地址：</td><td>年龄：</td><td>性别：</td><td>身份证：</td></tr>
            <#list userInfoList as user>
            <tr data-value="${user.userId}" class="v"><td>${user.userId}</td><td>${user.userName}</td><td>${user.userPassword}</td><td>${user.adr}</td><td>${user.age}</td><td>${user.sex}</td><td>${user.IdCard}</td><td><input type="button" name="delete" value="删除" onclick="deleteU(this)"/></td><td><input type="button" name="update" value="修改" onclick="updateU(this)"/></td></tr>
            </#list>
        </table>


    </form>
</div>
<div id="createtable"></div>
<script>
    function deleteU($this) {
        var uid=$($this).parents(".v").attr("data-value");
        var choice=confirm("您确认要删除吗？", function() { }, null);
        if(choice){
            jQuery.ajax({
                url:"<@ofbizUrl>deleteUser</@ofbizUrl>",
                type:"POST",
                data:{userId:uid},
                success:function (data) {
                    if(data.result=="success") {
                        location = "<@ofbizUrl>user</@ofbizUrl>";
                    }
                }
            });
        }
    }
    
    function  updateU($this) {
        var uid=$($this).parents(".v").attr("data-value");
        location="<@ofbizUrl>userUpdate</@ofbizUrl>?userId="+uid;
    }


    function  rebank() {
        location="<@ofbizUrl>user</@ofbizUrl>";
    }



    function querUserInfo() {
        var userName=$("#userName").val();
        var userPassword=$("#userPassword").val();
        var adr=$("#adr").val();
        var age=$("#age").val();
        var sex=$("#sex").val();
        var IdCard=$("#IdCrad").val();

        var str="";
        if(userName!=""){
            str+="?userName="+userName;
        }
        if(userPassword!=""){
            str+="?userPassword="+userPassword;
        }
        if(adr!=""){
            str+="?adr="+adr;
        }
        if(age!=""){
            str+="?age="+age;
        }
        if(sex!=""){
            str+="?sex="+sex;
        }
        if(IdCard!=""){
            str+="?IdCard="+IdCard;
            alert(str)
        }

        if(str!=""){
            location="<@ofbizUrl>userUpdate</@ofbizUrl>"+str;
        }else{
            alert("请输入查询条件！")
        }
    }
    
    function querUserInfolist() {
        var userName=$("#userName").val();
        var userPassword=$("#userPassword").val();
        var adr=$("#adr").val();
        var age=$("#age").val();
        var sex=$("#sex").val();
        var IdCard=$("#IdCard").val();
            jQuery.ajax({
                url:"<@ofbizUrl>querUserInfoL</@ofbizUrl>",
                type:"POST",
                data:{userName:userName,userPassword:userPassword,adr:adr,age:age,sex:sex,IdCard:IdCard},
                dataType:"json",
                success:function (data){
                    debugger;
                    $("#lis").html(" ");//根据ID删除表格
                    //根据数组动态生成表格并回填数据到表格
                    if(data.result=="success") {
                        var len = data.data.userInfoAry.length;
                        var table = $("<table  id='lis' frame=void rules=none border=\"1\">");
                        table.appendTo($("#createtable"));
                        var tr = $("<tr></tr>");
                        tr.appendTo(table);
                        var td = $("<td>ID： </td><td>用户名： </td><td>密码： </td><td>地址： </td><td>年龄：</td><td>性别： </td><td>身份证： </td><td>&nbsp&nbsp</td");
                        td.appendTo(tr);

                        for (var i = 0; i < len; i++) {
                            tr = $("<tr data-value='" + data.data.userInfoAry[i].personId + "' class='sss'></tr>");
                            tr.appendTo(table);
                            td = $("<td>" + data.data.userInfoAry[i].userId + "</td><td>" + data.data.userInfoAry[i].userName + "</td><td>" + data.data.userInfoAry[i].userPassword + "</td><td>" + data.data.userInfoAry[i].adr + "</td><td>" + data.data.userInfoAry[i].age + "</td><td>" + data.data.userInfoAry[i].sex + "</td><td>" + data.data.userInfoAry[i].IdCard + "</td><td><input type='button' name='delete' value='删除' onclick='deleteU(this)'/></td><td><input type='button' name='update' value='修改' onclick='updateU(this)'/></td>");
                            td.appendTo(tr);
                        }
                        // trend.appendTo(table);
                        $("#createtable").append("</table>");

                    }
                }
            });
    }





</script>
