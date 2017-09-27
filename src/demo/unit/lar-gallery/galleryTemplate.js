$(document).ready(function(){
	/*/!*gallery-2、4张图片上下排版*!/*/
	//alert("TemplateJs 拿到公共变量了："+Larui.baseUrl);
	$.get("getFigureHead.json" , function(data){
		$(".art_classfications1").gallery({
			dataList: data.model.entity,
			galleryMode:"wordRegionBelowFour",
			setTitleStyle:{textAlign:'center'},
			setWordStyle:{color:"#ffffff"}
	    });
	},'json');

});
