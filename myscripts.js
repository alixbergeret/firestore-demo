// Import required Firebase services
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js'
import { Firestore, 
		 getFirestore, 
		 onSnapshot, 
		 query, 
		 collection, 
		 orderBy } from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js'

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
const q = query(collection(db, "Reviews"), orderBy("book_name"));
const unsubscribe = onSnapshot(q, (snapshot) => {

  // Empty HTML table
  $('#reviewList').empty();
	
  // Loop through snapshot data and add to HTML table
  var tableRows = '';
  snapshot.forEach((doc) => {
	tableRows += '<tr>';
	tableRows += '<td>'  + doc.data().book_name + '</td>';
	tableRows += '<td>'  + doc.data().book_rating + '/5</td>';
	tableRows += '</tr>';	  
  });
  $('#reviewList').append(tableRows);
	
  // Display review count
  $('#mainTitle').html(snapshot.size + " book reviews in the list");
});
