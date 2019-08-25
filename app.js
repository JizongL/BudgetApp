// BUDGET CONTROLLER 
var budgetController =(function(){
    // some code
    var Expense = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    }

    var Income = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;

    }

    Expense.prototype.calcPercentage = function(totalIncome){
        if(totalIncome>0){
            this.percentage = Math.round((this.value/totalIncome)*100)
        }else{
            this.percentage = -1;
        }
        
    };

    Expense.prototype.getPercentage = function(){
        return this.percentage
    };

    var calculateTotal = function(type){
        var sum = 0;
        data.allItems[type].forEach(function(cur){
            sum = sum + Number(cur.value);
        });
        data.totals[type]=sum;
    };



    var data = {
        allItems:{
            exp:[],
            inc:[]
        },
        totals:{
            exp:0,
            inc:0
        },
        budget:0,
        percentage:-1      
    };

    return{
        addItem:function(type,des,val){
            var newItem,ID;
                       

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
            
            data.allItems[type].push(newItem);
            return newItem;
        },

        deleteItem:function(type,id){
            console.log('ran delteItem',type,id)
            var ids,index;
            ids = data.allItems[type].map(function(cur){
                return cur.id
            })

            index = ids.indexOf(id);
            console.log(ids,index,'test ids,index')
            if(index!== -1){
                data.allItems[type].splice(index,1);
            }

        },

        calculateBudget:function(){
           // calculate total income and expenses 
           calculateTotal('exp');
           calculateTotal('inc');
           // calculate the budget: income - expense 
            data.budget = data.totals.inc - data.totals.exp;
           // calcuate the percentage of income that we spent. 
           if(data.totals.inc>0){
                data.percentage = Math.round((data.totals.exp / data.totals.inc)*100);
           }else{
               data.percentage = -1;
           }
            




            // var expensesTotal,budgetTotal
            // var incomeTotal=0;
            // // calculate income total
            // for(item of data.allItems['inc']){
            //     console.log(item,item.value,'test item')
            //     incomeTotal+=Number(item.value)
            // }
            // console.log(incomeTotal,'test income total')

            // // calculate expense total 

            // // calculate budget income - budget 
        },
        calculatePercentage:function(){
            /*
            a = 20
            b = 10
            c = 40
            */
            data.allItems.exp.forEach(function(cur){
                cur.calcPercentage(data.totals.inc);
            })
        },
        getPercentages:function(){
            var allPerc = data.allItems.exp.map(function(cur){
                return cur.getPercentage();
            })
            return allPerc;
        },
        getBudget:function(){
            return {
                budget:data.budget,
                totalInc:data.totals.inc,
                totalExp:data.totals.exp,
                percentage:data.percentage}
        },
        testing:function(){
            console.log(data,'test')
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
        expensesContainer:'.expenses__list',
        budgetLabel:'.budget__value',
        incomeLabel:'.budget__income--value',
        expensesLabel:'.budget__expenses--value',
        percentageLabel:'.budget__expenses--percentage',
        container:'.container',
        expensesPercLabel:'.item__percentage',
        dateLabel:'.budget__title--month'
    };
    var formatNumber=function(num,type){
        /*
        + or - before number
        exactly 2 decimal points
        comma separating the thousands
        2310.4567-> +2,310.46
        2000 -> +2,000.00
        */
       num = Math.abs(num);
       num = num.toFixed(2);
       numSplit = num.split('.');
       int = numSplit[0];
       if(int.length>3){
           int = int.substr(0, int.length-3) + ',' + int.substr(int.length-3,int.length);
       }
       dec = numSplit[1]
       return (type==='exp'?'-':'+')+' '+ int + '.'+ dec;
    };
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

                html = `<div class="item clearfix" id="inc-${obj.id}">
                    <div class="item__description">${obj.description}</div>
                        <div class="right clearfix">
                            <div class="item__value">${formatNumber(obj.value,type)}</div>
                                <div class="item__delete">
                                    <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                                </div>
                            </div>
                        </div>`
            }else if(type==='exp'){
                element=Domstrings.expensesContainer;
                html = ` <div class="item clearfix" id="exp-${obj.id}">
                <div class="item__description">${obj.description}</div>
                <div class="right clearfix">
                    <div class="item__value">${formatNumber(obj.value,type)}</div>
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
        deleteListItem:function(selectedID){
            var el = document.getElementById(selectedID)
            el.parentNode.removeChild(el)
        },
        displayBudget:function(obj){
            var type;
            obj.budget > 0? type='inc':type='exp';
            document.querySelector(Domstrings.budgetLabel).textContent = formatNumber(obj.budget,type);
            document.querySelector(Domstrings.incomeLabel).textContent = formatNumber(obj.totalInc,type);
            document.querySelector(Domstrings.expensesLabel).textContent = formatNumber(obj.totalExp,type);            
            
            if(obj.percentage > 0){
                document.querySelector(Domstrings.percentageLabel).textContent = obj.percentage+'%';
            }else{
                document.querySelector(Domstrings.percentageLabel).textContent = '---';
            }
        },
        displayPercentages:function(percentages){
            console.log('displayPercentages ran')
            var fields = document.querySelectorAll(Domstrings.expensesPercLabel);
            console.log(fields)
            var nodeListForEach=function(list,callback){
                for(var i = 0; i < list.length;i++){
                    callback(list[i],i)
                }
            };
            nodeListForEach(fields, function(current,index){
                // do something
                
                if(percentages[index]>0){
                    current.textContent = percentages[index]+'%';
                }else{
                    current.textContent = '---';
                }
            })

        },
        displayMonth:function(){
            var now,year,months,month;
            now = new Date();
            // var christmas = new Date(2019,11,25);
            year = now.getFullYear();
            months = ['January','February','March','April','May','June','July',
            'August','September','October','November','December']
            month = now.getMonth();
            document.querySelector(Domstrings.dateLabel).textContent = months[month] + ' ' + year;
        },
        getDOMstrings:function(){
            return Domstrings;
        }
    };
})();


// Gobal app controller 
var controller = (function(budgetCtrl, UIctrl){
    var setupEventListeners = function(){
        var DOM = UIctrl.getDOMstrings()
        document.querySelector(DOM.inputBtn).addEventListener('click',ctrlAddItem);

        document.addEventListener('keypress',function(event){
            if(event.keyCode===13 || event.which===13){
                ctrlAddItem();
            }
        });
        document.querySelector(DOM.container).addEventListener('click',ctrlDeleteItem);
    };

    var updateBudget = function(){
        // 1: Calculate the budget 
        budgetCtrl.calculateBudget();
        // 2: return the budget 
        var budget = budgetCtrl.getBudget()
        // 5: Display the budget on the UI
        UIctrl.displayBudget(budget)
    };

    var updatePercentages = function(){
        // 1. Calculate percentages
        budgetCtrl.calculatePercentage();
        // 2. Read percentages from the budget controller. 
        var percentages = budgetCtrl.getPercentages()
        console.log(percentages)
        // 3. Update the UI with the new percentages 
        UIctrl.displayPercentages(percentages)
    };

    var ctrlAddItem = function(){
        // 1: Get the field input data 
        var input = UIctrl.getInput();
               
        // 2: Add the item to the budget controller 
        var newItem = budgetCtrl.addItem(input.type,input.description,input.value); 
        
        // 3: Add the item to the UI
        UIctrl.addListItem(newItem,input.type);

        // 4: Clear the input fields
        UIctrl.clearFields();
        
        // 5. Calculate and update budget
        updateBudget();
        
        // 6. calculate and update percentage 
        updatePercentages()
        
    }
    
    var ctrlDeleteItem = function(event){
        var itemID,splitID,type,ID;
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
        
        if(itemID){
            splitID = itemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]);
            console.log(splitID,type,ID)
            // 1: delete the item from data structure. 
            budgetCtrl.deleteItem(type,ID)
            // 2. Delete the item from the UI
            UIctrl.deleteListItem(itemID)
            // 3. Update and show the new budget. 
            updateBudget()
            // 4. calculate and update percentage 
        updatePercentages()

        }
    }
    return{
        init:function(){
            console.log('application started')
            setupEventListeners();
            // reset display budget 
            UIctrl.displayBudget(
                {budget:0,
                totalInc:0,
                totalExp:0,
                percentage:-1
            });
            UIctrl.displayMonth()
        }
    }


})(budgetController,UIController);

controller.init();