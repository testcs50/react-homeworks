//Task 1

const loop = (times=0, callback=null) => {
    if (callback) {
        for (let i = 0; i < times; i++) callback();
    }
}

//Task 2

const calculateArea = (figure, a, b) => {
    let area = 0;

    if (figure === 'triangle') {
        area = (a * b) / 2;
    }
    else if (figure === 'quadrangle') {
        area = a * b;
    }
    else {
        area = 'Unknown figure. Please select a triangle or quadrangle.';
    }

    return {
        area,
        figure,
        input: { a, b }
    }
}

//Task 3

class Human {
    constructor(params) {
        this.name = params.name;
        this.dateOfBirth = new Date(params.dateOfBirth);
    }

    get age() {
        return Math.floor((Date.now() - this.dateOfBirth) / 1000 / 60 / 60 / 24 / 365);
    }

    displayInfo() {
        return `Name: ${this.name}\nDay of birth: ${this.dateOfBirth.getDate()}.${this.dateOfBirth.getMonth() + 1}.${this.dateOfBirth.getFullYear()}`;
    }
}

class Employee extends Human {
    constructor(params) {
        super(params);

        this.salary = params.salary;
        this.department = params.department;
    }

    displayInfo() {
        return `${super.displayInfo()}\nSalary: ${this.salary}\nDepartment: ${this.department}`;
    }
}

class Manager extends Employee {
    constructor(params) {
        super(params);

        this.staff = [];
    }

    hireEmployee(man) {
        this.staff.push(man);
        man.manager = this;
    }

    fireEmployee(man) {
        man.manager = null;
        this.staff = this.staff.filter(item => item !== man);
    }

}

class Developer extends Employee {
    constructor(params) {
        super(params);

        this._manager = null;
    }

    changeManager(newManager) {
        this._manager && this._manager.fireEmployee(this);
        newManager.hireEmployee(this);
    }

    set manager(man) {
        this._manager = man;
    }

}

//Task 4

const promisesArray = []

for (let i = 1; i <= 10; i++) {
    promisesArray.push(
        fetch(`https://jsonplaceholder.typicode.com/users/${i}`)
    );
}

promisesArray.forEach(item => {
    item.then(response => console.log(response.json()))
        .catch(err => {
            throw new Error(err);
        });
});