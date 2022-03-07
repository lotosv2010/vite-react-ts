import { makeAutoObservable } from 'mobx';

class GlobalStore {
  public title = '';
  public theme = 'default';
  public language = 'zh';
  constructor() {
    makeAutoObservable(this);
  }
  setTheme(theme: string) {
    this.theme = theme;
  }
  setTitle(title: string) {
    this.title = title;
  }
  async setLanguage(language: string) {
    // 模拟接口请求
    return await new Promise((resolve) => {
      setTimeout(() => {
        this.language = language;
        resolve(language);
      }, 1000);
    });
  }
}

export default new GlobalStore();
