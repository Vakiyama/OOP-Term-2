import Reminder from './Reminder';
import FuzzySearch from 'fuzzy-search';

export interface RemindersGroupingByTag {
  [tag: string]: Reminder[];
}

export default class RemindersHandler {
  private _reminders: Reminder[];

  constructor() {
    this._reminders = [];
  }

  public get reminders(): Reminder[] {
    return this._reminders;
  }

  public addReminder(description: string, tag: string): void {
    this._reminders.push(new Reminder(description, tag, false));
  }

  public getReminder(index: number): Reminder {
    if (!this.isIndexValid(index)) throw new Error("Invalid index");
    return this._reminders[index];

  }

  public isIndexValid(index: number): boolean {
    if (this.length === 0) return false;
    if (index < 0 || index + 1 > this.length) return false;
    return true;
  }

  get length(): number {
    return this._reminders.length;
  }

  // Silently ignores call if index is not valid.
  public modifyReminder(index: number, description: string): void {
    if (!this.isIndexValid(index)) return;
    this._reminders[index].description = description;
  }

  // Silently ignores call if index is not valid.
  public toggleCompletion(index: number): void {
    if (!this.isIndexValid(index)) return;
    this._reminders[index].toggleCompletion();
  }

  // All reminders with tags that match the search keyword exactly will be returned first.
  // If none exist, then all reminders with descriptions that match the search keyword (even partially)
  public search(keyword: string): Reminder[] {
    const results: Reminder[] = this.searchTags(keyword);
    return results.length !== 0 ? results : this.searchDescriptions(keyword);
  }

  public groupByTag(): RemindersGroupingByTag {
    const groupings: RemindersGroupingByTag = {};
    this._reminders.reduce((groupings, currentReminder) => {
      const currentTag = currentReminder.tag;
      if (Object.keys(groupings).includes(currentTag)) {
        groupings[currentTag].push(currentReminder);
        return groupings;
      }

      groupings[currentTag] = [currentReminder];
      return groupings;
    }, groupings);
    return groupings;
  }

  // exact matches Returns a list of reminders with tags that match the keyword exactly.
  private searchTags(keyword: string): Reminder[] {
    return this._reminders.filter(reminder => reminder.tag.includes(keyword));
  }

  private searchDescriptions(keyword: string): Reminder[] {
    const searcher = new FuzzySearch(this._reminders, ['description'], { sort: true });
    return searcher.search(keyword);
  }
}
