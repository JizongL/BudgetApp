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
        allItems:{
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
            

            // if (data.allItems[type].length > 0) {
            //     ID  += 1;
            // } else {
            //     ID = 0;
            // }

            if(data.allItems[type].length>0){
                ID = data.allItems[type][data.allItems[type].length-1].id+1;
            }else{
                ID = 0;
            }
            
            if (type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val);
            }
            console.log(newItem,'test new')
            data.allItems[type].push(newItem);
            return newItem;
        },
        calculateBudget:function(){
            var expensesTotal,budgetTotal
            var incomeTotal=0;
            // calculate income total
            for(item of data.allItems['inc']){
                console.log(item,item.value,'test item')
                incomeTotal+=Number(item.value)
            }
            console.log(incomeTotal,'test income total')

            // calculate expense total 

            // calculate budget income - budget 


        }
    };    
})();



var UIController = (function(){
    // some code 
    var Domstrings = {
        inputType:'.add__type',
        inputDescription:'.add__description',
        inputValue:'.add__value',
        inputBtn:'.add__btn',
        incomeContainer:'.income__list',
        expensesContainer:'.expenses__list'
    }
    return {
        getInput:function(){            
            return{ 
              type: document.querySelector(Domstrings.inputType).value,// will be either inc or exp 
              description: document.querySelector(Domstrings.inputDescription).value,
              value: document.querySelector(Domstrings.inputValue).value,
            };            
        },
        addListItem: function(obj,type){
            var html,newHtml,element;
            // Create html string with palce holder text. 
            if(type==='inc'){
                element=Domstrings.incomeContainer;

                html = `<div class="item clearfix" id="income-${obj.id}">
                    <div class="item__description">${obj.description}</div>
                        <div class="right clearfix">
                            <div class="item__value">${obj.value}</div>
                                <div class="item__delete">
                                    <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                                </div>
                            </div>
                        </div>`
            }else if(type==='exp'){
                element=Domstrings.expensesContainer;
                html = ` <div class="item clearfix" id="expense-${obj.id}">
                <div class="item__description">${obj.description}</div>
                <div class="right clearfix">
                    <div class="item__value">${obj.value}</div>
                    <div class="item__percentage">21%</div>
                    <div class="item__delete">
                        <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                    </div>
                </div>
            </div>`
            }
            
           
            

            // replace placeholder text with actual data. 
                // newHtml = html.replace('%id%',obj.id)
                // newHtml = newHtml.replace('%description%',obj.description)
                // newHtml = newHtml.replace('%value%',obj.value)
            // I nsert the HTML to the DOM 
            document.querySelector(element).insertAdjacentHTML('beforeend',html);
        },
        clearFields:function(){
            var fields, fieldsArr;
            fields = document.querySelectorAll(Domstrings.inputDescription+', '
                +Domstrings.inputValue);
            fieldsArr = Array.prototype.slice.call(fields)
            fieldsArr.forEach(function(current, index, array){
                current.value = "";
            })
            fieldsArr[0].focus();
            // console.log(typeof fields, fields,'test field type')    
        },
        getDOMstrings:function(){
            return Domstrings;
        }
    };
})();


// Gobal app controller 
var controller = (function(budgetCtrl, UIctrl){
    
    var ctrlAddItem = function(){
        // 1: Get the field input data 
        var input = UIctrl.getInput();
               
        // 2: Add the item to the budget controller 
        newItem = budgetCtrl.addItem(input.type,input.description,input.value) 
        
        // 3: Add the item to the UI
        UIctrl.addListItem(newItem,input.type)

        // 4: Calculate the budget 
        UIctrl.clearFields()
        // budgetCtrl.calculateBudget()
        
        // 5: Display the budget on the UI
        // console.log(UIctrl,'test function')
    }
    
    document.querySelector('.add__btn').addEventListener('click',ctrlAddItem);

    document.addEventListener('keypress',function(event){
        if(event.keyCode===13 || event.which===13){
            ctrlAddItem();

        }
    })


})(budgetController,UIController);

