// Import required Firebase services
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js'
import { Firestore, 
		 getFirestore, 
		 onSnapshot, 
		 query, 
		 collection, 
		 orderBy,
		 addDoc,
		 doc, 
		 deleteDoc } from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA0VPouX3O5_KJ7VDlwZjh1y_4iFYQ0njc",
  authDomain: "cs022-demo-2022.firebaseapp.com",
  projectId: "cs022-demo-2022",
  storageBucket: "cs022-demo-2022.appspot.com",
  messagingSenderId: "344011870316",
  appId: "1:344011870316:web:0d9bf0a31966ec09350849"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);	
const db = getFirestore(app);
		
// Get a live data snapshot (i.e. auto-refresh) of our Reviews collection
const q = query(collection(db, "Reviews"), orderBy("book_rating", "desc"));
const unsubscribe = onSnapshot(q, (snapshot) => {

  // Empty HTML table
  $('#reviewList').empty();
	
  // Loop through snapshot data and add to HTML table
  var tableRows = '';
  snapshot.forEach((doc) => {
	tableRows += '<tr>';
	tableRows += '<td>'  + doc.data().book_name + '</td>';
	tableRows += '<td>'  + doc.data().book_rating + '/5</td>';
	if (typeof doc.data().review_date !== 'undefined') {
		tableRows += '<td>'  + doc.data().review_date + '</td>';
	} else {
		tableRows += '<td></td>';
	}
	tableRows += '<td><button type="button" data-doc-id="' + doc.id + '" class="btn btn-sm btn-outline-primary deleteButton">Delete</button></td>';
	tableRows += '</tr>';	  
  });
  $('#reviewList').append(tableRows);
	
  // Display review count
  $('#mainTitle').html(snapshot.size + " book reviews in the list");
});

// Delete button pressed
$('#reviewList').on("click", ".deleteButton", function(){
	deleteDoc(doc(db, "Reviews", $(this).data('doc-id')));
});

// Add button pressed
$("#addButton").click(function() {
		
	// Add review to Firestore collection
	const docRef = addDoc(collection(db, "Reviews"), {
	  book_name: $("#bookName").val(),
	  book_rating: parseInt($("#bookRating").val()),
	  review_date: $("#reviewDate").val()
	});
		
	// Reset form
	$("#bookName").val('');
	$("#bookRating").val('1');
});
