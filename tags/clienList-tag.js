 // Initialize Firebase
riot.tag2('style', '', '', '', function(opts) {
  link(rel="stylesheet" type="text/css" href="/assets/css/gridforms/gridforms.css")
  link(href="./assets/css/index.css" rel="stylesheet")

});
riot.tag2('table', '<thead> <tr> <th></th> <th>Name</th> <th>Position</th> <th>Office</th> <th>Salary</th> </tr> </thead> <tfoot> <tr> <th> </th> <th>Name</th> <th>Postion</th> <th>Office</th> <th>Salary</th> </tr> </tfoot>', '', 'class="display" id="myTable" style="width:95%"', function(opts) {
});
riot.tag2('script', '', '', '', function(opts) {
  (src="https://www.gstatic.com/firebasejs/5.3.0/firebase.js")
  (src = "https://cdn.datatables.net/1.10.19/js/jquery.dataTables.min.js")
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
    const saveButton=document.querySelector("#saveButton")
    const loadButton=document.querySelector("#loadButton")

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

          populateTable(myData)

      }).catch(function(error){
        console.log('Got an error: ',error)
      })
    })

    getRealtimeUpdates=function(){
      docRef.onSnapshot(function(doc){
        const myData =[]
        console.log('Got inside Snapshot',Object.keys(doc.docs))
        doc.docs.forEach(each=>{
          let data = each.data()

          data.id=each.id
          myData.push(data)
          console.log('myData',Object.keys(myData),myData)
        })
        populateTable(myData)
      })}

  function format ( d ) {

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
    function populateTable(data){
      if ($.fn.dataTable.isDataTable('#myTable')){
        console.log('Got inside if',Object.keys(data))
        table = $('#myTable').DataTable();
        table.clear();
        table.rows.add(data);
        table.draw()
      }
      else{
        console.log('Got inside else',Object.keys(data))
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
  } );}}

    $('#myTable').on('click', 'td.details-control', function () {
      var tr = $(this).closest('tr');
      var row = table.row( tr );

      if ( row.child.isShown() ) {

          row.child.hide();
          tr.removeClass('shown');
      }
      else {

          row.child( format(row.data()) ).show();
          tr.addClass('shown');
      }
  } );

    getRealtimeUpdates()
});