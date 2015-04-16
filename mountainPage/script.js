$(function () {
	var postReviewBtn = $("#postReviewBtn");
	var reviewTable = document.getElementById("reviewTable");
	var standInPhoto = '<img class="userPhoto" src="https://d29bmv6chs6e5y.cloudfront.net/assets/blank_profile-8b180b8cb50c648f1fe92cc0797a5dcf.jpg">'
	var reviewText;

	$(postReviewBtn).click( function() {
		// Get the review from the textbox.
		reviewText = $("#reviewInput").val();
		console.log(reviewText)
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
})