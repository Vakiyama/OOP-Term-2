import { table, TableUserConfig } from 'table';
import Reminder from '../Reminder';
import RemindersHandler, { RemindersGroupingByTag } from '../RemindersHandler';

const data = [
    ['1', 'Show all reminders 👀'],
    ['2', 'Search reminders 🔎'],
    ['3', 'Add reminder ➕'],
    ['4', 'Modify reminders 📝'],
    ['5', 'Toggle completion ✅'],
    ['6', 'Exit 👋'],
];

const config: TableUserConfig = {
    header: {
        alignment: 'center',
        content: 'Reminders Menu',
    },
};

export default class ReminderLogger {
    static readonly MENU = table(data, config);
    public static logMenu(): void {
        console.log(this.MENU);
    }

    public static logTag(reminder: Reminder): void {
        console.log(`🏷️  ${reminder.tag.toUpperCase()}`);
    }

    public static logTagString(tag: string): void {
        console.log(`\n🏷️  ${tag.toUpperCase()}`);
    }

    public static logDescription(reminder: Reminder): void {
        if (reminder.isCompleted) {
            console.log(`  🟢 ${reminder.description}`);
        } else {
            console.log(`  ⭕️ ${reminder.description}`);
        }
    }

    public static logGroupedReminders(remindersGroupings: RemindersGroupingByTag): void {
        Object.keys(remindersGroupings).forEach((tag) => {
            this.logTagString(`${tag}\n`);
            remindersGroupings[tag].forEach((reminder: Reminder) => {
                this.logDescription(reminder);
            });
        });
    }

    public static logReminders(reminders: Reminder[]): void {
        console.log('\n');
        reminders.forEach((reminder, index) => {
            console.log(` [${index + 1}] ${reminder.description}`);
        });
    }

    public static logSearchResults(reminders: Reminder[]): void {
        if (reminders.length === 0) this.log('No results found for search.\n');
        else {
            console.log('');
            reminders.forEach((reminder) => {
                this.logDescription(reminder);
            });
        }
    }

    public static log(msg: string): void {
        console.log(msg);
    }
}
