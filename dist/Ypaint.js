!function(){function t(){this.init=function(t){this.outerParams={rect:{},circle:{},line:{},arrow:{}},this.isLine=!1,this.isArrow=!1,this.isRect=!1,this.isCircle=!1,this.lock=!1,this.canvas=t,this.ctx=this.canvas.getContext("2d"),this.w=this.canvas.width,this.h=this.canvas.height,this.touch="createTouch"in document,this.StartEvent=this.touch?"touchstart":"mousedown",this.MoveEvent=this.touch?"touchmove":"mousemove",this.EndEvent=this.touch?"touchend":"mouseup",this.clickDrag=[],this.lineX=[],this.lineY=[],this.beginPoint={},this.stopPoint={},this.storage={},this.rect={},this.polygonVertex=[],this.status={lineArr:[],arrowArr:[],circleArr:[],rectArr:[]},this.bind()},this.chooseRect=function(){this.isLine=!1,this.isArrow=!1,this.isRect=!0,this.isCircle=!1},this.chooseCircle=function(){this.isLine=!1,this.isArrow=!1,this.isRect=!1,this.isCircle=!0},this.chooseLine=function(){this.isLine=!0,this.isArrow=!1,this.isRect=!1,this.isCircle=!1},this.chooseArrow=function(){this.isLine=!1,this.isArrow=!0,this.isRect=!1,this.isCircle=!1},this.bind=function(){var t=this;this.canvas["on"+t.StartEvent]=function(e){var i=t.touch?e.touches[0]:e;t.lock=!0;var s=i.offsetX,r=i.offsetY;t.isRect?(t.rect.x=s,t.rect.y=r):t.isCircle?(t.storage.x=s,t.storage.y=r):t.isLine?(t.movePoint(s,r),t.drawPoint(t.lineX,t.lineY,t.clickDrag,t.outerParams.line.lineWidth,t.outerParams.line.color)):t.isArrow&&(t.beginPoint.x=s,t.beginPoint.y=r)},this.canvas["on"+t.MoveEvent]=function(e){if(t.lock)if(t.isRect)t.rect.width=Math.abs(t.rect.x-e.offsetX),t.rect.height=Math.abs(t.rect.y-e.offsetY),t.rect.x>e.offsetX?t.rect.realX=e.offsetX:t.rect.realX=t.rect.x,t.rect.y>e.offsetY?t.rect.realY=e.offsetY:t.rect.realY=t.rect.y,t.clear(),t.redrawAll(),t.drawRect(t.rect.realX,t.rect.realY,t.rect.width,t.rect.height,t.outerParams.rect.radius,t.outerParams.rect.color,t.outerParams.rect.lineWidth);else if(t.isCircle){if(t.storage.x>e.offsetX)i=t.storage.x-Math.abs(t.storage.x-e.offsetX)/2;else var i=Math.abs(t.storage.x-e.offsetX)/2+t.storage.x;if(t.storage.y>e.offsetY)s=t.storage.y-Math.abs(t.storage.y-e.offsetY)/2;else var s=Math.abs(t.storage.y-e.offsetY)/2+t.storage.y;var r=Math.abs(t.storage.x-e.offsetX)/2,o=Math.abs(t.storage.y-e.offsetY)/2;t.clear(),t.redrawAll(),t.drawEllipse(i,s,r,o,t.outerParams.circle.lineWidth,t.outerParams.circle.color)}else t.isLine?(t.movePoint(e.offsetX,e.offsetY,!0),t.drawPoint(t.lineX,t.lineY,t.clickDrag,t.lineWidth,t.outerParams.line.color)):t.isArrow&&(t.stopPoint.x=e.offsetX,t.stopPoint.y=e.offsetY,t.clear(),t.redrawAll(),t.arrowCoord(t.beginPoint,t.stopPoint,t.outerParams.arrow.range),t.sideCoord(),t.drawArrow(t.outerParams.arrow.color))},this.canvas["on"+t.EndEvent]=function(e){if(t.isRect)t.status.rectArr.push({realX:t.rect.realX,realY:t.rect.realY,width:t.rect.width,height:t.rect.height,radius:t.outerParams.rect.radius,color:t.outerParams.rect.color,lineWidth:t.outerParams.rect.lineWidth}),t.rect={};else if(t.isCircle){if(t.storage.x>e.offsetX)i=t.storage.x-Math.abs(t.storage.x-e.offsetX)/2;else var i=Math.abs(t.storage.x-e.offsetX)/2+t.storage.x;if(t.storage.y>e.offsetY)s=t.storage.y-Math.abs(t.storage.y-e.offsetY)/2;else var s=Math.abs(t.storage.y-e.offsetY)/2+t.storage.y;var r=Math.abs(t.storage.x-e.offsetX)/2,o=Math.abs(t.storage.y-e.offsetY)/2;t.status.circleArr.push({x:i,y:s,a:r,b:o,color:t.outerParams.circle.color,lineWidth:t.outerParams.circle.lineWidth}),t.storage={}}else if(t.isLine)t.status.lineArr.push({x:t.lineX,y:t.lineY,clickDrag:t.clickDrag,lineWidth:t.outerParams.line.lineWidth,color:t.outerParams.line.color}),t.lineX=[],t.lineY=[],t.clickDrag=[];else if(t.drawArrow){var a={beginPoint:t.beginPoint,stopPoint:{x:e.offsetX,y:e.offsetY},range:t.outerParams.arrow.range,color:t.outerParams.arrow.color};t.status.arrowArr.push(a),t.beginPoint={}}t.lock=!1}},this.movePoint=function(t,e){this.lineX.push(t),this.lineY.push(e),this.clickDrag.push(e)},this.drawPoint=function(t,e,i,s,r){for(var o=0;o<t.length;o++)this.ctx.beginPath(),i[o]&&o?this.ctx.moveTo(t[o-1],e[o-1]):this.ctx.moveTo(t[o]-1,e[o]),this.ctx.lineWidth=s,this.ctx.strokeStyle=r,this.ctx.lineTo(t[o],e[o]),this.ctx.closePath(),this.ctx.stroke()},this.getRadian=function(t,e){this.angle=Math.atan2(e.y-t.y,e.x-t.x)/Math.PI*180},this.arrowCoord=function(t,e,i){this.polygonVertex[0]=t.x,this.polygonVertex[1]=t.y,this.polygonVertex[6]=e.x,this.polygonVertex[7]=e.y,this.getRadian(t,e),this.polygonVertex[8]=e.x-CONST.edgeLen*Math.cos(Math.PI/180*(this.angle+i)),this.polygonVertex[9]=e.y-CONST.edgeLen*Math.sin(Math.PI/180*(this.angle+i)),this.polygonVertex[4]=e.x-CONST.edgeLen*Math.cos(Math.PI/180*(this.angle-i)),this.polygonVertex[5]=e.y-CONST.edgeLen*Math.sin(Math.PI/180*(this.angle-i))},this.sideCoord=function(){var t={};t.x=(this.polygonVertex[4]+this.polygonVertex[8])/2,t.y=(this.polygonVertex[5]+this.polygonVertex[9])/2,this.polygonVertex[2]=(this.polygonVertex[4]+t.x)/2,this.polygonVertex[3]=(this.polygonVertex[5]+t.y)/2,this.polygonVertex[10]=(this.polygonVertex[8]+t.x)/2,this.polygonVertex[11]=(this.polygonVertex[9]+t.y)/2},this.drawArrow=function(t){this.ctx.fillStyle=t,this.ctx.beginPath(),this.ctx.moveTo(this.polygonVertex[0],this.polygonVertex[1]),this.ctx.lineTo(this.polygonVertex[2],this.polygonVertex[3]),this.ctx.lineTo(this.polygonVertex[4],this.polygonVertex[5]),this.ctx.lineTo(this.polygonVertex[6],this.polygonVertex[7]),this.ctx.lineTo(this.polygonVertex[8],this.polygonVertex[9]),this.ctx.lineTo(this.polygonVertex[10],this.polygonVertex[11]),this.ctx.closePath(),this.ctx.fill()},this.createRect=function(t,e,i,s,r,o,a,h){this.ctx.beginPath(),this.ctx.moveTo(t,e+r),this.ctx.lineTo(t,e+s-r),this.ctx.quadraticCurveTo(t,e+s,t+r,e+s),this.ctx.lineTo(t+i-r,e+s),this.ctx.quadraticCurveTo(t+i,e+s,t+i,e+s-r),this.ctx.lineTo(t+i,e+r),this.ctx.quadraticCurveTo(t+i,e,t+i-r,e),this.ctx.lineTo(t+r,e),this.ctx.quadraticCurveTo(t,e,t,e+r),this.ctx[a+"Style"]=o,this.ctx.lineWidth=h,this.ctx.closePath(),this.ctx[a]()},this.drawRect=function(t,e,i,s,r,o,a){this.createRect(t,e,i,s,r,o,"stroke",a)},this.drawEllipse=function(t,e,i,s,r,o){this.ctx.beginPath(),this.ctx.ellipse(t,e,i,s,0,0,2*Math.PI),this.ctx.lineWidth=r,this.ctx.fillStyle="rgba(0,0,0,0)",this.ctx.strokeStyle=o,this.ctx.fill(),this.ctx.stroke()},this.clear=function(){this.ctx.clearRect(0,0,this.w,this.h)},this.redrawAll=function(){var t=this;this.status.rectArr.length>0&&this.status.rectArr.forEach(function(e){t.drawRect(e.realX,e.realY,e.width,e.height,e.radius,e.color,e.lineWidth)}),this.status.circleArr.length>0&&this.status.circleArr.forEach(function(e){t.drawEllipse(e.x,e.y,e.a,e.b,e.lineWidth,e.color)}),this.status.lineArr.length>0&&this.status.lineArr.forEach(function(e,i){t.drawPoint(e.x,e.y,e.clickDrag,e.lineWidth,e.color)}),this.status.arrowArr.length>0&&this.status.arrowArr.forEach(function(e,i){e.beginPoint!={}&&(t.arrowCoord(e.beginPoint,e.stopPoint,e.range),t.sideCoord(),t.drawArrow(e.color))})}}console.log("\n %c Ypaint 1.0.1 %c \n\n","color: #fadfa3; background: #030307; padding:5px 0;","background: #fadfa3; padding:5px 0;"),CONST={edgeLen:25,angle:15},window.Ypaint=function(e){var i=new t;return i.init(e),i}}();