public class ExceptionHandler{
    public static void logApexError(Exception e){
        ErrorLog__c log = new ErrorLog__c();
        log.lineNumber__c = e.getLineNumber();
        log.message__c = e.getMessage();
        log.stackTraceString__c = e.getStackTraceString();
        log.typeName__c = e.getTypeName();
        Insert log;		
    }	
}