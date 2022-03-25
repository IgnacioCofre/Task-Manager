function orderTasksBy (orderBy) {
    return function(Task1, Task2) {  
        //Order by creationDate or expirationDate
        if ( orderBy === "creationDate" || orderBy === "expirationDate" ) {
            if (new Date(Task1[orderBy]) < new Date(Task2[orderBy]) ) {  
                return -1;  
            } else {  
                return 1;  
            } 
        //Order by task state
        } else if (orderBy === "currentState") {
            const today = new Date();
            const stateTask1 = today - new Date(Task1["expirationDate"]);
            const stateTask2 = today - new Date(Task2["expirationDate"]);
    
            if (stateTask1 > stateTask2) {  
                return -1;  
            } else {  
                return 1;  
            } 
        //Default order by "creationDate"
        } else {
            if (new Date(Task1["creationDate"]) < new Date(Task2["creationDate"]) ) {  
                return -1;  
            } else {  
                return 1;  
            }  
        }  
    }  
}

module.exports = { orderTasksBy };