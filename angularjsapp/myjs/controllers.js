angular.module('myapp.controllers', ['chart.js'])

.controller('VisualappCtrl', function($scope, $stateParams) {
	
})

.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
})

.controller('AddressManagement', function($scope, $stateParams, VisualappService) {
	
	var blocksocket = io('http://localhost:8080/blockchain');
	$scope.address = {
			listaddress:listaddress,
			createaddress: createaddress,
			getasset: getasset,
			getassets: getassets,
			getuserasset: getuserasset,
			getuserassets: getuserassets,
			sendasset: sendasset,
			senduserasset: senduserasset,
			updateuserasset: updateuserasset,
			createasset: createasset,
			issuemoreasset: issuemoreasset,
			createuserasset: createuserasset,
			issuemoreuserasset: issuemoreuserasset,
			updateasset: updateasset,
			updateassetmetadata: updateassetmetadata,
			createassetmetadata: createassetmetadata,
			updateusermetadata: updateusermetadata,
			
			gotasset: '',
			alladdress :'',
			gotassets :'',
			sentasset: '',
			updateduserasset:'',
			sentuserasset:'',
			issuedmoreuserasset:'',
			issuedmoreasset:'',
			createduserasset:'',
			gotaddress :''
	};
	
	$scope.input = {
			assetaddress:'',
			assetdata:'',
			assetmetadata:'',
			useraddress:'',
			usermetadata:'',
			fromuseraddress:'',
			touseraddress:''
	};
	
	
	
	$scope.issuemoreasset = function ()
	{
		// alert('hi');
		// var io1 = socket.connect();
		socket.emit('issuemoreuserasset', $scope.msg);
	}
	
	socket.on('issuedmoreasset', function(msg) {
		
		alert(angular.toJson(msg));
		
		$scope.issuedmoreasset = msg;
		
		console.log("message", msg);
		// this.chats.push(msg);
    });
	
	
	
	$scope.issuemoreuserasset = function ()
	{
		// alert('hi');
		// var io1 = socket.connect();
		socket.emit('issuemoreuserasset', $scope.msg);
	}
	
	socket.on('issuedmoreuserasset', function(msg) {
		
		alert(angular.toJson(msg));
		
		$scope.issuedmoreuserasset = msg;
		
		console.log("message", msg);
		// this.chats.push(msg);
    });
	
	
	
	$scope.createasset = function ()
	{
		// alert('hi');
		// var io1 = socket.connect();
		socket.emit('createasset', $scope.msg);
	}
	
	socket.on('createdasset', function(msg) {
		
		alert(angular.toJson(msg));
		
		$scope.createdasset = msg;
		
		console.log("message", msg);
		// this.chats.push(msg);
    });
	
	$scope.createuserasset = function ()
	{
		// alert('hi');
		// var io1 = socket.connect();
		socket.emit('createuserasset', $scope.msg);
	}
	
	socket.on('createduserasset', function(msg) {
		
		alert(angular.toJson(msg));
		
		$scope.createduserasset = msg;
		
		console.log("message", msg);
		// this.chats.push(msg);
    });
	
	
	
	 function listaddress ()
	 {
		var msg = {
		name:"test1"
		};
		 alert('hi');
		//var io1 = socket.connect();
		blocksocket.emit('getAllAddressesBC', msg);
	 }
	
	$scope.address.alladdress = 'test1';
	blocksocket.on('allAddressesBC', function(msg) {
		 
		 $scope.$apply(function(){
		
			$scope.address.alladdress = msg;
                        
        });
		
		
    });
	
	function createaddress ()
	{
	
	var msg = {
		name:"test1"
		};
		// alert('hi');
		//var io1 = socket.connect();
		todosocket.emit('getNewAddress', msg);
	 }
	
	todosocket.on('gotNewAddress', function(msg) {
		//alert(angular.toJson(msg));
		//console.log("message", msg);
		$scope.gotaddress = msg;
		// this.chats.push(msg);
    });
	
	$scope.getasset = function ()
	 {
		
		if($scope.input.assetaddress == '')
		{
			alert('assetaddress not set');
			return;
		}
		socket.emit('getasset', $scope.input);
	 }
	 
	 $scope.getuserasset = function ()
	 {
		
		if($scope.input.assetaddress == '')
		{
			alert('assetaddress not set');
			return;
		}
		if($scope.input.useraddress == '')
		{
			alert('useraddress not set');
			return;
		}
		socket.emit('getuserasset', $scope.input);
	 }
	 
	 
	socket.on('gotasset', function(msg) {
		$scope.gotasset = msg;
	
    });
	
	$scope.getassets = function ()
	 {
		
		
		socket.emit('getassets', $scope.input);
	 }
	 
	 $scope.getuserassets = function ()
	 {
		
		
		if($scope.input.useraddress == '')
		{
			alert('useraddress not set');
			return;
		}
		socket.emit('getuserassets', $scope.input);
	 }
	 
	 
	socket.on('gotassets', function(msg) {
		$scope.gotassets = msg;
	
    });
	
	$scope.sendasset = function ()
	 {
		
		
		if($scope.input.assetaddress == '')
		{
			alert('assetaddress not set');
			return;
		}
		socket.emit('sendasset', $scope.input);
	 }
	 
	 
	socket.on('sentasset', function(msg) {
		$scope.sentasset = msg;
	
    });
	$scope.senduserasset = function ()
	 {
		
		if($scope.input.useraddress == '')
		{
			alert('useraddress not set');
			return;
		}
		
		if($scope.input.assetaddress == '')
		{
			alert('assetaddress not set');
			return;
		}
		socket.emit('senduserasset', $scope.input);
	 }
	 
	 
	socket.on('sentuserasset', function(msg) {
		$scope.sentuserasset = msg;
	
    });
	
	$scope.updateuserasset = function ()
	 {
		
		if($scope.input.useraddress == '')
		{
			alert('useraddress not set');
			return;
		}
		
		if($scope.input.assetaddress == '')
		{
			alert('assetaddress not set');
			return;
		}
		socket.emit('updateuserasset', $scope.input);
	 }
	 
	 
	socket.on('updateduserasset', function(msg) {
		$scope.updateduserasset = msg;
	
    });
	
	

})
.controller('VisualSalesbyMonthCtrl', function($scope, $stateParams, VisualappService) {
	
	$scope.username = "";
	$scope.emailid = "";
	
// pai chart
// line graph

$scope.segmentlabels =[];
	 // $scope.series = ['Series A', 'Series B'];
 
  $scope.segmentdata1 = [];
  $scope.salesdata = [];
    $scope.salesproductbymonth  = {};
  $scope.items = [];
  $scope.salesdata[0] = [];
  $scope.salesdata[0].length = 12;
  
  $scope.labels = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  $scope.series = ['Series A', 'Series B'];
  $scope.data = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];
   for (var i=0; i< 12; i++ ){
	   $scope.salesdata[0][i] = i;
   }
   
   
  
  
	VisualappService
           .getsalesproductbymonth().then(function (res) {
			   var object = res.data;
			   $scope.salesproductbymonth = object;
			   for (var i=0; i< $scope.salesproductbymonth.length; i++ ){
				   
				   $scope.salesproductbymonth[i]._id.m = $scope.salesproductbymonth[i]._id.m.replace(/\//,"");
				//   alert($scope.salesproductbymonth[i]._id.m);
				   //var res = str.replace(/blue/g, "red");
			 	 // $scope.monthlabels.push($scope.salesproductbymonth[i]._id.m);
				 var xx = $scope.salesproductbymonth[i]._id.p;
				 if($scope.items.indexOf(xx) == -1) {
					$scope.items.push(xx) ;
				 }
				 var month = parseInt($scope.salesproductbymonth[i]._id.m);
				 //alert(xx);
				 if(xx == "Technology"){
					// alert(month);
					  $scope.salesdata[0][month-1] = $scope.salesproductbymonth[i].sales;
				 }
				 
				 /*
				 $scope.monthlabels.push($scope.salesproductbymonth[i]._id.p);
				 $scope.segmentdata1.push($scope.salesproductbymonth[i].num_products);
					 $scope.segmentdata2.push($scope.salesproductbymonth[i].sales);
					 $scope.salesdata[2]
					 */
			   }
			   
            }, function (res) {
               // error
            });
			
	
/*
	if($stateParams.category != null)
			{
				alert($stateParams.category);
			}
			$scope.selected = function(xx1){
	//   alert(xx);
	 
	for (var i=0; i< 12; i++ ){
	   $scope.salesdata[0][i] = i;
   }
	   
    
	 
	 
	   for (var i=0; i< $scope.salesproductbymonth.length; i++ ){
		   var xx = $scope.salesproductbymonth[i]._id.p;
		   var month = parseInt($scope.salesproductbymonth[i]._id.m);
	   if(xx == xx1){
				//	 alert(month);
				//	  $scope.salesdata[0][month-1] = $scope.salesproductbymonth[i].sales;
					  $scope.salesdata[0][month-1] = i;
				 }
	   } 
   }
   */
   
			
})

