import { HeroesTutorialPage } from './app.po';

describe('heroes-tutorial App', () => {
  let page: HeroesTutorialPage;

  beforeEach(() => {
    page = new HeroesTutorialPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
