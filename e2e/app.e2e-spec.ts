import { WebyogaPage } from './app.po';

describe('webyoga App', () => {
  let page: WebyogaPage;

  beforeEach(() => {
    page = new WebyogaPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
