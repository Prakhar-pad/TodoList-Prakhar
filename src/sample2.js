var arr=[1, 1, 1, 1, -3, -4];

var p=[];
var n=[];

for(var i=0; i<arr.length;i++){

 
    if(arr[i]>0){

        if(p.length==0){
            p.push(arr[i]);
        }
        else{
        for(var j=0;j<p.length;j++){
            if(arr[i]=p[j]){
                p.push(arr[i]);
            }
        }
    }
    }
    else{
        if(n.length==0){
            n.push(arr[i]);
        }
        else{
        for(var j=0;j<n.length;j++){
            if(arr[i]!=n[j]){
                n.push(arr[i]);
            }
        }
    }
    }
}
console.log(p);
console.log(n);

