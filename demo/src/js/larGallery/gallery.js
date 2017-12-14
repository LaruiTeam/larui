/*
 * liangshuyi 20171024
 * */
$(document).ready(function(){

	/*gallery--1、单张图片轮训*/
	/*$.getJSON("./../common/json/getFigureHead.json" , function(data){
	 $(".art_classfications").oneSlide({
	 dataList: data.model.entity
	 });
	 },'json');*/

	/*/!*gallery-2、4张图片上下排版*!/*/
	$.getJSON("./../common/json/getFigureHead.json" , function(data){
		jsonData=JSON.stringify(data);
		$(".dataJson p").append(jsonData);
		$(".art_classfications1").gallery({
			dataList: data.model.entity,
			galleryMode:"wordRegionBelowFour",
			setTitleStyle:{textAlign:'center'},
			setWordStyle:{color:"#ffffff"}
		});
	});

	/*gallery--3、4张图片上、遮罩、下排版*/
	$.getJSON("./../common/json/getFigureHead.json" , function(data){
		$(".art_classfications2").gallery({
			dataList: data.model.entity,
			galleryMode:"bTitleMaskDes",
			setMaskColor:"#fff200",
			setPageSize:"4",
			setTitleStyle:{textAlign:'center'},
			setWordStyle:{color:'#ffffff'},
			desWordNum:40
		});
	},'json');



	/*gallery--4、 4张图片上、遮罩、下排版*/
	$.getJSON("./../common/json/getRectangle.json" ,  function(data){
		$(".art_classfications2-1").gallery({
			dataList: data.model.entity,
			galleryMode:"bTitleMaskDesSquare",
			setMaskColor:"#000",
			setPageSize:"5",
			setTitleStyle:{color:'#fff',fontSize:'14px',fontWeight:'normal',lineHeight:'3rem',textAlign:'left'},
			setWordStyle:{color:'#fff',fontSize:'14px'}
		});
	},'json');

	/*gallery--5、3张图片上下排版*/
	$.getJSON("./../common/json/getFigureHead.json" , function(data){
		$(".art_classfications3").gallery({
			dataList: data.model.entity,
			galleryMode:"squareTitleBelow",
			setTitleStyle:{textAlign:'center'},
		});
	},'json');

	/*gallery--6、3张图片遮罩*/
	$.getJSON("./../common/json/getRectangle.json" , function(data){
		$(".art_classfications4").gallery({
			dataList: data.model.entity,
			setMaskColor:"#000000"
		});
	},'json');

	/*gallery--7、3张图片上、下排版，有艺术分类*/
	$.getJSON("./../common/json/getFigureHead.json" ,  function(data){
		$(".art_classfications5").gallery({
			dataList: data.model.entity,
			galleryMode:"bwordRegionArtType",
			setTitleStyle:{textAlign:'center'},
			setWordStyle:{height:'80px'}
		});
	},'json');

	/*gallery--8、12大门类上下排版*/
	$(".art_classfications6").gallery({
		dataList: [
			{"url":"./../images/artType/literature.png", "title":"文学","artType":"文学","des":"111111发给刚发的郭规股份大股东换发的郭规股份大股东换发的郭规股份大股东换大股东换发的郭规股份大股东换大股东换发的郭规股份大股东换发的郭规股份大股东换个地方范的股份大股东换个地方范的股份大股东换个地方范的股份大股东换个地方范的规定发给给对方德纲个地方官的"},
			{"url":"./../images/artType/drama.png","title":"戏剧","artType":"戏剧","des":"2222发给刚发的郭规股份大股东换个地方范的规定发给给对方德纲个地方官的"},
			{"url":"./../images/artType/music.png","title":"音乐","artType":"音乐","des":"3333发给刚发的郭规股份大股东换个地方范的规定发给给对方德纲个地方官的"},
			{"url":"./../images/artType/4.png","title":"摄影","artType":"摄影","des":"4444发给刚发的郭规股份大股东换个地方范的规定发给给对方德纲个地方官的"},
			{"url":"./../images/artType/5.png","title":"美术","artType":"美术","des":"5555发给刚发的郭规股份大股东换个地方范的规定发给给对方德纲个地方官的"},
			{"url":"./../images/artType/6.png","title":"音乐","artType":"音乐","des":"6666发给刚发的郭规股份大股东换个地方范的规定发给给对方德纲个地方官的"},
			{"url":"./../images/artType/7.png","title":"摄影","artType":"摄影","des":"7777发给刚发的郭规股份大股东换个地方范的规定发给给对方德纲个地方官的"},
			{"url":"./../images/artType/8.png","title":"第五届","artType":"美术","des":"8888发给刚发的郭规股份大股东换个地方范的规定发给给对方德纲个地方官的"},
			{"url":"./../images/artType/9.png","title":"第四届","artType":"电影","des":"7777发给刚发的郭规股份大股东换个地方范的规定发给给对方德纲个地方官的"},
			{"url":"./../images/artType/10.png","title":"麻七","artType":"美术","des":"5555发给刚发的郭规股份大股东换个地方范的规定发给给对方德纲个地方官的"},
			{"url":"./../images/artType/11.png","title":"第三届","artType":"音乐","des":"6666发给刚发的郭规股份大股东换个地方范的规定发给给对方德纲个地方官的"},
			{"url":"./../images/artType/12.png","title":"第四届","artType":"电影","des":"7777发给刚发的郭规股份大股东换个地方范的规定发给给对方德纲个地方官的"},
			{"url":"./../images/artType/13.png","title":"第五届","artType":"美术","des":"8888发给刚发的郭规股份大股东换个地方范的规定发给给对方德纲个地方官的"}
		],
		galleryMode:"artType",
		setPageSize:"12",
		setMobilePageSize:"4",

	});
	/*gallery-9、2行2列排版*/
	$.getJSON("./../common/json/getFigureHead.json" , function(data){
		$(".art_classfications7").gallery({
			dataList: data.model.entity,
			galleryMode:"twoRowsGallery"
		});
	},'json');

	/*gallery--10、1张图片左右排版*/
	$.getJSON("./../common/json/getFigureHead.json" ,  function(data){
		$(".art_classfications8").gallery({
			dataList: data.model.entity,
			galleryMode:"wordRegionRight",
			setWordStyle:{color:'#ffffff',padding:'0px',marginTop:'6px'}
		});
	},'json');

	/*gallery--11、1张图片左右排版*/
	$.getJSON("./../common/json/getRectangle.json" ,  function(data){
		$(".art_classfications9").gallery({
			dataList: data.model.entity,
			galleryMode:"wordRegionRight",
			setWordStyle:{color:'#ffffff',padding:'0px',marginTop:'6px'}
		});
	},'json');


});
