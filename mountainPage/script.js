$(function () {

    var toolbarFunction = function() {
    $("#profile").button({
	    icons: {
	      primary: "ui-icon-person"
	    },
	    text: false
    });

    $("#logo").button({
      icons: {
        primary: "ui-icon-image"
      },
      text: true
    });
    $("#messages").button({
      icons: {
      	primary: "ui-icon-mail-closed"
      },
      text: false
    });

    $("#settings").button({
      icons: {
        primary: "ui-icon-gear"
      },
      text: false
    });
   
    $("#notifications").button({
      icons: {
        primary: "ui-icon-info"
      },
      text: false
    });
  };
            
    toolbarFunction();

    var home = $("#logo").button();
   
    home.click(function() {
       document.location = '../searchResults.html';	    
    });

    $("#search").geocomplete();



	var postReviewBtn = $("#postReviewBtn");
	var reviewTable = document.getElementById("reviewTable");
	var standInPhoto = '<img class="userPhoto" src="https://d29bmv6chs6e5y.cloudfront.net/assets/blank_profile-8b180b8cb50c648f1fe92cc0797a5dcf.jpg">'
	var reviewText;
	

	$(postReviewBtn).click( function() {
		// Get the review from the textbox.
		reviewText = $("#reviewInput").val();
		if (reviewText.length) {
			// Clear the textbox if there is text in it.
			$("#reviewInput").val("");

			// Make a new row in which to put the users image and comment.
			reviewText = "<pre>" + reviewText + "</pre>";
			var row = reviewTable.insertRow(0);
			var userPhoto = row.insertCell(0);
			userPhoto.setAttribute("class", "contentContainer");
			userPhoto.innerHTML = standInPhoto;

			var userReview = row.insertCell(1);
			userReview.setAttribute("class", "contentContainer");
			userReview.innerHTML = reviewText;
		}
	})

	var postCommentBtn = $("#postCommentBtn");
	var createTripBtn = $("#createTripBtn")
	var me = $("#me");
	var commentTable = document.getElementById("commentTable");
	var commentText;
	var createTripBtn;

	if(createTripBtn !== undefined){
	    $(createTripBtn).click( function() {
		document.location = '../searchForm.html';
	    });
	};

	$(postCommentBtn).click( function() {
		// Get the review from the textbox.
		commentText = $("#commentInput").val();
		console.log(commentText)
		if (commentText.length) {
			// Clear the textbox if there is text in it.
			$("#commentInput").val("");

			// Make a new row in which to put the users image and comment.
			commentText = "<pre>" + commentText + "</pre>";
			var row = commentTable.insertRow(0);
			var userPhoto = row.insertCell(0);
			userPhoto.setAttribute("class", "contentContainer");
			userPhoto.innerHTML = standInPhoto;

			var userComment = row.insertCell(1);
			userComment.setAttribute("class", "contentContainer");
			userComment.innerHTML = commentText;
		}
	})

/*
	The following code is meant for the trip.html page.
*/
	var btnJoinTrip = $( "#btnJoinTrip" ).button();
    var btnLeaveTrip = $( "#btnLeaveTrip" ).button();
    var btnMtnName = $( "#btnMtnName" );
    var mtnNameText = $( "mtnNameText");

	btnJoinTrip.click( function() {
		// Get the review from the textbox.
		console.log("CLICK");
		btnJoinTrip.css({'z-index': '4'});
		btnLeaveTrip.css({'z-index': '5'});
		me.css({'z-index': '200'});
	});

	btnLeaveTrip.click( function() {
		// Get the review from the textbox.
		btnLeaveTrip.css({'z-index': '4'});
		btnJoinTrip.css({'z-index': '5'});	
		me.css({'z-index': '0'});
	});

	btnMtnName.click( function() {
		var mtnName = btnMtnName.text();
		document.location = "mountainPage/index.html?" + mtnName;
		
	})
});
