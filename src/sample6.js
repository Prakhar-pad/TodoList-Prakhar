var a=88;

if(a<=70){
    return "OK";
}
var b=a-70;

var c=parseInt(b/5);

if(c<=12){
    console.log("Points:"+c)
}
else{
   return 'License suspended';
}
