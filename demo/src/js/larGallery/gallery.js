/*
* liangshuyi 20171024
* */
$(document).ready(function(){
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

});
