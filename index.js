
let balance=document.querySelector('.balance-card')
let currentAmount=document.querySelector('.current-amount')
let expense=document.querySelector('.expense')
let resetBtn=document.querySelector('.reset-btn')
let expenseBtn=document.querySelector('.add-expense-btn')
let updateBtn=document.querySelector('.update-btn')
let listContainer=document.querySelector('.expense-list')
let income=document.querySelector('.income')
let expenseAmt=document.querySelector('.expense-amt')
let expenseTitle=document.querySelector('.expense-title')
let expenseDesc=document.querySelector('.expense-desc')
let expenseDate=document.querySelector('.date')


let incomekey
let incomeState
if (getdatafromStorage('expenses') === null) {
    return
  }
  else{
    displayData()
  }

document.querySelector('.add-budget-btn').addEventListener('click',function(){
    balance.innerHTML=`your balance is ksh ${Number(income.value)}}`
    currentAmount.innerHTML=`current amount ksh ${Number(income.value)}`
    amtStr=currentAmount.innerText
    incomeState=Number(income.value)
    addtoStorage('incomekey',incomeState)
    addtoStorage('curramt',incomeState)
    let incomeAmount=getdatafromStorage('incomekey')
    income.value=''
})

let storeExpense=[]
let expenseObj={}
function addExpense(){

    document.querySelector('.add-expense-btn').addEventListener('click',function(){
        
        expenseObj.title=expenseTitle.value
        expenseObj.description=expenseDesc.value
        expenseObj.amount=expenseAmt.value
        expenseObj.date=expenseDate.value

        storeExpense.push(expenseObj)
        if(!localStorage.getItem('expenses')){
            addtoStorage('expenses',JSON.stringify(storeExpense))
        }
        else{
            let data=JSON.parse(getdatafromStorage('expenses'))
              data.push(expenseObj)
              addtoStorage('expenses',JSON.stringify(data))
        }
        let data=JSON.parse(getdatafromStorage('expenses'))
        let totalExpense=data.reduce((n, {amount}) =>n + Number(amount), 0)

        let currIncome=getdatafromStorage('incomekey')
           curramtData=currIncome-totalExpense
           addtoStorage('curramt',curramtData)
        let curramt=getdatafromStorage('curramt')
        let html
        data.forEach((obj)=>{
            
             html= ` <li data-expense="${obj.amount}">
            <div class="title-desc"><p class="title">${obj.title}</p>
            <p class="description">${obj.description}</p></div>
            <div class="amt-date"><p class="amount">${obj.amount}</p>
                <p class="date">${obj.date}</p></div>
                <div class="update-delete-btn"><button class="update-btn">update</button>
                    <button class="delete-btn">delete</button></div>
        </li> `
            
        })
        listContainer.insertAdjacentHTML('beforeend',html)
        expense.innerHTML=`your expense:ksh ${totalExpense}`
        currentAmount.innerHTML=`current amount: ksh ${curramt}`
        expenseTitle.value=''
        expenseDesc.value=''
        expenseAmt.value=''
        expenseDate.value=''
        amtStr=currentAmount.innerText
    })
    
    deleteExpense()
    
}

addExpense()
function displayData(){
    let incomeAmount=getdatafromStorage('incomekey')
    let data=JSON.parse(getdatafromStorage('expenses'))
    console.log(data)
    let totalExpense=data.reduce((n, {amount}) =>n + Number(amount), 0)
    
    let curramt=getdatafromStorage('curramt')
    data.forEach((obj)=>{
        
        let html= ` <li data-expense="${obj.amount}">
        <div class="title-desc"><p class="title">${obj.title}</p>
        <p class="description">${obj.description}</p></div>
        <div class="amt-date"><p class="amount">${obj.amount}</p>
            <p class="date">${obj.date}</p></div>
            <div class="update-delete-btn"><button class="update-btn">update</button>
                <button class="delete-btn">delete</button></div>
    </li> `
        listContainer.insertAdjacentHTML('beforeend',html)
    })
    expense.innerHTML=`your expense:ksh ${totalExpense}`
    currentAmount.innerHTML=`current amount: ksh ${curramt}`
    balance.innerHTML=`your balance is ksh ${incomeAmount}`
}

