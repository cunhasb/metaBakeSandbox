
riot.tag2('customerlist-tag', '', '', '', function(opts) {
    const config = {
        apiKey: "AIzaSyDqsYsb5JynBRE3DWDXgLy5gPEsk8xsqkw",
        authDomain: "crm-ligth.firebaseapp.com",
        databaseURL: "https://crm-ligth.firebaseio.com",
        projectId: "crm-ligth",
        storageBucket: "crm-ligth.appspot.com",
        messagingSenderId: "429432494555"
      };

    firebase.initializeApp(config);
      const firestore= firebase.firestore()

      const docRef= firestore.collection("Customers")

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