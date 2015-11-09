;(function($,window,undefined){

    function chooseOne(one,base,type){
        if(type == "gt"){
            return one > base ? one : base;
        }else if(type == "lt"){
            return one < base ? one : base;
        }else{
            return 0;
        }
    }

    var $body=$("body");
    var $html=$("html");
    var $window=$(window);

    var baseJson={
        type:"alert",
        showCancel:false,
        cancelText:"取消",
        sure:true,
        sureText:"确定",
        sureFunction:function(thisObj){
            thisObj.destroy();
        },
        content:"test"
    };



    $.notice={
        init:function(){
            $html.addClass("notice-active");
            $body.addClass("notice-active dom-animate");
            $body.append("<div class='notice-mask'></div>")
        },
        destroy:function(){
            $html.removeClass("notice-active");
            $body.removeClass("notice-active");
            $body.find(".notice-mask").remove();

            $("#jQueryNoticeDiv").siblings().removeClass("notice-blur");
            $("#jQueryNoticeDiv").remove();
            $window.unbind("keydown",this.triggerSure);
            $window.unbind("keydown",this.triggerCancel);


        },
        triggerSure:function(event){
            console.log(event.keyCode);
            if(event.keyCode == 13){
                $("#jQueryNoticeDiv button.sure").click();
                console.log("trigger click sure");
            }else{
                console.log("did not trigger click sure");
            }
            //$("#jQueryNoticeDiv button.sure").trigger("click");
        },
        triggerCancel:function(event){
            if(event.keyCode == 27){
                $("#jQueryNoticeDiv button.cancel").trigger("click");
            }else{
                console.log("did not trigger click cancel");
            }
        },  
        getDom:function(options){
            var $dom=$("<div id='jQueryNoticeDiv'><div id='jQueryNoticeTitle'></div><div id='jQueryNoticeContent'></div><div id='jQueryNoticeFooter'></div></div>");


            if(options.type == "alert"){
                $dom.find("#jQueryNoticeTitle").html("<div id='noticeAlert'></div>");
            }else if(options.type == "info"){
                $dom.find("#jQueryNoticeTitle").html("<div id='noticeInfo'></div>");
            }else if(options.type == "question"){
                $dom.find("#jQueryNoticeTitle").html("<div id='noticeQuestion'></div>");
            }else if(options.type == "promp"){
                $dom.find("#jQueryNoticeTitle").html("<div id='noticePromp'></div>");
            }


            $dom.find("#jQueryNoticeContent").html(options.content);
            if(options.sure == true){
                $dom.find("#jQueryNoticeFooter").append("<button class='sure'>"+options.sureText+"</button>");
                var _this = this;
                $dom.find("button.sure").click(function(){
                    options.sureFunction(_this);
                })
                $window.keydown(this.triggerSure);
            }
            if(options.cancel == true){
                $dom.find("#jQueryNoticeFooter").append("<button class='cancel'>"+options.cancelText+"</button>");
                var _this=this;
                $dom.find("button.cancel").click(function(){
                    if(options.cancelFunction){
                        options.cancelFunction(_this);
                    }
                })
                $window.keydown(this.triggerCancel);
            }

            return $dom;
        },
        default(options){
            this.init();

            var $dom=this.getDom(options);

            $body.append($dom);
            $dom.siblings().addClass("notice-blur");

        },
        alert:function(options){

            var defaults=$.extend(true,{},baseJson,{
                type:"alert"
            });

            options=$.extend(defaults,options);

            this.default(options);

        },
        info:function(options){

            var defaults=$.extend(true,{},baseJson,{
                type:"info",
            });

            options=$.extend(defaults,options);

            this.default(options);        },
        promp:function(options){

            var defaults=$.extend(true,{},baseJson,{
                type:"promp",
                content:"<input type='text' />"
            });


            options=$.extend(defaults,options);

            this.default(options);
        }
    }



})(jQuery,window)
