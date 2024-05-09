// Student management system

import inquirer from "inquirer";

const randomNumber: number = Math.floor(10000 + Math.random() * 90000);

let myBalance: number = 0;

let answer = await inquirer.prompt([
    {
        type: "input",
        name: "student",
        message: "Enter Student Name",
        validate: function (value) {
            if (value.trim() !== "") {
                return true;
            }
            return "Please enter a non-empty value";
        },
    },
    {
        type: "list",
        name: "courses",
        message: "Select the course to enroll",
        choices: ["MS.office", "HTML", "CSS", "TYPESCRIPT", "PYTHON"]
    }
]);

const tutionFees: { [key: string]: number } = {
    "MS.office": 2000,
    "HTML": 2000,
    "CSS": 2000,
    "TYPESCRIPT": 2000,
    "PYTHON": 2000
};

console.log(`\nTuition Fees: ${tutionFees[answer.courses]}\n`);
console.log(`Balance: ${myBalance}\n`);

let paymentType = await inquirer.prompt([
    {
        type: "list",
        name: "paymentType",
        message: "Select the payment type",
        choices: ["CASH", "CARD", "EASYPAISA"]
    },
    {
        type: "input",
        name: "amount",
        message: "Enter the amount",
        validate: function (value) {
            if (value.trim() !== "") {
                return true;
            }
            return "Please enter a non-empty value";
        }
    }
]);

console.log(`\nYou selected payment method: ${paymentType.paymentType}`);

const tutionFeesForCourse = tutionFees[answer.courses];
const paymentAmount = parseFloat(paymentType.amount);

if (tutionFeesForCourse === paymentAmount) {
    console.log(`\nYou have paid ${tutionFeesForCourse}`);
    myBalance -= tutionFeesForCourse;
    console.log(`\nYour balance is ${myBalance}`);

    let viewStatusAnswer = await inquirer.prompt([
        {
            type: "list",
            name: "select",
            message: "Select the action",
            choices: ["VIEW STATUS", "EXIT"]
        }
    ]);

    if (viewStatusAnswer.select === "VIEW STATUS") {
        console.log("Status");
    }

    console.log(`Student name: ${answer.student}`);
    console.log(`Student ID: ${randomNumber}`);
    console.log(`Course: ${answer.courses}`);
    console.log(`Tuition fees paid: ${paymentAmount}`);
    console.log(`Balance: ${myBalance}`);
} else {
    console.log("\nExisting student management system\n");
}

if (tutionFeesForCourse !== paymentAmount) {
    console.log("Invalid amount due to course");
    myBalance -= paymentAmount;
    console.log(`\nYour balance is ${myBalance}`);
}