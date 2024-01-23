import readlineSync from "readline-sync";
import Logger from "./util/ReminderLogger";
import RemindersHandler from "./RemindersHandler";

type GetUserInputOptions = 
| { askForValidIndex: true, askForYesNo?: never } 
| { askForValidIndex?: never, askForYesNo: true } 
| { askForValidIndex: false, askForYesNo: false } 

export default class ReminderApp {
    private _remindersHandler: RemindersHandler;

    constructor() {
        this._remindersHandler = new RemindersHandler();
    }

    public start(): void {
        let exitFlag = false;
        for (;;) {
            const item: string = ReminderApp.handleMenuSelection();
            switch (item) {
                case "1":
                    this.handleShowReminders();
                    break;
                case "2":
                    this.handleSearchReminders();
                    break;
                case "3":
                    this.handleAddReminder();
                    break;
                case "4":
                    this.handleModifyReminders();
                    break;
                case "5":
                    this.handleToggleCompletion();
                    break;
                default:
                    exitFlag = true;
                    break;
            }
            if (exitFlag) break;
        }
        Logger.log("\n  ❌  Exited application\n");
    }

    private handleToggleCompletion(): void {
        if (this.hasNoReminders) return Logger.log('\n  ⚠️  You have no reminders');
        Logger.logReminders(this._remindersHandler.reminders);
        const index = parseInt(this.getUserChoice("reminder number", { askForValidIndex: true })); 
        this._remindersHandler.toggleCompletion(index - 1);
        Logger.log('\n  🏁   Reminder Completion Toggled');
    }

    private handleModifyReminders(): void {
        if (this.hasNoReminders) return Logger.log('\n  ⚠️  You have no reminders');
        Logger.logReminders(this._remindersHandler.reminders);
        const index = parseInt(this.getUserChoice("reminder number to edit", { askForValidIndex: true })) - 1;
        const newDescription = this.getUserChoice("new description");
        this._remindersHandler.modifyReminder(index, newDescription);
        const yesNoAnswer = this.getUserChoice("Would you also like to toggle this reminder", { askForYesNo: true });
        if (yesNoAnswer === "y") {
            this._remindersHandler.toggleCompletion(index);
            Logger.log('\n  🏁   Reminder Modified');
        }
    }

    private handleAddReminder(): void {
        const description: string = this.getUserChoice("description for your reminder") 
        const tag: string = this.getUserChoice("tag for your reminder") 
        this._remindersHandler.addReminder(description, tag);
        Logger.log('\n  🏁  Reminder Added');
    }

    private handleSearchReminders(): void {
        if (this.hasNoReminders) return Logger.log('\n  ⚠️  You have no reminders');
        const keyword = this.getUserChoice("keyword");
        const results = this._remindersHandler.search(keyword);
        Logger.logSearchResults(results);
    }

    private handleShowReminders(): void {
        if (this.hasNoReminders) return Logger.log('\n  ⚠️  You have no reminders');
        Logger.logGroupedReminders(this._remindersHandler.groupByTag());
    }

    private get hasNoReminders() {
        return this._remindersHandler.reminders.length === 0
    }

    private getUserChoice(
        question: string,
        options: GetUserInputOptions = { askForValidIndex: false, askForYesNo: false } 
    ): string {
        let userChoice: string;
        for (;;) {
            const questionTemplate = !options.askForYesNo ? `\nEnter a ${question} here: ` : `${question}: y/n: `;
            userChoice = readlineSync.question(questionTemplate, {
                limit: (input: string) => {
                    return this.validateInput(input, options); 
                },
                limitMessage: "",
            });
            if (options.askForYesNo) break;
            const userDecision = this.checkUserChoice(question, userChoice);
            if (userDecision === "n") Logger.log("\n  🔄  Please try typing it again");
            else break;
        }
        return userChoice;
    }

    private checkUserChoice(question: string, userChoice: string): "y" | "n" {
        return readlineSync
        .question(`You entered ${question}: '${userChoice}', is it correct? y/n: `, {
            limit: /^[YNyn]{1}$/,
            limitMessage: "\n  🚨  Invalid input: Please enter either y/n.\n",
        })
        .toLowerCase() as "y" | "n";
    }

    /* haha oops
    
    private static checkUserToggleChoice(): boolean {
        const toggleAnswer: string = readlineSync.question(`\nDo you wish to toggle the completed status? y/n: `, {
            limit: /^[YNyn]{1}$/,
            limitMessage: "\n  🚨  Invalid input: Please enter either y/n.\n",
        });

        if (toggleAnswer.toLowerCase() === "y") return true;
        return false;
    }
    */

    private validateInput(input: string, options: GetUserInputOptions): boolean {
        if (!input) {
            Logger.log(`\n  🚨  Input cannot be blank: Please try again.\n`);
            return false;
        }
        if (options?.askForValidIndex) {
            if (ReminderApp.matches(/^\d+$/, input)) {
                const index: number = Number(input) - 1;
                if (this._remindersHandler.isIndexValid(index)) return true;
                Logger.log(`\n  🚨  Input must be number from the list of reminders: Please try again.\n`);
                return false;
            }
            Logger.log(`\n  🚨  Input must be positive number from the list of reminders: Please try again.\n`);
            return false;
        }
        if (options?.askForYesNo) {
            if (input !== "y" && input !== "n") {
                Logger.log(`\n  🚨  Input must be y/n. Please try again.\n`);
                return false;
            }
        }
        return true;
    }

    private static matches(regex: RegExp, str: string): boolean {
        return regex.test(str);
    }

    private static getMenuItem(): string {
        const item: string = readlineSync.question("Choose a [Number] followed by [Enter]: ", {
            limit: ["1", "2", "3", "4", "5", "6"],
            limitMessage: "\n  🚨  Sorry, input is not a valid menu item.\n",
        });
        return item;
    }

    private static handleMenuSelection(): string {
        readlineSync.question("\nHit [Enter] key to see main menu: ", { hideEchoBack: true, mask: "" });
        Logger.logMenu();
        return ReminderApp.getMenuItem();
    }
}
