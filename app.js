// BUDGET CONTROLLER 
var budgetController =(function(){
    // some code
    var Expense = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    }

    var Income = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    }

    var data = {
        allItem:{
            exp:[],
            inc:[]
        },
        totals:{
            exp:0,
            inc:0
        }        
    };
    return{
        addItem:function(type,des,val){
            var newItem,ID;
            ID = 0;
            if(type==='exp'){
                newitem = new Expense(ID,des, val);
            }else if(type==='inc'){
                newitem = new Income(ID,des, val);
            }
            return newItem;
        }
    };    
})();



var UIController = (function(){
    // some code 
    var Domstrings = {
        inputType:'.add__type',
        inputDescription:'.add__description',
        inputValue:'.add__value',
        inputBtn:'.add__btn'
    }
    return {
        getInput:function(){            
            return{ 
              type: document.querySelector(Domstrings.inputType).value,// will be either inc or exp 
              description: document.querySelector(Domstrings.inputDescription).value,
              value: document.querySelector(Domstrings.inputValue).value,
            };            
        }
    };
})();


// Gobal app controller 
var controller = (function(budgetCtrl, UIctrl){
    
    var ctrlAddItem = function(){
        // 1: Get the field input data 
        var input = UIctrl.getInput();
        console.log(input,'test');
        // 2: Add the item to the budget controller 

        // 3: Add the item to the UI

        // 4: Calculate the budget 

        // 5: Display the budget on the UI
        console.log(UIctrl,'test function')
    }
    
    document.querySelector('.add__btn').addEventListener('click',ctrlAddItem);

    document.addEventListener('keypress',function(event){
        if(event.keyCode===13 || event.which===13){
            ctrlAddItem();

        }
    })


})(budgetController,UIController);