.controller('VisualSalesbyMonthDetailCtrl', function($scope, $stateParams, VisualappService) {
	
	var cat = $stateParams.category ;
	  $scope.selecteditem = $scope.items[cat];
	  $scope.sel = cat;
	  // $scope.selecteditem = "hello";
	 for (var i=0; i< $scope.salesproductbymonth.length; i++ ){
		   var xx = $scope.salesproductbymonth[i]._id.p;
		   var month = parseInt($scope.salesproductbymonth[i]._id.m);
	   if(xx == $scope.selecteditem){
				//	 alert(month);
					  $scope.salesdata[0][month-1] = $scope.salesproductbymonth[i].sales;
					  // $scope.salesdata[0][month-1] = i;
				 }
	   } 
	   
   
})

.controller('VisualByOrderIdCtrl', function($scope, $stateParams, VisualappService) {
	
	$scope.username = "";
	$scope.emailid = "";
	
	$scope.exampleData = [{
      key: "One",
      y: 5
    }, {
      key: "Two",
      y: 2
    }, {
      key: "Three",
      y: 9
    }, {
      key: "Four",
      y: 7
    }, {
      key: "Five",
      y: 4
    }, {
      key: "Six",
      y: 3
    }, {
      key: "Seven",
      y: 9
    }];

    $scope.width = 500;
    $scope.height = 500;

    $scope.xFunction = function() {
      return function(d) {
        return d.key;
      };
    }
    $scope.yFunction = function() {
      return function(d) {
        return d.y;
      };
    }

    $scope.descriptionFunction = function() {
      return function(d) {
        return d.key;
      }
	}
	  

	$scope.title ="";
	$scope.image="";
	$scope.description ="";
	$scope.salesbyorder = [];
	$scope.salesbycustomersegment = [];
	$scope.salesbycustomername = [];
	$scope.salesbyproductcategory = [];
	
	 $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.data = [];
    $scope.numberOfPages=function(){
        return Math.ceil($scope.salesbyorder.length/$scope.pageSize);                
    }
	
	$scope.currentPage1 = 0;
    $scope.pageSize1 = 10;
    
    $scope.numberOfPages1=function(){
        return Math.ceil($scope.salesbycustomername.length/$scope.pageSize1);                
    }
	
	
	
	VisualappService
           .getsaleslist().then(function (res) {
			   var object = res.data;
			   $scope.salesbyorder = object;
			 
			   
            }, function (res) {
               // error
            });
	
$scope.segmentlabels =[];
	 // $scope.series = ['Series A', 'Series B'];
 
  $scope.segmentdata1 = [];
  $scope.segmentdata2 = [];
  
	VisualappService
           .getsalesbycustomersegment().then(function (res) {
			   var object = res.data;
			   $scope.salesbycustomersegment = object;
			   for (var i=0; i< $scope.salesbycustomersegment.length; i++ ){
			 	 $scope.segmentlabels.push($scope.salesbycustomersegment[i]._id);
				 $scope.segmentdata1.push($scope.salesbycustomersegment[i].num_products);
					 $scope.segmentdata2.push($scope.salesbycustomersegment[i].sales);
			   }
			   
            }, function (res) {
               // error
            });
	

	 $scope.categorylabels =[];
	 // $scope.series = ['Series A', 'Series B'];
 $scope.categoryseries = ['Sales'];
  $scope.categorydata1 = [];
  $scope.categorydata2 = [];
  
//  $scope.categorydata[0] = [];
 // $scope.categorydata[1] = [];
  
	VisualappService
           .getsalesbycustomername().then(function (res) {
			   var object = res.data;
			   $scope.salesbycustomername = object;
			 
			   
            }, function (res) {
               // error
            });
	VisualappService
           .getsalesbyproductcategory().then(function (res) {
			   var object = res.data;
			   $scope.salesbyproductcategory = object;
			 
				for (var i=0; i< $scope.salesbyproductcategory.length; i++ ){
					 $scope.categorylabels.push($scope.salesbyproductcategory[i]._id);
				 $scope.categorydata1.push($scope.salesbyproductcategory[i].num_products);
					 $scope.categorydata2.push($scope.salesbyproductcategory[i].sales);
				} 
				
			   
            }, function (res) {
               // error
            });
	
	
  
	
	
});



