({
    assignBadge : function(cmp, event, helper) {
        helper.assignBadge(cmp,event,helper);
    },
    confirmAssignBadge : function(cmp, event, helper) {
        helper.confirmAssignBadge(cmp,event,helper);
    },    
    verifyBadgeField: function(cmp, event, helper) {
        var inputField = cmp.find("badge");
        var inputField = cmp.find("badge");
        var badgeLength = inputField.get("v.value").length;
        var badgeData = inputField.get("v.value");
        if(badgeLength < 8){
            cmp.set("v.assignDisabled",true);
            helper.badgeChangeUrl(cmp,false);
            var missingCar = 8 - badgeLength ;
            inputField.setCustomValidity(missingCar+" characters left");
        }else{
            cmp.set("v.assignDisabled",false);
            helper.badgeChangeUrl(cmp,true);            
            inputField.setCustomValidity("");
            inputField.set("v.value", badgeData.substring(0, 8));            
        }
        inputField.reportValidity();               
    },
    fromModal: function (cmp, event, helper) {
		helper.confirmAssignBadge(cmp,event,helper);
    } 
})