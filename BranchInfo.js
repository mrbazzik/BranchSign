var BranchSign = BranchSign || {};﻿

(function(){
var CO = {
	ConString = 'http://localhost/TestSign/ws/BranchSign.1cws';
	Login = "SignUser";
	Password = "789";
}

BranchSign.CheckBranch = function (UID, Branch) {

	XMLHTTP = new XMLHttpRequest();



	XMLHTTP.open('POST', CO.ConString, true, CO.Login, CO.Password);
	XMLHTTP.onreadystatechange = function() {WhenAnsweringCheckBranch(XMLHTTP, Branch)};

	XMLHTTP.setRequestHeader('Content-Type', 'text/xml');

	xml = '<?xml version="1.0" encoding="utf-8"?>' +
		'<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ' +
                'xmlns:xsd="http://www.w3.org/2001/XMLSchema" ' +
                'xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' +
		'<soap:Body> ' +
		'<Check xmlns="BranchSign"> ' +
		'<UID>' + UID + '</UID> ' +
		'</Check> ' +
		'</soap:Body> ' +
		'</soap:Envelope>';


	XMLHTTP.send(xml);



}
function WhenAnsweringCheckBranch(XMLHTTP, Branch)

{
      if (XMLHTTP.readyState == 4) {

        if (XMLHTTP.status == 200) {

		DOM = XMLHTTP.responseXML.getElementsByTagName("return")[0];
		pref = "";

		if (DOM == null)
			{
			DOM = XMLHTTP.responseXML.getElementsByTagName("m:return")[0];
			pref="m:";
			}

		Sign = DOM.getElementsByTagName(pref+"Sign")[0].childNodes[0].data;

		if (Sign == 0)
		{
			Result = "Партия "+Branch+" еще не подписана";
			BranchData = DOM.getElementsByTagName(pref+"BranchData")[0].childNodes[0].data;
			Conditions = DOM.getElementsByTagName(pref+"Conditions")[0].childNodes[0].data;
			$("#SignButton").button("enable");
		}
		else if (Sign == 1)
		{
			User = DOM.getElementsByTagName(pref+"User")[0].childNodes[0].data;
			uDate = DOM.getElementsByTagName(pref+"Date")[0].childNodes[0].data;
			Solution = DOM.getElementsByTagName(pref+"Solution")[0].childNodes[0].data;
			Comment = DOM.getElementsByTagName(pref+"Comment")[0].childNodes[0].data;
			BranchData = DOM.getElementsByTagName(pref+"BranchData")[0].childNodes[0].data;
			Conditions = DOM.getElementsByTagName(pref+"Conditions")[0].childNodes[0].data;
			Result = "Партия "+Branch+" подписана пользователем "+User+" "+ uDate;

			if(Comment!=="NULL") $("#comment").html(Comment);

			var $sol = $('#'+Solution.replace(" ","_"));
			$sol.attr("checked", "checked");
			$sol.button("refresh");

			$("#SignButton").button("disable");

		}
		else
		{
			Result = "Нет информации по партии "+Branch;
			BranchData = "";
			Conditions = "";
			$("#SignButton").button("disable");
		}

		$("#response1C").html(Result);

		if(BranchData!="NULL")
		{
			var obj = JSON.parse(BranchData);

			$("#BranchDataTable").html("<caption><h4>Данные партии</h4></caption><tr><th>Параметр</th><th>Значение</th><th>Уровень</th><th>Дата снятия</th><th>План ОП</th></tr>");
			for(var i=0; i<obj.length; i++)
				$("#BranchDataTable").html($("#BranchDataTable").html()+"<tr><td>"+obj[i].Param+"</td><td>"+((obj[i].Val===null)?"":obj[i].Val)+"</td><td>"+obj[i].Level+"</td><td>"+obj[i].Date.replace("T","<br/>")+"</td><td>"+obj[i].Plan+"</td></tr>");
		}


		if(Conditions!="NULL")
		{
			var cond = JSON.parse(Conditions);



			var elem = $("#actList");
			var addchecked="";
			for(var i = 0; i<cond.length; i++)
 				{
				if(cond[i].Use) addchecked="checked='checked'";
				else addchecked = "";

				elem.append("<input type='checkbox' id='check"+i+"' "+addchecked+"><label for='check"+i+"'>"+cond[i].Condition+"</label>");

 				}
			$("#actList").buttonset("refresh");

		}

	}
	}

}

BranchSign.MakeSign = function (UID, Email, Solution, Comment, Actions) {


	XMLHTTP = new XMLHttpRequest();

	CO = ConnectionObject();

	XMLHTTP.open('POST', CO.ConString, true, CO.Login, CO.Password);
	XMLHTTP.onreadystatechange = function() {WhenAnsweringMakeSign(XMLHTTP)};

	XMLHTTP.setRequestHeader('Content-Type', 'text/xml');

	xml = '<?xml version="1.0" encoding="utf-8"?>' +
		'<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ' +
                'xmlns:xsd="http://www.w3.org/2001/XMLSchema" ' +
                'xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' +
		'<soap:Body> ' +
		'<Sign xmlns="BranchSign"> ' +
		'<UID>' + UID + '</UID> ' +
		'<Email>' + Email + '</Email> ' +
		'<Solution>' + Solution + '</Solution> ' +
		'<Comment>' + Comment + '</Comment> ' +
		'<Actions>' + Actions + '</Actions> ' +
		'</Sign> ' +
		'</soap:Body> ' +
		'</soap:Envelope>';


	XMLHTTP.send(xml);



}

function WhenAnsweringMakeSign(XMLHTTP)
{

      if (XMLHTTP.readyState == 4) {

        if (XMLHTTP.status == 200) {

		DOM = XMLHTTP.responseXML.getElementsByTagName("return")[0];
		pref = "";
		if (DOM == null)
			{
			DOM = XMLHTTP.responseXML.getElementsByTagName("m:return")[0];
			pref="m:";
			}

		Result = DOM.getElementsByTagName(pref+"Result")[0].childNodes[0].data;

		Comment = DOM.getElementsByTagName(pref+"Comment")[0].childNodes[0].data;

		$("#response1C").html(Comment);
		if (Result) $("#SignButton").button("disable");
	}
	}

}
})()
