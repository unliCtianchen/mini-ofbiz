package com.juweitu.helloworld

import org.miniofbiz.ext.util.ExtEntityUtil
import org.miniofbiz.ext.util.MessageUtil
import org.ofbiz.base.util.UtilHttp
import org.ofbiz.base.util.UtilValidate
import org.ofbiz.entity.Delegator
import org.ofbiz.entity.condition.EntityCondition
import org.ofbiz.entity.condition.EntityOperator
import org.ofbiz.service.LocalDispatcher
import org.ofbiz.service.ServiceUtil

import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

public String saveUser() {
    HttpServletRequest request = request
    HttpServletResponse response = response
    Delegator delegator = delegator
    LocalDispatcher dispatcher = dispatcher
    def requestParameters = UtilHttp.getParameterMap(request)

    def userId = requestParameters.userId
    def userName = requestParameters.userName
    def userPassword = requestParameters.userPassword
    def adr = requestParameters.adr
    def age = requestParameters.age
    def sex = requestParameters.sex
    def IdCard = requestParameters.IdCard

    def results=[:]
    if (UtilValidate.isWhitespace(userId)) {
        results = dispatcher.runSync("bizSaveUserInfo", [
                userName: userName,
                userPassword : userPassword,
                adr : adr,
                age : age,
                sex : sex,
                IdCard:IdCard
        ])
    }else{
        results = dispatcher.runSync("bizUpdateUserInfo", [
                userId :userId,
                userName: userName,
                userPassword : userPassword,
                adr : adr,
                age : age,
                sex : sex,
                IdCard:IdCard
        ])
    }


    return MessageUtil.handleServiceResults(request,results)
}


public String deleteUser() {
    HttpServletRequest request = request
    HttpServletResponse response = response
    LocalDispatcher dispatcher = dispatcher
    def requestParameters = UtilHttp.getParameterMap(request)

    def userId = requestParameters.userId

    if (!UtilValidate.isWhitespace(userId)) {
        def results = dispatcher.runSync("bizDeleteUserInfo", [
                userId: userId
        ])
        if (!ServiceUtil.isSuccess(results)) return MessageUtil.handleServiceResults(request, results)
        return "success"
    }
}


public quertUserInfolist(Map context) {
    HttpServletRequest request = request
    HttpServletResponse response = response
    Delegator delegator = delegator
    LocalDispatcher dispatcher = dispatcher
    def requestParameters = UtilHttp.getParameterMap(request)

    def userId = requestParameters.userId
    def userName = requestParameters.userName
    def userPassword = requestParameters.userPassword
    def adr = requestParameters.adr
    def age = requestParameters.age
    def sex = requestParameters.sex
    def IdCard = requestParameters.IdCard

    def conditonList=[]
    if(userId!=null&&userId!="") {
        conditonList.add(EntityCondition.makeCondition("userId", EntityOperator.LIKE, "%" + userId + "%"))
    }
    if(userName!=null&&userName!="") {
        conditonList.add(EntityCondition.makeCondition("userName", EntityOperator.LIKE, "%" + userName + "%"))
    }
    if(userPassword!=null&&userPassword!="") {
        conditonList.add(EntityCondition.makeCondition("userPassword", EntityOperator.LIKE, "%" + userPassword + "%"))
    }
    if(adr!=null&&adr!="") {
        conditonList.add(EntityCondition.makeCondition("adr", EntityOperator.LIKE, "%" + adr + "%"))
    }
    if(age!=null&&age!="") {
        conditonList.add(EntityCondition.makeCondition("age", EntityOperator.LIKE, "%" + age + "%"))
    }
    if(sex!=null&&sex!="") {
        conditonList.add(EntityCondition.makeCondition("sex", EntityOperator.LIKE, "%" + sex + "%"))
    }
    if(IdCard!=null&&IdCard!="") {
        conditonList.add(EntityCondition.makeCondition("IdCard", EntityOperator.LIKE, "%" + IdCard + "%"))
    }

    def userInfoList=ExtEntityUtil.findList(delegator,"BizUser",EntityCondition.makeCondition(conditonList))
    request.setAttribute("userInfoAry",userInfoList);
    return "success"
}