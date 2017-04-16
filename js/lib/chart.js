/**
 * Created by max on 14.04.2017.
 */
"use strict";

var chart=function() {
  this.data=[];
  this.type='linear';
  this.animate=false;

};

chart.prototype={
  drawChart:function(ctx){
    var x=this.data[0];
    var y=this.data[1];
    var color=this.data[2];
    var step=100;
    var call;

      switch(this.type){
        case 'bar':{
          if(this.animate){
            call=drawBarChart;
            animDraw();
          }else{
            drawBarChart(ctx,x,y,color);
          }
          break;
        }
        case 'pie':{
          if(this.animate){
            call=drawPieChart;
            animDraw();
          }else{
            drawPieChart(ctx,x,y,color);
          }
          break;
        }
        default:{
          if(this.animate){
            call=drawLinearChart;
            animDraw();
          }else{
            drawLinearChart(ctx,x,y,color);
          }
          break;
        }
      }
    function animDraw(){
      var arrY=[];
      for(var i=0;i<y.length;i++){
        arrY[i]=y[i]/step;
      }
      call(ctx,x,arrY,color);
      step--;
      if(step>0){
        setTimeout(animDraw,5);
      }
    }
    
    function drawBarChart(ctx,x,y,color){
      ctx.clearRect(0, 0, 640, 480);
      var xLine=xValueTocord(y.length);
      y=yValueTocord(y);
      var w=(640/xLine.length)*0.5;
      for(var i=0;i<xLine.length;i++){
        ctx.beginPath();
        ctx.rect(xLine[i],480-y[i],w,480);
        ctx.fillStyle=color[i];
        ctx.fill();
        ctx.strokeStyle=color[i];
        ctx.stroke();
      }
      drawText(x);
    }
    function drawPieChart(ctx,x,y,color){
      ctx.clearRect(0, 0, 640, 480);
      y=yValuetoPercent(y);
      var start=0;
      for(var i=0;i<x.length;i++) {
        ctx.fillStyle = color[i];
        ctx.beginPath();
        ctx.moveTo(640 / 2, 480 / 2);
        ctx.arc(640 / 2, 480 / 2, 150, start, start + (Math.PI / 180) * y[i] * 360 / 100, false);
        start = start + (Math.PI / 180) * y[i] * 360 / 100;
        ctx.closePath();
        ctx.fill();
        ctx.font = "15pt Tahoma";
        ctx.textAlign = "left";
        ctx.textBaseline = 'middle';
        var a=20;
        var b=i*30+480/5;
        ctx.fillStyle=color[i];
        ctx.rect(a-20,b,20,20);
        ctx.fill();
        ctx.fillStyle = "#000000";
        ctx.fillText(x[i]+":   "+Math.round(y[i])+"%", a+10,b+10);

      }
      
    }
    function drawLinearChart(ctx,x,y,color){
      ctx.clearRect(0, 0, 640, 480);
      var xLine=xValueTocord(y.length);
      y=yValueTocord(y);
      ctx.beginPath();
      ctx.moveTo(xLine[0],480-y[0]);
      ctx.lineTo(xLine[1],480-y[1]);
      ctx.strokeStyle=color[0];
      ctx.stroke();
      ctx.closePath();
      for(var i=2;i<xLine.length;i++){
        var prev=i-1;
        ctx.beginPath();
        ctx.moveTo(xLine[prev],480-y[prev]);
        ctx.lineTo(xLine[i],480-y[i]);
        ctx.strokeStyle=color[i];
        ctx.stroke();
        ctx.closePath();
      }
      drawText(x);

    }

    function xValueTocord(x){
      var max=x;
      var arr=[];
      for( var i=0;i<x;i++){
        arr[i]=i;
      }
      max++;
      for(i=0;i<x;i++){
        arr[i]=640/max*arr[i];
      }
      return(arr);
    }
    function yValueTocord(y){
      var max=0;
      for(var i=0;i<y.length;i++){
        if(y[i]>max){
          max=y[i];
        }
      }
      max++;
      for( i=0;i<x.length;i++){
        y[i]=480/max*y[i];
      }
      return(y);
    }

    function yValuetoPercent(y){
      var sum=0;
      for(var i=0;i<y.length;i++){
       sum=sum+y[i];
      }
      for(var i=0;i<y.length;i++){
        y[i]=100*y[i]/sum;
      }
      return(y);
    }
  function drawText(text){
    var xLine=xValueTocord(text.length);
    for(var i=0;i<xLine.length;i++){
      ctx.font = "12pt Tahoma";
      ctx.textAlign = "left";
      ctx.textBaseline = 'middle';
      var a=xLine[i];
      var b=470;
      ctx.fillStyle = "#000000";
      ctx.fillText(text[i], a,b);
    }
  }


  },
  setData:function(data,type,animate){
    this.data=data;
    this.type=type;
    this.animate=animate;
  },
  initChart:function (id) {
    var chart=document.getElementById(id);
    chart.innerHTML='';
    var canv=document.createElement('canvas');
    var chartId=generateUnicalId(id);
    canv.id=chartId;
    canv.width=640;
    canv.height=480;
    chart.appendChild(canv);
    var ctx = canv.getContext('2d');
    this.drawChart(ctx);

    function generateUnicalId (id){//герерируем уникальный id
      return id +"_"+ Math.random().toString(36).substr(2, 9);
    }
  }
};