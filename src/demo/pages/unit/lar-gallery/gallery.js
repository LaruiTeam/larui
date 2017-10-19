$(document).ready(function(){
	/*/!*gallery-2、4张图片上下排版*!/*/
	//alert("TemplateJs 拿到公共变量了："+Larui.baseUrl);
	$.getJSON("./../json/getFigureHead.json" , function(data){
        alert("拿到数据了！");
		jsonData=JSON.stringify(data);
		$(".dataJson p").append(jsonData);

        $(".art_classfications1").gallery({
			dataList: data.model.entity,
			galleryMode:"wordRegionBelowFour",
			setTitleStyle:{textAlign:'center'},
			setWordStyle:{color:"#ffffff"}
	    });
	});

});
