({
	myAction : function(component, event, helper) {
        component.find("overlayLib").notifyClose();
	},
    callParent: function (component, event, helper) {
        var evt = component.getEvent('fromModal').fire();
        component.find("overlayLib").notifyClose();        
    }    
})