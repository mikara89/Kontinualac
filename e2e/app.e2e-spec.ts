import { ProracunGredaPage } from './app.po';

describe('proracun-greda App', () => {
  let page: ProracunGredaPage;

  beforeEach(() => {
    page = new ProracunGredaPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
