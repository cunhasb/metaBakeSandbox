  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDqsYsb5JynBRE3DWDXgLy5gPEsk8xsqkw",
    authDomain: "crm-ligth.firebaseapp.com",
    databaseURL: "https://crm-ligth.firebaseio.com",
    projectId: "crm-ligth",
    storageBucket: "crm-ligth.appspot.com",
    messagingSenderId: "429432494555"
  };
  firebase.initializeApp(config);
  var firestore= firebase.firestore()

  const docRef= firestore.collection("Customers")
  const outputHeader = document.querySelector("#hotDogOutput")
  const inputTextField = document.querySelector("#latestHotDogStatus")
  const saveButton=document.querySelector("#saveButton")
  const loadButton=document.querySelector("#loadButton")


// debugger
  $("#customer").submit(function(event){
    event.preventDefault()

    console.log("I am going to save ",event.target)
    docRef.set({
        "id": "1",
        "name": event.target.name.value,
        "position": event.target.position.value,
        "salary": event.target.salary.value,
        "start_date":event.target.startDate.value,
        "office": event.target.office.value,
        "extn": event.target.extn.value
    }).then(function(){
      console.log('Status saved!')
    }).catch(function(error){
      console.log('Got an error: ',error)
    })
  })

  loadButton.addEventListener("click",function(){
    console.log('will fetch')
    const myData =[]
    docRef.get().then(function(doc){
      doc.docs.forEach(each=>{
        let data = each.data()
        data.id=each.id
        myData.push(data)
      })
        console.log('data', myData)
        outputHeader.innerText="Hot dog status: " + Object.keys(myData)
        populateTable(myData)

    }).catch(function(error){
      console.log('Got an error: ',error)
    })
  })

  getRealtimeUpdates=function(){
    const myData =[]
    docRef.onSnapshot(function(doc){
      doc.docs.forEach(each=>{
        let data = each.data()
        data.id=each.id
        myData.push(data)
        populateTable(myData)
      })
    })}

/* Formatting function for row details - modify as you need */
function format ( d ) {
  // `d` is the original data object for the row
  return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">'+
      '<tr>'+
          '<td>Full name:</td>'+
          '<td>'+d.name+'</td>'+
      '</tr>'+
      '<tr>'+
          '<td>Extension number:</td>'+
          '<td>'+d.extn+'</td>'+
      '</tr>'+
      '<tr>'+
          '<td>Extra info:</td>'+
          '<td>And any further details here (images etc)...</td>'+
      '</tr>'+
  '</table>';
}
var table
// $(document).ready(function($) {
  function populateTable(data){
    console.log('data to populate',data)
   table = $('#myTable').DataTable( {
    select: true,
    data: data,
    "columns" : [ {
      "className":'details-control',
      "orderable":false,
      "data":null,
      "defaultContent": ''
  },
      { "data" : "name" },
      { "data" : "position" },
      { "data" : "office" },
      { "data" : "salary" }
  ],"order": [[1, 'asc']]
 } );}
   

  // Add event listener for opening and closing details
  $('#myTable').on('click', 'td.details-control', function () {
    var tr = $(this).closest('tr');
    var row = table.row( tr );

    if ( row.child.isShown() ) {
        // This row is already open - close it
        row.child.hide();
        tr.removeClass('shown');
    }
    else {
        // Open this row
        row.child( format(row.data()) ).show();
        tr.addClass('shown');
    }
} );


  

  getRealtimeUpdates()
  