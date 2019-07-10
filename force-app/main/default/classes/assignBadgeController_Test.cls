@isTest
public class assignBadgeController_Test {
    @testSetup static void testSetupData() {
        List<contact> lstCtc = new List<Contact>();
        Contact ctc = new Contact();
        ctc.lastName = 'Thiago';
        lstCtc.add(ctc);
        
        ctc = new Contact();
        ctc.lastName = 'Fabio';
        lstCtc.add(ctc);
        insert lstCtc;
        
        List<Badge__c> lstBdg = new List<Badge__c>();        
        Badge__c bdg = new Badge__c();
        bdg.badgeNumber__c = 1111;
        lstBdg.add(bdg);
        
        bdg = new Badge__c();
        bdg.badgeNumber__c = 2222;
        lstBdg.add(bdg);
        insert lstBdg;
        
    }
    static testmethod void assignBadgeVerify(){
        List<Contact> lstCtc = [SELECT id FROM contact LIMIT 2];
        List<Badge__c> lstBdg = [SELECT id,badgeNumber__c FROM badge__c LIMIT 2];
        Map<String,String> mapCodeMessage = new Map<String,String>();        
		String result;        
        Test.startTest();
        	result = AssignBadgeController.assignBadgeVerify(lstCtc[0].id,String.valueOf(lstBdg[0].badgeNumber__c));
        	mapCodeMessage = (Map<String,String>)JSON.deserialize(result, Map<String,String>.class);
        	system.assertEquals(mapCodeMessage.keySet(), new Set<String>{'200'});
			
        	result = AssignBadgeController.assignBadgeVerify(lstCtc[0].id,String.valueOf(lstBdg[0].badgeNumber__c));
        	mapCodeMessage = (Map<String,String>)JSON.deserialize(result, Map<String,String>.class);
        	system.assertEquals(mapCodeMessage.keySet(), new Set<String>{'300'});
        
        	result = AssignBadgeController.assignBadgeVerify(lstCtc[0].id,'99999');
        	mapCodeMessage = (Map<String,String>)JSON.deserialize(result, Map<String,String>.class);
        	system.assertEquals(mapCodeMessage.keySet(), new Set<String>{'404'});  
        
            try{
                result = AssignBadgeController.assignBadgeVerify(lstCtc[0].id,String.valueOf(lstBdg[0].id));
            }catch(Exception e){                
                Boolean expectedExceptionThrown =  e.getMessage().contains('Script-thrown exception') ? true : false;            
                System.AssertEquals(expectedExceptionThrown, true);                
            }
        Test.stopTest();
    }
}