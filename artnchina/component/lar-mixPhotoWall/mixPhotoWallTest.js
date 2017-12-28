$(document).ready(function(){
	var serverPath=getServerPath();
	
	var dataInfo1 = [{url:"imgs/big.jpg",title:'big'},
	                {url:"imgs/small1.jpg" ,title:'1234'},
                    {url:"imgs/small2.jpg",title:'1234'},
                    {url:"imgs/small3.jpg",title:'1234'},
                    {url:"imgs/small4.jpg",title:'1234'}
	                ];
	var dataInfo2 = [
	                {url:"imgs/small1.jpg" ,title:'1234'},
                    {url:"imgs/small2.jpg",title:'5678'},
                    {url:"imgs/small3.jpg",title:'1234'},
                    {url:"imgs/small4.jpg",title:'1234'},
                    {url:"imgs/big.jpg",title:'big'}
	                ];
	$(".mixPhoto1").mixPhotoWall({
		isBigPicLeft:true,
		showTitle:true,
		dataInfo:dataInfo1,
		gap:10
		});
	
	$(".mixPhoto2").mixPhotoWall({
		isBigPicLeft:false,
		dataInfo:dataInfo2,
		gap:2
		});
	
});