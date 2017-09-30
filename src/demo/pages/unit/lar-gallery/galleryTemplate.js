$(document).ready(function(){
	/*/!*gallery-2、4张图片上下排版*!/*/
	//alert("TemplateJs 拿到公共变量了："+Larui.baseUrl);
	$.get("./../json/getFigureHead.json" , function(data){
        alert(data.dataJson.model.entity);
		$(".art_classfications1").gallery({
			dataList: data.dataJson.model.entity,
			galleryMode:"wordRegionBelowFour",
			setTitleStyle:{textAlign:'center'},
			setWordStyle:{color:"#ffffff"}
	    });
	},'json');

});
