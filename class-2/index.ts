import { v4 as uuidv4 } from "uuid";

class SavingsAccount {
    private _memberId: string;
    private _balance: number;

    constructor(
        memberId: string,
        startingBalance: number,
    ) {
        this._memberId = memberId;
        this._balance = startingBalance;
    }

    withdraw(amount: number) {
        if (amount > this._balance) throw new Error("Not enough balance");
        this._balance -= amount;
    }

    deposit(amount: number) {
        if (amount <= 0) throw new Error("Deposit amount must be positive");
        this._balance += amount;
    }

    get getBalance(): string {
        return "Balance: " + this._balance;
    }

    get getMemberId(): string {
        return this.getMemberId;
    }
}

class BankMember {
    private _name: string;
    private _id: string;
    private _savingsAccount: SavingsAccount | undefined;

    constructor(
        name: string,
    ) {
        this._id = uuidv4();
        this._name = name;
    }
}
