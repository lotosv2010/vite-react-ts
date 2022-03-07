import { makeAutoObservable } from 'mobx';

class LayoutStore {
  public collapse = false;
  public pathname = location.pathname;
  constructor() {
    makeAutoObservable(this);
  }
  setCollapse(collapse: boolean) {
    this.collapse = collapse;
  }
  setPathname(pathname: string) {
    this.pathname = pathname;
  }
}

export default new LayoutStore();
