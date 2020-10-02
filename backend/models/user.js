export default class User {
    constructor(username){
        this.username = username;
        this.calories = 0;
        this.points = this.calories / 50;
        
    }

    toJson(){
        return JSON.parse(JSON.stringify(this))
    }

    getPoints(){
        return this.points;
    }

    getCalories(){
        return this.calories;
    }
}