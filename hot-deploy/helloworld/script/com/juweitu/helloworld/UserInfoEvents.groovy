package com.juweitu.helloworld


import org.ofbiz.base.util.UtilHttp
import org.ofbiz.entity.Delegator
import org.ofbiz.service.LocalDispatcher
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


    def results = dispatcher.runSync("bizsaveUserInfo", [
            userName: userName,
            userPassword : userPassword,
            adr : adr,
            age : age,
            sex : sex,
            IdCard:IdCard
        ])

    return org.miniofbiz.ext.util.MessageUtil.handleServiceResults(request,results)
}