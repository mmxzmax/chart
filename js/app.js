/**
 * Created by max on 14.04.2017.
 */
"use strict";

var data=[['яблоко','груша','лимон','fgtkmcby','fff'],[5,15,6,10,25],['#f00','#0012ff','#00ff0a','blue','green']];

var myChart=new chart();

myChart.setData(data,'linear',true);

myChart.initChart('newCart');


var myBar=new chart();

myBar.setData(data,'bar',true);

myBar.initChart('newBar');

var myPie=new chart();

myPie.setData(data,'pie',true);

myPie.initChart('newPie');



