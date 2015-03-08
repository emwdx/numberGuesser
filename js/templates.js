

var pageIndex = ReactiveVar(1);

var inputValue1 = ReactiveVar(2);
var inputValue2 = ReactiveVar(-1);
var inputValue3 = ReactiveVar(3);
var guessedComputerRule = ReactiveVar(false);
var computerRuleSubmitted = ReactiveVar(false);

var calculator;
var inputGuesses = [inputValue1,inputValue2,inputValue3]

var x1 = [-6,-5,-4,-3,-2,-1,0,1,2,3,4,5];

var coefficients;

Template.currentPage.helpers({
is1: function(){
    
return (pageIndex.get()==1);    
    
},
is2: function(){
    
return (pageIndex.get()==2);    
    
},
is3: function(){
    
return (pageIndex.get()==3);    
    
},
is4: function(){
    
return (pageIndex.get()==4);    
    
}
      
    
});

Template.buttonBar.events({
   
'click #next':function(){
    
 var currentValue = pageIndex.get();
 if((currentValue !=4)){pageIndex.set(currentValue+1);}
 
    
},
'click #back':function(){
    
 var currentValue = pageIndex.get();
 if((currentValue !=1)){pageIndex.set(currentValue-1);}
 
    
}
    
});

Template.main.helpers({
    
calculator:function(){
    
 return '<div id="calculator" style="width: 300px; height: 300px;"></div>';   
    
}
    
});

Template.makeGuess.helpers({
    
   output: function(){
       
    var guess = this.get();
    return (coefficients[0]*guess+coefficients[1]);
       
       
   },
 currentVal: function(){
     
  return this.get();   
 }
    
});

Template.makeGuess.events({
    
 'change .inputNumber':function(e){
     
  this.set(parseInt($(e.target).val())); 
     
 }
    
});

Template.guessComputerRule.events({
    
   
    'click #submitGuessComputerRule':function(){
     var inputRule = $("#guessComputerRuleInput").val().replace(/number/gi,'m');
     enteredExpression ="y_2="+ inputRule;   
     calculator.setExpression({id:"guessComputerRule",latex:enteredExpression});
     functionValue = calculator.HelperExpression({latex:"y_2"});
     mValue = calculator.HelperExpression({latex:"m"});
     y1L=[];
     
    
        
     var i = 0;           
     function update(i){
     mExpression = "m="+String(x1[i]);
     calculator.setExpression({id:"inputValue",latex:mExpression});
              
     }
        
      
        
     mValue.observe('numericValue',function(){
         
     y1L.push(functionValue.numericValue); 
         
     
     console.log(y1L);
         
      i += 1;
      if(i <x1.length){
          
       update(i);
          
      }      
     
         
     });
     update(i);
     
     
  
        
     /*    
     y1 = generateLinearValues(x1,[0,0,coefficients[0],coefficients[1]);
     var x1L = generateLatexList(x1,'x');
     var y1L = generateLatexList(y1,'y');
     calculator.setExpression({id:"xTestValues",latex:x1L});
     calculator.setExpression({id:"yTestValues",latex:y1L});
     
     var guessCoefficients = getRegressionParameters("guessComputerRegression");
     console.log(guessCoefficients);
     y2 = generateLinearValues(x1,[guessCoefficients.c,guessCoefficients.d]);
     var guessedCorrectly = arraysEqual(y1,y2);
     guessedComputerRule.set(guessedCorrectly);
     */
        
    }
    
    
});

Template.slide2.helpers({
    
   inputGuess:function(){
       
    return inputGuesses;   
       
   }
    
});

Template.slide3.helpers({
    
   guessedCorrectly:function(){
    
    return guessedComputerRule.get();
       
   },
    submittedGuess: function(){
        
      return computerRuleSubmitted.get();   
        
    }
    
});

Template.main.rendered = function(){
    
 var elt = document.getElementById('calculator');
 var showExpressions = true;
 calculator = Desmos.Calculator(elt,{expressions:showExpressions});
 
 coefficients = makeRandomLinear();
 var equation = 'y='+String(coefficients[0])+'x+'+String(coefficients[1]);    
  calculator.setExpression({id:'graph1', latex:equation});
  calculator.setExpression({id:"guessComputerRegression",latex:"y_1~a(x_1)^3+b(x_1)^2+c(x_1)+d"});
    
}

var makeRandomLinear = function(){
    
 var a = Math.round(Math.random()*10)-5;
 var b = Math.round(Math.random()*6)-3;
 
return [a,b];    
    
}

var getValue = function(x,coefficients){
    
return (coefficients[0]*x + coefficients[1]);    
    
}

var generateLinearValues = function(xValues,coef){
var yValues = []    
xValues.forEach(function(x){
    
var y = coef[0]*x*x*x + coef[1]*x*x+coef[2]*x+coef[3];
yValues.push(Math.round(y));
    
});

return yValues;
    
}

var generateLatexList = function(array,vbl){
    
var exp = vbl + "_1=\\left[";    
array.forEach(function(x){

exp = exp + String(x)+',';    
    
});
exp = exp.slice(0,exp.length-1);
exp += "\\right]";
return exp;
    
}

var getRegressionParameters = function(expressionId){
    
 var a = calculator.getState();
 var expressionArray = a.expressions.list;
 var output={};
 expressionArray.forEach(function(exp){
  
 if(exp.id==expressionId){
     
     output = exp.regressionParameters;
    
 }
  
    
 });
 return output;   
    
}

var arraysEqual = function(a,b){
    
for(var i = 0;i<a.length;i++){
    
    if(a[i]!=b[i]){
        
        return false;
    
       }
    
    
}
return true;
}

var evalExpressionFromTable=function(){
    
    
    
    
}
