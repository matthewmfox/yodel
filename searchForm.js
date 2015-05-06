function toolbarFunction() {

    $("#logo").button({
        icons: {
            primary: "ui-icon-image"
        },
        text: true
    });
};

function peopleFunction(whoCheckBox,numPeople,numAdditionalPeople) {
    if (!whoCheckBox[0].checked) {
        numPeople.spinner( "enable" );
        numAdditionalPeople.spinner( "enable");
    } else {
        numPeople.spinner( "disable" );
        numAdditionalPeople.spinner( "disable");
    }
};

function calendarFunction(whenCheckBox, toDate, fromDate) {
    if (!whenCheckBox[0].checked) {
        toDate.datepicker( "option", "disabled" , false );
        fromDate.datepicker(  "option", "disabled" , false );
    } else {
        toDate.datepicker(  "option", "disabled" , true );
        fromDate.datepicker( "option", "disabled" , true );
    } 
};

function destinationFunction(whereCheckBox,destination, numMiles) {
    if (!whereCheckBox[0].checked) {
        destination.prop('disabled', false);
        numMiles.spinner("enable");
    } else {
        destination.prop('disabled', true) ;
        numMiles.spinner("disable");
    }
};

function allFieldsAnswered(findPlanDropDown, numPeople, numAdditionalPeople, toDate, fromDate, destination, tip, whoCheckBox, whenCheckBox, whereCheckBox) {
        var people = numPeople.spinner("value");
        var otherPeople = numAdditionalPeople.spinner("value");
        var to = toDate.datepicker("getDate");
        var from = fromDate.datepicker("getDate");
        var loc = destination.val();
        if (findPlanDropDown.value == "Plan") {
            if (people == null || otherPeople) {
                addTip(tip, "Number of People must be greater than 1");
                return false;
            }
            if (from == null || to ==null ) {
                addTip(tip, "Please enter 'To' and 'From' dates");
                return false;
            }
            if (destination.value == null) {
                addTip(tip, "Please enter a Location");
                return false;
            }
        } else {
            if (!whoCheckBox[0].checked && people == null) {
                addTip(tip, "Number of People must be greater than 1");
                return false;
            }
            if (!whenCheckBox[0].checked && (from == null || to ==null)) {
                addTip(tip, "Please enter valid dates");
                return false;
            }
            if (!whereCheckBox[0].checked && loc == "") {
                addTip(tip, "Please enter a Location");
                return false;
            }
        }
        return true;
    };

function setAllFields(whoCheckBox, numPeople, numAdditionalPeople, whenCheckBox, fromDate, toDate, whereCheckBox, destination, numMiles) {
    peopleFunction(whoCheckBox,numPeople,numAdditionalPeople);
    weekfromNow = new Date();
    weekfromNow.setDate(weekfromNow.getDate() +7);
    fromDate.datepicker('setDate', new Date());
    toDate.datepicker('setDate', weekfromNow);
    calendarFunction(whenCheckBox, toDate, fromDate);
    destinationFunction(whereCheckBox,destination, numMiles);
};

function addTip(tip , alert) {
    tip.text(alert).addClass( "ui-state-highlight" );
    setTimeout(function() {
        // after 1500, take 100 to remove the hightlight and change the text
        tip.removeClass( "ui-state-highlight", 100 );
        tip.text("");
        }, 2000 );
}

function openCreateTrip() {
    $("#findPeople").show();
    $("#findPeople").css("display", "inline-block");
    $("#findPeople").css("margin-left", "5px");
    var hideItems = ["#whoCheckBox", "#whenCheckBox","#whereCheckBox", "#whoLabel","#whenLabel","#whereLabel"]
    for (i=0; i<hideItems.length; i++) {
        $(hideItems[i]).hide();
    }
    $("#numPeople").spinner( "enable" );
    $("#numAdditionalPeople").spinner( "enable");
    $("#miles").spinner( "enable" );
    $("#toDate").datepicker( "option", "disabled" , false );
    $("#fromDate").datepicker(  "option", "disabled" , false );
    $( "#destination" ).prop('disabled', false) ;
}


