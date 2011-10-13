function trim(str) {
        str = str.replace(/^\s*/, '').replace(/\s*$/, '');
        return str; 
     }

function checkemail(str){
// var str=document.validation.emailcheck.value
//alert("inside checkemai " + str);
 var filter=/^.+@.+\..{2,3}$/

 if (filter.test(str))
    return true;
 else {
    //alert("Please input a valid email address!")
    return false;
 }
}

var bugchars = '!#$^&*()+|}{[]?><~%:;/,=`"\'';
function CharsInBag(s)
{   var i;
var lchar="";
    // Search through string's characters one by one.
    // If character is not in bag.
    for (i = 0; i < s.length; i++)
    {   
        // Check that current character isn't whitespace.
        var c = s.charAt(i);
        if(i>0)lchar=s.charAt(i-1)
        if (bugchars.indexOf(c) != -1 || (lchar=="." && c==".")) return false;
    }
    return true;
}

function isInteger(s)
{   var i;
    for (i = 0; i < s.length; i++)
    {   
        // Check that current character is not a number.
        var c = s.charAt(i);
        if ((c >= "0") && (c <= "9") && (c != ".")) return false;
    }
    // All characters are numbers.
    return true;
}
 
function isValidEmailAddress(str) {
        var at="@"
        var dot="."
        var lat=str.indexOf(at)
        var lstr=str.length
        var ldot=str.indexOf(dot)
        var lastdot=str.lastIndexOf(dot)
        if (str.indexOf(at)==-1){         
           return false
        }
        if (str.indexOf(at)==-1 || str.indexOf(at)==0 || str.indexOf(at)==lstr){
           return false
        }
        if (str.indexOf(dot)==-1 || str.indexOf(dot)==0 || str.indexOf(dot)==lstr || str.substring(lastdot+1)==""){
            return false
        }
         
         if (str.indexOf(at,(lat+1))!=-1){
            return false
         }

         if (str.substring(lat-1,lat)==dot || str.substring(lat+1,lat+2)==dot){
            return false
         }

         if (str.indexOf(dot,(lat+2))==-1){
            return false
         }
        
         if (str.indexOf(" ")!=-1){
            return false
         }
        if(CharsInBag(str)==false){
            return false
         }
         var arrEmail=str.split("@")
         var ldot=arrEmail[1].indexOf(".")
         if(isInteger(arrEmail[1].substring(ldot+1))==false){
            return false
         }
         return true                    
    }


function validateApplication(formId){

    var form = document.forms[formId];
    
        if(trim(form.firstName.value) == "") {
            alert("Please enter your first name");
            form.firstName.focus();
            return false;
        }
        
        if(trim(form.lastName.value) == "") {
            alert("Please enter your last name");
            form.lastName.focus();
            return false;
        }   
                
        var checkDigits = /^\d*$/;
        
                    
            
        
        if((trim(form.eveArea.value) == "") && (trim(form.evePrefix.value) == "") && (trim(form.eveNum.value) == "")){
            alert("Please enter your phone number");
            form.eveArea.focus();
            return false;
        }
        
        if( !checkDigits.test(trim(form.eveArea.value))){
            alert("Please enter valid phone number");
            form.eveArea.focus();
            return false;
        }
        else if(!checkDigits.test(trim(form.evePrefix.value))){     
            alert("Please enter valid phone number");
            form.evePrefix.focus();
            return false;
        }
        else if(!checkDigits.test(trim(form.eveNum.value))){        
            alert("Please enter valid phone number");
            form.eveNum.focus();
            return false;
        }       
                    
        /*if(trim(form.eveArea.value).length < 3){
            alert("Please enter valid phone number");
            form.eveArea.focus();
            return false;
        }
        else if(trim(form.evePrefix.value).length < 3){
            alert("Please enter valid phone number");
            form.evePrefix.focus();
            return false;
        }
        else if(trim(form.eveNum.value).length < 4){
            alert("Please enter valid phone number");
            form.eveNum.focus(); 
            return false;
        }*/
        
        if(trim(form.emailAddress.value) == "") 
        {
            alert("Please enter your email address");
            form.emailAddress.focus();
            return false;
        }  
        
        if (trim(form.emailAddress.value) != '')
        {
            var emailFlag = isValidEmailAddress(trim(form.emailAddress.value));
                if(!emailFlag){
                    alert("Please enter valid email address")
                    form.emailAddress.focus();
                    return false;
                }
        }
        
        
        if(form.company != null)
        {
            if(trim(form.company.value) == "") 
            {
                alert("Please enter the name of your company");
                form.restAddress.focus();
                return false;
            }  
        }   
        
        if(form.restaurantAddress != null)
        {
            if(trim(form.restaurantAddress.value) == "") 
            {
                alert("Please enter restaurant address");
                form.restAddress.focus();
                return false;
            }  
        }       

        
        if(form.incidentDate != null)
        {
            if(trim(form.incidentDate.value) == "") 
            {
                alert("Please select incident date and time");
                form.incidentDate.focus();
                return false;
            }
        }   
        
        if(form.time != null)
        {
            if(trim(form.time.value) == "") 
            {
                alert("Please select time of incident");
                form.time.focus();
                return false;
            }  
        }
        
        if(form.dayPart != null)
        {
            if(form.dayPart.selectedIndex == 0) {
                alert("Please select day part for the time of incident");
                form.dayPart.focus();
                return false;
            }
        }
        var feedbackType = null;
        if(form.feedbackType != null)
        {
            for (i=0; i < form.feedbackType.length; i++)
            {
                if (form.feedbackType[i].checked)
                 {
                    feedbackType = form.feedbackType[i].value;
                }
            }
    
            if(feedbackType == null){
                alert(selectVisitType);
                form.visitType[0].focus();
                return false;
            }
        }

        if(form.comments != null)
        {
            if((form.comments.value.length) > 2000){
                alert("Please enter comments with in the max limit of 2000 char");
                form.comments.focus();
                return false;
            }
        }   
        
        
return true;
        
    }