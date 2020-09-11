
class Expense {
    constructor(id,des,value,elementID){
    this.id = id
    this.des = des
    this.value = value
    this.elementID = elementID
    }
}

class Income{
    constructor(id,des,value,elementID){
    this.id = id
    this.des = des
    this.value = value
    this.elementID = elementID
    }

}
new Vue({
    el: 'main',
    data:{
        red: false,
        budData: {
            allItems : {
                exp:[],
                inc:[]
            },
            tottals:{
                exp:0,
                inc:0,
                bud:0,
                exPercentage:'--'
            }
        }
        
    },
    methods: {
        addItems: function(){
            let newItem,id,type,des,value, elementID, typeElement, desElement, valueElement;
            typeElement = document.querySelector('.add__type')
            desElement = document.querySelector('.add__description')
            valueElement = document.querySelector('.add__value')
            type = typeElement.value
            des = desElement.value
            value = Number(valueElement.value)
            if(des !== '' && !isNaN(value) && value > 0){
                // if there are items in the array of entered type ('exp' || 'inc') the id of the new item will be the last item id + 1
                if(this.budData.allItems[type].length > 0){
                    id = this.budData.allItems[type][this.budData.allItems[type].length-1].id + 1;
                }else
                // if there are no items in the array of entered type ('exp' || 'inc') the id of the new item will be 0
                {
                    id = 0
                }
                //the id of the html tag
                elementID = type + '-' + id
                if(type==='inc')
                {
                    newItem = new Income(id,des,value,elementID)
                }else
                {
                    newItem = new Expense(id,des,value,elementID)
                }
                // push the newItem into the type ('exp' || 'inc') array and update tottals and percentages
                this.budData.allItems[type].push(newItem)
                this.calcTottals(type)
                this.updatePercentages(Number(this.budData.tottals.inc))
                this.calcExpensesPercentage()
                desElement.value = ''
                valueElement.value = ''
                desElement.focus()
            }
        },
        calcTottals: function(type){
            this.budData.tottals[type]=0
            this.budData.allItems[type].forEach(el => {
                this.budData.tottals[type] += el.value
            });
            this.budData.tottals.bud = this.budData.tottals.inc - this.budData.tottals.exp          
        },
        calcExpensesPercentage: function(){
            let percentage;
            if(this.budData.tottals.inc > 0){
                percentage = Math.round((this.budData.tottals.exp*100)/this.budData.tottals.inc)
                this.budData.tottals.exPercentage = percentage;
            }else{
                this.budData.tottals.exPercentage = 0;
            }

            if(this.budData.tottals.exPercentage > 0){
                this.budData.tottals.exPercentage = this.budData.tottals.exPercentage + '%'
            }else{
                this.budData.tottals.exPercentage = '--'
            }
            
        },
        updatePercentages: function(inc){
            this.budData.allItems.exp.map(function(el){
                el.percentage = Math.round((el.value*100)/inc) + '%'
            })
        },
        viewMinus: function(i,type){
            let op
            if (type==='inc' || type==='bud'){
                if(i > 0){
                    op = '+'
                }else{
                    op = ''
                }
            }else{
                if(i > 0){
                    op = '-'
                }else{
                    op = ''
                }
            }
            return op + i
        },
        deleteItem: function(e){
            let ids, index, elementID, splitID, type, id;
            elementID = e.target.parentNode.parentNode.parentNode.parentNode.id
            console.log(elementID)
            if(elementID){
                splitID = elementID.split('-');
                type = splitID[0]
                id = parseInt(splitID[1])
            }
            ids = this.budData.allItems[type].map((cur)=>{
                return cur.id;
            })
            index = ids.indexOf(id)
            if(index !== -1){
                this.budData.allItems[type].splice(index, 1)
            }
            this.calcTottals(type)
            this.calcExpensesPercentage()
        }
        
    }
})