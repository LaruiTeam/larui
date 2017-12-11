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
			setPageSize:"5",
			setTitleStyle:{textAlign:'center'},
			setWordStyle:{color:'#ffffff'},
			desWordNum:40
		});
	},'json');



	/*gallery--4、 4张图片上、遮罩、下排版*/
	$.getJSON("./../common/json/getFigureHead.json" ,  function(data){
		$(".art_classfications2-1").gallery({
			dataList: data.model.entity,
			galleryMode:"bTitleMaskDesSquare",
			setMaskColor:"#fff200",
			setPageSize:"5",
			setTitleStyle:{color:'#ffffff',fontSize:'14px',fontWeight:'normal',lineHeight:'3rem',textAlign:'left'},
			setWordStyle:{color:'#ffffff',fontSize:'14px'}
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
	$.getJSON("./../common/json/getFigureHead.json" , function(data){
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
			setTitleStyle:{textAlign:'center'}
		});
	},'json');

	/*gallery--8、12大门类上下排版*/
	$(".art_classfications6").gallery({
		dataList: [
			{"url":"img/figureHead/23.png", "title":"张三","artType":"美术","des":"111111发给刚发的郭规股份大股东换发的郭规股份大股东换发的郭规股份大股东换大股东换发的郭规股份大股东换大股东换发的郭规股份大股东换发的郭规股份大股东换个地方范的股份大股东换个地方范的股份大股东换个地方范的股份大股东换个地方范的规定发给给对方德纲个地方官的"},
			{"url":"img/figureHead/24.png","title":"李四","artType":"电影","des":"2222发给刚发的郭规股份大股东换个地方范的规定发给给对方德纲个地方官的"},
			{"url":"img/figureHead/35.png","title":"王五","artType":"音乐","des":"3333发给刚发的郭规股份大股东换个地方范的规定发给给对方德纲个地方官的"},
			{"url":"img/figureHead/26.png","title":"小六","artType":"书法","des":"4444发给刚发的郭规股份大股东换个地方范的规定发给给对方德纲个地方官的"},
			{"url":"img/figureHead/17.png","title":"麻七","artType":"美术","des":"5555发给刚发的郭规股份大股东换个地方范的规定发给给对方德纲个地方官的"},
			{"url":"img/figureHead/28.png","title":"第三届","artType":"音乐","des":"6666发给刚发的郭规股份大股东换个地方范的规定发给给对方德纲个地方官的"},
			{"url":"img/figureHead/39.png","title":"第四届","artType":"电影","des":"7777发给刚发的郭规股份大股东换个地方范的规定发给给对方德纲个地方官的"},
			{"url":"img/figureHead/20.png","title":"第五届","artType":"美术","des":"8888发给刚发的郭规股份大股东换个地方范的规定发给给对方德纲个地方官的"},
			{"url":"img/figureHead/39.png","title":"第四届","artType":"电影","des":"7777发给刚发的郭规股份大股东换个地方范的规定发给给对方德纲个地方官的"},
			{"url":"img/figureHead/17.png","title":"麻七","artType":"美术","des":"5555发给刚发的郭规股份大股东换个地方范的规定发给给对方德纲个地方官的"},
			{"url":"img/figureHead/28.png","title":"第三届","artType":"音乐","des":"6666发给刚发的郭规股份大股东换个地方范的规定发给给对方德纲个地方官的"},
			{"url":"img/figureHead/39.png","title":"第四届","artType":"电影","des":"7777发给刚发的郭规股份大股东换个地方范的规定发给给对方德纲个地方官的"},
			{"url":"img/figureHead/20.png","title":"第五届","artType":"美术","des":"8888发给刚发的郭规股份大股东换个地方范的规定发给给对方德纲个地方官的"}
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
	$$.getJSON("./../common/json/getFigureHead.json" ,  function(data){
		$(".art_classfications8").gallery({
			dataList: data.model.entity,
			galleryMode:"wordRegionRight",
			setWordStyle:{color:'#ffffff',padding:'0px',marginTop:'6px'}
		});
	},'json');

});
