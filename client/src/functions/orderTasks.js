function orderByCreationDate(creationDate) {
    return function(Task1, Task2) {  
        //console.log(creationDate)
        if (new Date(Task1[creationDate]) < new Date(Task2[creationDate]) ) {  
            //console.log(`${Task1[creationDate]} < ${Task2[creationDate]}`)
            return -1;  
        } else {  
            return 1;  
        }  
    }  
}

function orderByExpirationDate(expirationDate) {
    return function(Task1, Task2) {  
        if (Task1[expirationDate] > Task2[expirationDate]) {  
            return 1;  
        } else {  
            return -1;  
        }  
    }  
}

// ordenar por estado

module.exports = { orderByCreationDate, orderByExpirationDate};