;(function($,window,undefined){

    String.prototype.toInt=function(){
        var string=this.toString();
        if(string.length == 0){
            return 0;
        }else{
            var length=string.length;
            var negtive=false;
            if(string.indexOf("-") == 0){
                negtive=true;
                string=string.substr(1);
                length -= 1;
            }else{

            }

            var end=0;
            var stringArr=string.split("");
            for(var i=0;i<length;i++){
                if(isNaN(Number(stringArr[i]))){
                    end=i;
                    break;
                }else{
                    continue;
                }
            }

            if(end == 0){
                return 0;
            }else{

                var num=string.substr(0,end);

                if(negtive==false){
                    return Number(num);
                }else{
                    return Number("-"+num);
                }

            }
        }
    }

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


        },
        getDom:function(options){
            var $dom=$("<div id='jQueryNoticeDiv'><div id='jQueryNoticeTitle'></div><div id='jQueryNoticeContent'></div><div id='jQueryNoticeFooter'></div></div>");


            if(options.type == "alert"){
                $dom.find("#jQueryNoticeTitle").html("<div id='noticeAlert'></div>");
                $dom.find("#jQueryNoticeContent").html(options.content);
                if(options.sure == true){
                    $dom.find("#jQueryNoticeFooter").append("<button class='sure'>"+options.sureText+"</button>");
                    var _this = this;
                    $dom.on("click","button.sure",function(){
                        options.sureFunction(_this);
                    })
                }
                if(options.cancel == true){
                    $dom.find("#jQueryNoticeFooter").append("<button class='cancel'>"+options.cancelText+"</button>")
                }
            }else if(options.type == "info"){
                $dom.find("#jQueryNoticeTitle").html("<div id='noticeInfo'></div>");
                $dom.find("#jQueryNoticeContent").html(options.content);

                if(options.sure == true){
                    $dom.find("#jQueryNoticeFooter").append("<button class='sure'>"+options.sureText+"</button>");
                    var _this = this;
                    $dom.on("click","button.sure",function(){
                        options.sureFunction(_this);
                    })
                }
                if(options.cancel == true){
                    $dom.find("#jQueryNoticeFooter").append("<button class='cancel'>"+options.cancelText+"</button>")
                }


            }else if(options.type == "question"){
                $dom.find("#jQueryNoticeTitle").html("<div id='noticeQuestion'></div>");
            }else if(options.type == "promp"){
                $dom.find("#jQueryNoticeTitle").html("<div id='noticePromp'></div>");
                $dom.find("#jQueryNoticeContent").html(options.content);

                if(options.sure == true){
                    $dom.find("#jQueryNoticeFooter").append("<button class='sure'>"+options.sureText+"</button>");
                    var _this = this;
                    $dom.on("click","button.sure",function(){
                        options.sureFunction(_this);
                    })
                }
                if(options.cancel == true){
                    $dom.find("#jQueryNoticeFooter").append("<button class='cancel'>"+options.cancelText+"</button>")
                }
            }

            return $dom;
        },
        alert:function(options){

            var defaults={
                type:"alert",
                showCancel:false,
                cancelText:"cancel",
                content:"null",
                cancel:true,
                cancelText:"cancel",
                sure:true,
                sureFunction:function(thisObj){
                    thisObj.destroy();
                },
                sureText:"sure"
            }

            options=$.extend(defaults,options);

            this.init();

            var $alertDom=this.getDom(options);

            $body.append($alertDom);
            $alertDom.siblings().addClass("notice-blur");

        },
        info:function(options){
            var defaults={
                type:"info",
                showCancel:false,
                cancelText:"cancel",
                content:"null",
                cancel:true,
                sure:true,
                sureFunction:function(thisObj){
                    thisObj.destroy();
                },
                sureText:"sure"
            }

            options=$.extend(defaults,options);

            this.init();

            var $infoDom=this.getDom(options);
            $infoDom.find("")

            $body.append($infoDom);
            $infoDom.siblings().addClass("notice-blur");
        },
        promp:function(options){
            var defaults={
                type:"promp",
                Cancel:true,
                cancelText:"cancel",
                content:"<imput type='text' name='' />",
                sure:true,
                sureFunction:function(thisObj){
                    console.log($("#jQueryNoticeDiv").find("input").val());
                    thisObj.destroy();
                },
                sureText:"sure"
            };


            options=$.extend(defaults,options);

            this.init();

            var $infoDom=this.getDom(options);
            $infoDom.find("")

            $body.append($infoDom);
            $infoDom.siblings().addClass("notice-blur");
        }
    }

})(jQuery,window)