var toSearchResults = function(findPlan, tip, whoCheckBox, numPeople, numAdditionalPeople, whenCheckBox, fromDate, toDate, whereCheckBox, destination, load, dialog) {
    if (allFieldsAnswered(findPlan, numPeople, numAdditionalPeople, toDate, fromDate, destination, tip, whoCheckBox, whenCheckBox, whereCheckBox)) {
        var selectedItem = findPlan;
        // mad hacking with global variables
        findPlan = "";
        if (selectedItem == "Plan") {
            findPlan = "Plan";
            who = [numPeople.spinner("value"), numAdditionalPeople.spinner("value")]
            when = [fromDate.datepicker("getDate"), toDate.datepicker("getDate")];
            where = [destination.val()];
        } else {
            findPlan = "Find";
            who = whoCheckBox[0].checked ? ["Anyone"] : [numPeople.spinner("value")];
            when = whenCheckBox[0].checked ? ["Anytime"] : [fromDate.datepicker("getDate"), toDate.datepicker("getDate")];
            where = whereCheckBox[0].checked ? ["Anywhere"] : [destination.val()];
            dialogGlobal = dialog;

        }
        
        //console.log([findPlan, who,when,where]);
        // TODO: show matt's page
	if(load){
            load_matt();
	}
	else{
	    document.location = "trip.html?Rock%20Climbr&Mount%20Rushmore,%20Keystone,%20SD";
	}

    }
};

function load_matt(){
  $("#mattPage").show();
  $("#buttonsToHide").hide();
  $("#dialog-form2").dialog("close");
}



function getAllTheThings() {
    var whoCheckBox = $("#whoCheckBox2");
    var whenCheckBox = $("#whenCheckBox2");
    var whereCheckBox = $("#whereCheckBox2");
    var numPeople = $( "#numPeople2");
    var numAdditionalPeople = $( "#numAdditionalPeople2"); 
    var miles2 = $( "#miles2");
   

    var fromDate = $( "#fromDate2" ).datepicker({
        defaultDate: "+1w",
        changeMonth: true,
        numberOfMonths: 1,
        minDate: new Date(),
        onClose: function( selectedDate ) {
            $( "#toDate" ).datepicker( "option", "minDate", selectedDate );
            var selected = new Date(selectedDate)
            selected.setDate(selected.getDate()+7); // a week from now
            $( "#toDate" ).datepicker( "option", "defaultDate", selected);
        }
    });
    
    var toDate = $( "#toDate2" ).datepicker({
        defaultDate: "+0w",
        changeMonth: true,
        numberOfMonths: 1,
        minDate: new Date(),
        onClose: function( selectedDate ) {
            $( "#fromDate" ).datepicker( "option", "maxDate", selectedDate );
        }
    });

    var destination = $( "#destination2");
    //var findPlanDropDown = $( "#findPlanDropDown");

    

    return [whoCheckBox2, whenCheckBox2, whereCheckBox2, numPeople2,numAdditionalPeople2, fromDate2, toDate2, destination2, miles2];
};

function loadSearchResults() {
    //findPlan, who, when, where are global

    var thing = getAllTheThings();
    //console.log(dialogGlobal);
    var whoCheckBox=thing[0], whenCheckBox=thing[1], whereCheckBox=thing[2], numPeople=thing[3],numAdditionalPeople=thing[4], fromDate=thing[5], toDate=thing[6], destination=thing[7], numMiles=thing[8];

    // when someone says "edit results"
    //this is really dialog2
    $("#buttonsToHide").show();
    $("#mattPage").hide();
    dialogGlobal.dialog( "open" );

    if (who[0] == "Anyone") {
        //TODOcheck the checkbox 
    } else {
        
        //TODO uncheck the check box
        whoCheckBox.checked = false;
        //set the spinner
        console.log(whoCheckBox);
        console.log(whoCheckBox[0]);
        console.log(numPeople);
        peopleFunction(whoCheckBox,numPeople,numAdditionalPeople);
        numPeople.spinner( "value", who[0] );
    }
    if (when[0] == "Anytime") {
        //TODOcheck the checkbox 
    } else {
        //TODOunckeck the checkbox
        whenCheckBox.checked = false;
        //set the dates
        calendarFunction(whenCheckBox, toDate, fromDate);
        toDate.datepicker('setDate', when[1]);
        fromDate.datepicker('setDate', when[0]);
    }
    if (where[0] == "Anywhere") {
        //TODOcheck the checkbox
    } else {
        // TODO unckeck the check box
        whereCheckBox.checked = false;
        // TODO set the location
        destinationFunction(whereCheckBox,destination, numMiles);
    }
};
