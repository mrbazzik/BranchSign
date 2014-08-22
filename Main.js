$(document).ready(function(){
  $("#actList").buttonset();
  $("#dd").accordion({ collapsible: true , heightStyle: "content" });
  $("#email").selectmenu();
  $("#SignButton").button();
  $("#solution").buttonset();
  $("#SignButton").click(SignBranch);
  $("#main").position("center","center",document);
  var get = decodeURI(location.search);
  get = get.replace(/%3A/g,":");
  get = get.replace(/%2C/g,",");
  get = get.replace(/%40/g,"@");
  get = get.replace(/\+/g," ");


  var param = new Array();

  tmp = (get.substr(1)).split('&');
  for(var i=0; i < tmp.length; i++)
  {
   tmp2 = tmp[i].split('=');
   param[tmp2[0]] = tmp2[1];
  }


  param["emails"] = JSON.parse(param["emails"]);

  BranchInfo();

  function BranchInfo()
  {
    
   BranchSign.CheckBranch(param["uid"], param["branch"]);

   var elem = $("#email");
   var emails = param["emails"].Emails;

   for(var i = 0; i<=emails.length-1; i++)
   {
    var emaili = emails[i];
    elem.append("<option value="+emaili+">"+emaili+"</option>");

   }

  if(emails.length == 1) elem.val(emails[0]);

  }

  function SignBranch()
  {


   var valu = $("#solution .ui-state-active");

  var loptions = [];

  $("#actList .ui-state-active span").each(function(indx, element){
    loptions.push(element.innerHTML);
  });


  var obj = {"actions": loptions};
   if (!valu) alert("Укажите решение!");
   else BranchSign.MakeSign(param["uid"], email.value, valu.text().replace("_", " "), comment.value, JSON.stringify(obj));
  }
})
