describe('URL Shortener Application', () => {

  it('should redirect to the original URL', () => {
    const shortenedUrl = 'http://yourdomain.com/6ER1ovoe_'; // Replace with a valid shortened URL in your application
    const expectedRedirectUrl = 'https://www.tutorialspoint.com/powershell/powershell_files_delete_folders.htm'; // Update with the expected redirected URL
    cy.request(shortenedUrl).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.redirectedToUrl).to.eq(expectedRedirectUrl);
    });
  });

  it('should display an error for nonexistent short URLs', () => {
    const nonexistentShortUrl = 'http://yourdomain.com/6ER'; // Replace with a nonexistent short URL
    cy.request({ url: nonexistentShortUrl, failOnStatusCode: false }).then((response) => {
      expect(response.status).to.eq(404);
      expect(response.body).to.contain('URL not found'); // Update with the expected error message
    });
  });
});
