function orderTasksBy (orderBy) {
    return function(Task1, Task2) {  
        
        //Order by creationDate or expirationDate    
        if (orderBy === "expirationDate") {
            if (new Date(Task1[orderBy]) < new Date(Task2[orderBy]) ) {  
                return -1;  
            } else {  
                return 1;  
            } 
        //Order by task state
        } else if (orderBy === "currentState") {
            const today = new Date();

            const state = {
                "expire" : 3,
                "toDo": 2,
                "completed": 1,
            }
            
            var stateTask1 = state["toDo"], stateTask2 = state["toDo"];

            if (Task1["completed"]) {
                stateTask1 = state["completed"];
            } else if ((new Date(Task1["expirationDate"]) - today) >= 0) {
                stateTask1 = state["toDo"];
            } else {
                stateTask1 = state["expire"]
            }

            if (Task2["completed"]) {
                stateTask2 = state["completed"];
            } else if ((new Date(Task2["expirationDate"]) - today) >= 0) {
                stateTask2 = state["toDo"];
            } else {
                stateTask2 = state["expire"]
            }
    
            if (stateTask1 > stateTask2) {  
                return -1;  
            } else {  
                return 1;  
            } 

        //Default order by "creationDate"
        } else {
            if (new Date(Task1["creationDate"]) > new Date(Task2["creationDate"]) ) {  
                return -1;  
            } else {  
                return 1;  
            }  
        }  
    }  
}

module.exports = { orderTasksBy };