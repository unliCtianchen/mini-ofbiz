package com.juweitu.helloworld


import org.miniofbiz.ext.util.ExtUtilDateTime
import org.ofbiz.entity.Delegator
import org.ofbiz.entity.GenericValue
import org.ofbiz.service.LocalDispatcher
import org.ofbiz.service.ServiceUtil
/**
 * Created by Administrator on 2017/3/7.
 */

public Map createUser() {
    LocalDispatcher dispatcher = dispatcher
    Delegator delegator = delegator
    Map parameters = parameters

    def createDate = ExtUtilDateTime.nowTimestamp();
    GenericValue user=delegator.makeValidValue("BizUser",parameters)
    user.setNextSeqId()
    user.create()
    def userId = user.userId
    def results= ServiceUtil.returnSuccess()
    results.userId=userId


    return results
}


public Map updateUserT() {
    LocalDispatcher dispatcher = dispatcher
    Delegator delegator = delegator
    Map parameters = parameters

    def userId = parameters.userId
    GenericValue user=delegator.findOne("BizUser",[userId:userId],false)
    user.setNonPKFields(parameters)
    user.store()
    def results= ServiceUtil.returnSuccess()
    results.userId=userId
    return results
}


public Map deleteUserInfo(){
    LocalDispatcher dispatcher = dispatcher
    Delegator delegator = delegator
    Map parameters = parameters

    def userId = parameters.userId
    GenericValue  user = delegator.findOne("BizUser",[userId:userId],false)
    user.setNonPKFields(parameters)
    user.remove()

    def results = ServiceUtil.returnSuccess()
    return results
}