function deleteExpense(){
    listContainer.addEventListener('click',function(e){
    let deleteBtn=e.target.classList.contains('delete-btn')
    if(!deleteBtn){
        return 
    }
    else{
        e.target.parentElement.parentElement.remove()
        let targetEl=e.target.parentElement.parentElement
        let titleTarget=targetEl.querySelector('.title').innerText
        let data=JSON.parse(getdatafromStorage('expenses'))
        let filteredData=data.filter(obj => obj.title != titleTarget);
        addtoStorage('expenses',JSON.stringify(filteredData))
        let totalExpense=filteredData.reduce((n, {amount}) =>n + Number(amount), 0)
        let currIncome=getdatafromStorage('incomekey')
        curramtData=currIncome-totalExpense
        addtoStorage('curramt',curramtData)
     let curramt=getdatafromStorage('curramt')
        expense.innerHTML=`your expense:ksh ${totalExpense}`
        currentAmount.innerHTML=`current amount: ksh ${curramt}`
       
    }
    

})
}
let title
let desc
let amt
let date
let curramt
let currExpense
let updatedExpense
let totalExpense
let prevExpense
let updateTarget
document.querySelector('.update-expense-btn').addEventListener('click',function(e){
        
        let titleTarget=expenseTitle.value
        
        let data=JSON.parse(getdatafromStorage('expenses'))
       
        //Find index of specific object using findIndex method.    
        objIndex = data.findIndex((obj => obj.title == titleTarget));

        data[objIndex].title=expenseTitle.value
        data[objIndex].description=expenseDesc.value
        data[objIndex].amount=expenseAmt.value
        data[objIndex].date=expenseDate.value
        addtoStorage('expenses',JSON.stringify(data))
         let totalExpense=data.reduce((n, {amount}) =>n + Number(amount), 0)
        let currIncome=getdatafromStorage('incomekey')
        curramtData=currIncome-totalExpense
        addtoStorage('curramt',curramtData)
        let curramt=getdatafromStorage('curramt')
    updateTarget.querySelector('.title').innerText=expenseTitle.value
    updateTarget.querySelector('.description').innerText=expenseDesc.value
    updateTarget.querySelector('.amount').innerText=expenseAmt.value
    updateTarget.querySelector('.date').innerText=expenseDate.value

        expense.innerHTML=`your expense:ksh ${totalExpense}`
        currentAmount.innerHTML=`current amount: ksh ${curramt}`
        
        
        expenseTitle.value=''
        expenseDesc.value=''
        expenseAmt.value=''
        expenseDate.value=''
        
})
    listContainer.addEventListener('click',function(e){
        let updateBtn=e.target.classList.contains('update-btn')
        let targetParent=e.target.parentElement.parentElement
        updateTarget=e.target.parentElement.parentElement
        
         

        if(!updateBtn){
            return 
        }
        else{
             title=document.querySelector('.title')
             desc=document.querySelector('.description')
             amt=document.querySelector('.amount')
             date=document.querySelector('.date')

        expenseTitle.value=targetParent.querySelector('.title').innerText
        expenseDesc.value=targetParent.querySelector('.description').innerText
        expenseAmt.value=targetParent.querySelector('.amount').innerText
        expenseDate.value=targetParent.querySelector('.date').innerText


        }
        
    
    })
    resetBtn.addEventListener('click',function(e){
        income.value=''
        expenseTitle.value=''
        expenseDesc.value=''
        expenseAmt.value=''
        expenseDate.value=''

        expense.innerHTML= `your expense:ksh 0 `
        currentAmount.innerHTML= `current amount: ksh 0 `
        balance.innerHTML = `Your balance is ksh 0 `
        listContainer.innerHTML = ''

    })

    function addtoStorage(key,value){
      localStorage.setItem(key,value)
    }

    function getdatafromStorage(key){
        let data=localStorage.getItem(key)
        return data
        // if(!Array.isArray(data)){
        //     return data
        // }
        // else{
        //     return data[0]
        // }
        
    }





