
/*组件状态：重构中。。。。。。*/
(function($){ 
	/*上下排版，每次展示3个对象
        var squareTitleBelow=function(){
        	var _this=this;
            var picHtml="";  
            this.innerContainerWidth=$(_this.$container).width();
            _this.picWidth=Math.floor(this.innerContainerWidth/this.options.pageSize);
            $.each( this.options.dataList, function( i , e ){
                var distance = parseInt(i * _this.picWidth);                
                if(!e.hyperLink || e.hyperLink=="" || e.hyperLink=="undefined"){
             	   e.hyperLink=e.url;
                }
                var wordRegion ="";
                for (var n in e) {
                    if(n!="url" && n!="hyperLink"){
                    	wordRegion+=e[n]+"<br/>";
                    }
                }
                
                picHtml+="<div class='galleryPic pageSizeThree'> <a href='"+e.hyperLink+"' target='_blank'><div class='img'> <img src='" + e.url + " '/></div><div class='title'><p>"+wordRegion+"</p></div></a> </div>"; //width="+(picWidth-10)+"px;'
            });
            this.$container.find(" .lar-galleryWrapper .inner").addClass(_this.options.galleryMode).append(picHtml);
            
        };
        
        $.fn.gallery.addBulidDom("squareTitleBelow",squareTitleBelow);*/
        /*
        上下排版，每次展示12个对象
        var galleryArtType=function(){
        	var _this=this;
            var picHtml="";  
            this.innerContainerWidth=$(_this.$container).width();
            _this.picWidth=Math.floor(this.innerContainerWidth/this.options.pageSize);
            $.each( this.options.dataList, function( i , e ){
                var distance = parseInt(i * _this.picWidth);                
                if(!e.hyperLink || e.hyperLink=="" || e.hyperLink=="undefined"){
             	   e.hyperLink=e.url;
                }
                var wordRegion ="";
                for (var n in e) {
                    if(n!="url" && n!="hyperLink"){
                    	wordRegion+=e[n]+"<br/>";
                    }
                }
                
                picHtml+="<div class='galleryPic pageSizeTwelve'> <a href='"+e.hyperLink+"' target='_blank'><div class='img'> <img src='" + e.url + " '/></div><div class='title'><p>"+wordRegion+"</p></div></a> </div>"; //width="+(picWidth-10)+"px;'
            });
            this.$container.find(" .lar-galleryWrapper .inner").addClass(_this.options.galleryMode).append(picHtml);
            
        };
        
        $.fn.gallery.addBulidDom("artType",galleryArtType);*/
        
     /*   上下排版，每次展示4个对象
        var wordRegionBelowFour=function(){
        	var _this=this;
            var picHtml="";  
            this.innerContainerWidth=$(_this.$container).width();
            _this.picWidth=Math.floor(this.innerContainerWidth/this.options.pageSize);
            $.each( this.options.dataList, function( i , e ){
                var distance = parseInt(i * _this.picWidth);                
                if(!e.hyperLink || e.hyperLink=="" || e.hyperLink=="undefined"){
             	   e.hyperLink=e.url;
                }
                var wordRegion ="";
                for (var n in e) {
                    if(n!="url" && n!="hyperLink" && n!="title"){
                    	wordRegion+=e[n]+"<br/>";
                    }
                }
                
                picHtml+="<div class='galleryPic pageSizeFour'> <a href='"+e.hyperLink+"' target='_blank'><div class='img'> <img src='" + e.url + " '/></div><div class='wordRegion'><p><span class='userName'>"+e.title+"</span><br/><span class='desc'>"+wordRegion+"<span></p></div></a> </div>"; //width="+(picWidth-10)+"px;'
            });
            this.$container.find(" .lar-galleryWrapper .inner").addClass(_this.options.galleryMode).append(picHtml);
            
        };
        
        $.fn.gallery.addBulidDom("wordRegionBelowFour",wordRegionBelowFour);*/
        
        /*上、遮罩、下排版，每次展示4个对象*/
   /*     var bTitleMaskDes=function(){
        	var _this=this;
            var picHtml="";  
            this.innerContainerWidth=$(_this.$container).width();
            _this.picWidth=Math.floor(this.innerContainerWidth/this.options.pageSize);
            $.each( this.options.dataList, function( i , e ){
                var distance = parseInt(i * _this.picWidth);                
                if(!e.hyperLink || e.hyperLink=="" || e.hyperLink=="undefined"){
             	   e.hyperLink=e.url;
                }
                var wordRegion ="";
                for (var n in e) {
                    if(n!="url" && n!="hyperLink" && n!="title"){
                    	wordRegion+=e[n]+"<br/>";
                    }
                }
                
                picHtml+="<div class='galleryPic pageSizeFour'> <a href='"+e.hyperLink+"' target='_blank'><div class='img'> <img src='" + e.url + " '/></div><div class='title'>"+e.title+"</div><div class='desc'>"+wordRegion+"</div></a> </div>"; //width="+(picWidth-10)+"px;'
            });
            this.$container.find(" .lar-galleryWrapper .inner").addClass(_this.options.galleryMode).append(picHtml);
            
            $.when(_this.waitImgLoad.call(_this)).done(function(){
            	$(_this.$container).find(" .lar-galleryWrapper .inner a").hover(function(){
            		var parWidth=$(this).parent().width();
                	$(this).find("img").css({"width":parWidth+"px"});
                	$(this).find(".desc").css({"width":parWidth+"px"});
                }).on( "mouseleave", function(){
                	$(this).find("img").css({"width":"auto"});
                	$(this).find(".desc").css({"width":"auto"});
                } );
            });
        };*/
        
        /*$.fn.gallery.addBulidDom("bTitleMaskDes",bTitleMaskDes);*/
        
    	/*上下排版，每次展示3个对象,添加艺术类别
        var bwordRegionArtType=function(){
        	var _this=this;
            var picHtml="";  
            this.innerContainerWidth=$(_this.$container).width();
            _this.picWidth=Math.floor(this.innerContainerWidth/this.options.pageSize);
            $.each( this.options.dataList, function( i , e ){
                var distance = parseInt(i * _this.picWidth);                
                if(!e.hyperLink || e.hyperLink=="" || e.hyperLink=="undefined"){
             	   e.hyperLink=e.url;
                }
                var wordRegion ="";
                for (var n in e) {
                    if(n!="url" && n!="hyperLink" && n!="title" && n!="artType"){
                    	wordRegion+=e[n]+"<br/>";
                    }
                }
                
                picHtml+="<div class='galleryPic pageSizeThree'> <a href='"+e.hyperLink+"' target='_blank'><div class='img'> <img src='" + e.url + " '/></div><div class='wordRegion'><p><span class='userName'>"+e.title+"</span><br/><span class='desc'>"+wordRegion+"<span></p></div></a><div class='artType'>"+e.artType+"</div> </div>"; //width="+(picWidth-10)+"px;'
            });
            this.$container.find(" .lar-galleryWrapper .inner").addClass(_this.options.galleryMode).append(picHtml);
            
        };
        
        $.fn.gallery.addBulidDom("bwordRegionArtType",bwordRegionArtType);*/
        
        /*2行2列的gallery
        var twoRowsGallery=function(){
        	var _this=this;           
            this.innerContainerWidth=$(_this.$container).width();
            _this.picWidth=Math.floor(this.innerContainerWidth/this.options.pageSize);
            var dataListLength=this.options.dataList.length;
            var multiple=Math.floor(dataListLength/4);
            var mulMode=dataListLength%4;
            this.$container.find(" .lar-galleryWrapper .inner").addClass(_this.options.galleryMode);

            if(multiple>0){
            	for(var j=0;j<multiple;j++){   
            		 var picHtml="";  
                    	for(var k=0;k<4;k++){
                    		if(k==1){
                            	picHtml+='<div class="imgArea"><img src=" '+this.options.dataList[j*4+k].url+' "></div><br/>';
                    		}else{
                            	picHtml+='<div class="imgArea"><img src=" '+this.options.dataList[j*4+k].url+' "></div>';
                    		}
                    		if(k==3){
                    			this.$container.find(" .lar-galleryWrapper .inner").append("<div class='galleryPic' />");
                    			this.$container.find(" .lar-galleryWrapper ."+_this.options.galleryMode+" .galleryPic:last").append(picHtml);
                    		}
                    	}
                    }
            }         
            
        };
        
        $.fn.gallery.addBulidDom("twoRowsGallery",twoRowsGallery);*/

})(jQuery)