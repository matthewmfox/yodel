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

function destinationFunction(whereCheckBox,destination) {
    if (!whereCheckBox[0].checked) {
        destination.prop('disabled', false);
    } else {
        destination.prop('disabled', true) ;
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

function setAllFields(whoCheckBox, numPeople, numAdditionalPeople, whenCheckBox, fromDate, toDate, whereCheckBox, destination) {
    peopleFunction(whoCheckBox,numPeople,numAdditionalPeople);
    weekfromNow = new Date();
    weekfromNow.setDate(weekfromNow.getDate() +7);
    fromDate.datepicker('setDate', new Date());
    toDate.datepicker('setDate', weekfromNow);
    calendarFunction(whenCheckBox, toDate, fromDate);
    destinationFunction(whereCheckBox,destination);
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
    $("#toDate").datepicker( "option", "disabled" , false );
    $("#fromDate").datepicker(  "option", "disabled" , false );
    $( "#destination" ).prop('disabled', false) ;
}


var toSearchResults = function(findPlan, tip, whoCheckBox, numPeople, numAdditionalPeople, whenCheckBox, fromDate, toDate, whereCheckBox, destination) {
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
        }
        
        //console.log([findPlan, who,when,where]);
        // TODO: show matt's page
        load_matt();

    }
};

function load_matt(){
    window.location.href = "searchResults.html"; // good enough
    //$(document.body).html('<object type="text/html" data="searchResults.html" width="100%" height="100%" ></object>'); //lol
}

// function changeFormInputs(selectedItem, whoCheckBox, numPeople, numAdditionalPeople, whenCheckBox, fromDate, toDate, whereCheckBox, destination) {
//     if (selectedItem == "Plan") {
//         $("#findPeople").show("fade", "fast");
//         $("#findPeople").css("display", "inline-block");
//         $("#findPeople").css("margin-left", "5px");
//         var hideItems = ["#whoCheckBox", "#whenCheckBox","#whereCheckBox", "#whoLabel","#whenLabel","#whereLabel"]
//         for (i=0; i<hideItems.length; i++) {
//             $(hideItems[i]).hide();
//         }
//         numPeople.spinner( "enable" );
//         numAdditionalPeople.spinner( "enable");
//         toDate.datepicker( "option", "disabled" , false );
//         fromDate.datepicker(  "option", "disabled" , false );
//         $( "#destination" ).prop('disabled', false) ;
//     } else {
//         $("#findPeople").hide()
//         var showItems = ["#whoCheckBox", "#whenCheckBox","#whereCheckBox", "#whoLabel","#whenLabel","#whereLabel"]
//         for (i=0; i<showItems.length; i++) {
//             $(showItems[i]).show();
//         }
//         setAllFields(whoCheckBox, numPeople, numAdditionalPeople, whenCheckBox, fromDate, toDate, whereCheckBox, destination);
//     }
// };

function getAllTheThings() {
    var whoCheckBox = $("#whoCheckBox");
    var whenCheckBox = $("#whenCheckBox");
    var whereCheckBox = $("#whereCheckBox");
    var numPeople = $( "#numPeople");
    var numAdditionalPeople = $( "#numAdditionalPeople"); 

    var fromDate = $( "#fromDate" ).datepicker({
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
    
    var toDate = $( "#toDate" ).datepicker({
        defaultDate: "+0w",
        changeMonth: true,
        numberOfMonths: 1,
        minDate: new Date(),
        onClose: function( selectedDate ) {
            $( "#fromDate" ).datepicker( "option", "maxDate", selectedDate );
        }
    });

    var destination = $( "#destination");
    //var findPlanDropDown = $( "#findPlanDropDown");

    var form = dialog.find( "form" );
    var form2 = dialog2.find( "form" );

        var dialog = $( "#dialog-form" ).dialog({
          autoOpen: false,
          draggable: false,
          modal: true, // can black out the rest of the page
          width:400,
          minWidth: 400,
          open: function(){
            $('.ui-widget-overlay').bind('click',function(){
                dialog.dialog('close');
            })},
          buttons: {
            "Search": function() {
                toSearchResults("Plan", tip, whoCheckBox, numPeople, numAdditionalPeople, whenCheckBox, fromDate, toDate, whereCheckBox, destination);
            },
            Cancel: function() {
              dialog.dialog( "close" );
            }
          },
          close: function() {
            //clear fields of  the first occurence of form that you find, which is the only form
            form[0].reset(); 
            whoCheckBox.checked = true;
            whenCheckBox.checked = true; 
            whereCheckBox.checked = true;
            setAllFields(whoCheckBox, numPeople, numAdditionalPeople, whenCheckBox, fromDate, toDate, whereCheckBox, destination);
          }
    });

        var dialog2 = $( "#dialog-form2" ).dialog({
          autoOpen: false,
          draggable: false,
          modal: true, // can black out the rest of the page
          width:400,
          minWidth: 400,
          open: function(){
            $('.ui-widget-overlay').bind('click',function(){
                dialog2.dialog('close');
            })},
          buttons: {
            "Search": function() {
                toSearchResults("Find", tip, whoCheckBox2, numPeople2, numAdditionalPeople2, whenCheckBox2, fromDate2, toDate2, whereCheckBox2, destination2);
            },
            Cancel: function() {
              dialog2.dialog( "close" );
            }
          },
          close: function() {
            //clear fields of  the first occurence of form that you find, which is the only form
            form2[0].reset(); 
            whoCheckBox2.checked = true;
            whenCheckBox2.checked = true; 
            whereCheckBox2.checked = true;
            setAllFields(whoCheckBox2, numPeople2, numAdditionalPeople2, whenCheckBox2, fromDate2, toDate2, whereCheckBox2, destination2);
          }
        });

    return [whoCheckBox, whenCheckBox, whereCheckBox, numPeople,numAdditionalPeople, fromDate, toDate, destination, dialog, findPlanDropDown];
};

function loadSearchResults() {
    //findPlan, who, when, where are global
    var things = getAllTheThings();
    var whoCheckBox=things[0], whenCheckBox=thing[1], whereCheckBox=thing[2], numPeople,numAdditionalPeople=thing[3], fromDate=thing[4], toDate=thing[5], destination=thing[6], dialog=thing[7], findPlanDropDown=thing[8];

    // when someone says "edit results"
    dialog.dialog( "open" );

    //pick which one was selected
    findPlanDropDown.filter(function() {
        return $(this).text() == findPlan; 
    }).prop('selected', true);

    if (findPlan == "Plan") {
        toDate.datepicker('setDate', when[1]);
        fromDate.datepicker('setDate', when[0]);
        numPeople.spinner( "value", who[0] );
        numAdditionalPeople.spinner( "value", who[0]);
        //TODO: set the location back to what it was: where[0]
    } else {
        if (who[0] == "Anyone") {
            //TODOcheck the checkbox 
        } else {
            
            //TODO uncheck the check box
            //set the spinner
            peopleFunction(whoCheckBox,numPeople,numAdditionalPeople);
            numPeople.spinner( "value", who[0] );
        }
        if (when[0] == "Anytime") {
            //TODOcheck the checkbox 
        } else {
            //TODOunckeck the checkbox
            //set the dates
            calendarFunction(whenCheckBox, toDate, fromDate);
            toDate.datepicker('setDate', when[1]);
            fromDate.datepicker('setDate', when[0]);
        }
        if (where[0] == "Anywhere") {
            //TODOcheck the checkbox
        } else {
            // TODO unckeck the check box
            // TODO set the location
            destinationFunction(whereCheckBox,destination);
        }
    }
};