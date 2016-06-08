var array = [{title:'монитор', prise: 5000, quantity: 20},
	{title:'мышь', prise: 500, quantity: 10},
	{title:'системный блок', prise: 6000, quantity: 5},
	{title:'принтер', prise: 5500, quantity: 10},
	{title:'клавиатура', prise: 100, quantity: 30}];

var selectArray = [];

//var allEquipments = document.getElementById('all-equipments-id');


function allEquipmentsShow(id, k) {

//выделить в отдельную функцию создание самой таблицы

 	var tbody = document.getElementById(id).getElementsByTagName("tbody")[0];
    var row = document.createElement("tr");

    var td1 = document.createElement("td");
    td1.appendChild(document.createTextNode(array[k].title));
    var td2 = document.createElement("td");
    td2.appendChild (document.createTextNode(array[k].prise));
    var td3 = document.createElement("td");
    td3.appendChild(document.createTextNode(array[k].quantity));
    var td4 = document.createElement("td");
    var button = createButtonAdd(td4, k);
 
    row.appendChild(td1);
    row.appendChild(td2);
    row.appendChild(td3);
    row.appendChild(td4);

    tbody.appendChild(row);
}

function createButtonAdd(context, l){
    var button = document.createElement("input");
    button.type = "button";
    button.value = "+";
    button.className = "add add-"+l;
    button.id = "idadd-"+ l;

    context.appendChild(button);
    button.setAttribute('onclick', 'javascript:EquipmentsAdd("all-equipments-id", "sel-equipments-id", ' + l + ')');

}

// по кнопкам так же бъединить в одну функцию

function createButtonRem(context, l){
    var button = document.createElement("input");
    button.type = "button";
    button.value = "-";
    button.className = "remowe remowe-"+l;
    button.id = "idrem-"+ l;

    context.appendChild(button);
    button.setAttribute('onclick', 'javascript:EquipmentsRem("all-equipments-id", "sel-equipments-id", ' + l + ')');

}


function in_array(value, mas) 
{
    for(var i = 0; i < mas.length; i++) 
    {
        if(mas[i].title == value) return true;
    }
    return false;
}

function EquipmentsAdd(from ,id, k) {
	if (array[k].quantity<=0) {

		alert("Выбранного оборудования нет на скаде");
	}
	else{

	array[k].quantity = array[k].quantity - 1;
	var count = 1;
	



if (selectArray.length == 0) {

	selectArray.push({title:array[k].title , prise: array[k].prise, quantity: count});

} else {

if (in_array(array[k].title, selectArray)) {

	for (var i = selectArray.length - 1; i >= 0; i--) {
			if (selectArray[i].title==array[k].title) {
				selectArray[i].quantity = selectArray[i].quantity + 1;
				count = selectArray[i].quantity;
			}
		}
} else {

selectArray.push({title:array[k].title , prise: array[k].prise, quantity: count});	
}
}

alert(selectArray.length );//1

/*
// ПОЧЕМУ НЕ УДАЛЯЮТСЯ ВСЕ ЭТИ ЧЕРТОВЫ СТРОКИ. 
if (selectArray.length > 0) {

    for (var i = array.length; i > 1; i--) { //1
	document.getElementById(id).getElementsByTagName("tbody")[0].deleteRow(i);
	}


}*/


 	var tbody = document.getElementById(id).getElementsByTagName("tbody")[0];
    var row = document.createElement("tr");


    var td1 = document.createElement("td");
    td1.appendChild(document.createTextNode(array[k].title));
    var td3 = document.createElement("td");
    td3.appendChild(document.createTextNode(count));
    var td4 = document.createElement("td");
    var button = createButtonRem(td4, k);

    row.appendChild(td1);
    row.appendChild(td3);
    row.appendChild(td4);

    tbody.appendChild(row);

    for (var i = array.length-1; i >= 0; i--) {
	document.getElementById(from).getElementsByTagName("tbody")[0].deleteRow(i+1);
	


	for (var i = array.length - 1; i >= 0; i--) {
	allEquipmentsShow(from, i);
	}

	}

}

function EquipmentsRem(from ,id, k) {

	array[k].quantity = array[k].quantity + 1;

	//document.getElementById(id).deleteRow(rowind);



    for (var i = array.length-1; i >= 0; i--) {
	document.getElementById(from).getElementsByTagName("tbody")[0].deleteRow(i+1);
	}

	for (var i = array.length - 1; i >= 0; i--) {
	allEquipmentsShow(from, i);
	}

	

}


function calculation() {
	var sum = 0;
	for (var i = selectArray.length - 1; i >= 0; i--) {
		sum = sum + (selectArray[i].prise * selectArray[i].quantity);
	}
	//alert(sum);
	document.getElementById('result').innerHTML = "Ваша итоговая сумма: <span>"+sum+"</span>руб.";

}


window.onload = function(){

for (var i = array.length - 1; i >= 0; i--) {
	allEquipmentsShow('all-equipments-id', i);
}

}








