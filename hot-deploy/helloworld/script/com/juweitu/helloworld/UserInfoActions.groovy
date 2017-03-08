package com.juweitu.helloworld

import org.miniofbiz.ext.util.ExtEntityUtil
import org.ofbiz.base.util.UtilHttp
import org.ofbiz.entity.Delegator
import org.ofbiz.entity.condition.EntityOperator
import org.ofbiz.service.LocalDispatcher
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse
import org.ofbiz.entity.condition.EntityCondition

public listUserInfo(Map context) {
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
    context.userInfoList=userInfoList
}

