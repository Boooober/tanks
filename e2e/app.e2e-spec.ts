import { TanxPage } from './app.po';

describe('tanx App', function() {
  let page: TanxPage;

  beforeEach(() => {
    page = new TanxPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
