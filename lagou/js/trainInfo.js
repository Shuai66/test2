var urldata =`http://proxy.e12e.com/?http://ws.webxml.com.cn/WebServices/TrainTimeWebService.asmx/getStationAndTimeByStationName?UserID=3abb4264ba5a44eeb07456e2cbbbc4e3`
			var train = `http://proxy.e12e.com/?http://ws.webxml.com.cn/WebServices/TrainTimeWebService.asmx/getDetailInfoByTrainCode?UserID=3abb4264ba5a44eeb07456e2cbbbc4e3`
			$(function(){
				var num;
				var tname;//保存点击时的车次				
				$("#query").on("tap",function(){
						$("#load").show();
					var starSta = $("#start").val();
					var arriveSta = $("#arrive").val();
					$.get(urldata,{StartStation:starSta,ArriveStation:arriveSta},function(data){
						var str = "";
//						console.log(data)
						$(data).find("TimeTable").each(function(index,obj){
							if(index>10) return;
							num = $(obj).find("traincode").text();
							var fista = $(obj).find("FirstStation").text();
							var lasta = $(obj).find("LastStation").text();
							var sTime= $(obj).find("StartTime").text();
							var aTime= $(obj).find("ArriveTime").text();
							var useTime = $(obj).find("UseDate").text();
							str+=""
							str += "<li><h3><b class='b'>"+num+"</b><span>"+fista+"-->"+lasta+"<i class='fa fa-angle-double-right' aria-hidden='true'></i></span></h3>";
							str += "<p><span>"+sTime+":开</span>----<span>"+aTime+":到站</span></br><b>历时:"+useTime+"</b></p></li>"
//							console.log(str)
						})
						$("#one").html(str);
						$("#load").hide();
						
					})
					
				})
				$("#one").on("tap","h3",function(){
						$("#load").show();//加载动画
						$("#list").css("transform","translate3d(-50%,0,0)");
						tname = $(this).find("b").html();
						$.get(train,{TrainCode:tname},function(data){
							var str ="";
							var len = $(data).find("TrainDetailInfo").length;
							$(data).find("TrainDetailInfo").each(function(index,obj){
								var staname = $(obj).find("TrainStation").text();
								var arvTime = $(obj).find("ArriveTime").text();
								var stTime  =  $(obj).find("StartTime").text();
								var km = $(obj).find("KM").text();
								if(index==0){
									str+="<li><b>始发站:"+staname+"</b><span>发车时间:"+stTime+"</span></li>";
								}
								else if(index == len-1){
									str+="<li><b>终点站:"+staname+"</b><span>到达时间:"+arvTime+"</span>里程:"+km+"km</li>";
								}else{
									str+="<li><b>到达站:"+staname+"</b><span>到达时间:"+arvTime+"</span><span>发车时间:"+stTime+"</span>里程:"+km+"km</li>";
								}

							})
							$("#two").html(str);
							$("#load").hide();
						})
						
				})
				$("#two").on("tap",function(){
						$("#list").css("transform","translate3d(0,0,0)")
				})
			})