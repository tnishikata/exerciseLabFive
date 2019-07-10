({
    assignBadge: function(cmp, event, helper) {
        var action = cmp.get("c.assignBadgeVerify");
        action.setParams({
            'contactId': cmp.get("v.recordId"),
            'badgeNumber': cmp.get("v.badgeNumber")
        });
        
        action.setCallback(this, function(response) {
            if (response.getState() === "SUCCESS") {
                var responseData = JSON.parse(response.getReturnValue());                            
                var responseCode = Object.keys(responseData)[0];
                var responseMessage = responseData[responseCode];
                var inputField = cmp.find("badge");

                if(responseCode == 404){
            		cmp.set("v.assignDisabled",true);                                        
                    inputField.setCustomValidity(responseMessage);
                    inputField.reportValidity(); 
            		helper.badgeChangeUrl(cmp,false);                                        
                }
                if(responseCode == 300){
            		cmp.set("v.assignDisabled",true);                                                            
                    helper.showModal(cmp, responseMessage);                      
                }
                if(responseCode == 200){
                	helper.showNoticeInfo(cmp,'success',responseMessage);
                    $A.get("e.force:closeQuickAction").fire();                                        
                }                
            }else if (response.getState()=="ERROR"){
                helper.showNoticeInfo(cmp,'error',action.getError()[0].message);                
            }     
        });
        $A.enqueueAction(action);
    },
    confirmAssignBadge: function(cmp, event, helper) {
        var action = cmp.get("c.assignBadgeToContact");
        action.setParams({
            'contactId': cmp.get("v.recordId"),
            'badgeNumber': cmp.get("v.badgeNumber")
        });
        
        action.setCallback(this, function(response) {
            if (response.getState() === "SUCCESS") {
                var responseData = JSON.parse(response.getReturnValue());                            
                var responseCode = Object.keys(responseData)[0];
                var responseMessage = responseData[responseCode];                
                helper.showNoticeInfo(cmp,'success',responseMessage);
                $A.get("e.force:closeQuickAction").fire();
            }
        });
        $A.enqueueAction(action);
    },    
    showNoticeInfo : function(cmp,variant, message) {
        cmp.find('notifLib').showToast({
            "variant": variant,
            "header": variant,
            "message": message,
        });
    },
    showModal: function(cmp,message) {
        $A.createComponent("c:notification",
                           {
                               "message" : message,
                               "fromModal": cmp.getReference("c.fromModal")
                           },
                           function(content, status) {
                               if (status === "SUCCESS") {
                                   cmp.find('overlayLib').showCustomModal({
                                       body: content
                                   })
                               }
                           });
    },
    badgeChangeUrl: function(cmp, isGood){
        var red = cmp.get("v.badgeUrlRed");
        var green = cmp.get("v.badgeUrlGreen");
        if(isGood)cmp.set("v.badgeUrl",green);                                       
        else cmp.set("v.badgeUrl",red);        
    }
});