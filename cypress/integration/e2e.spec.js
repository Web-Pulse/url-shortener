// cypress/integration/e2e.spec.js
describe('URL Shortener', () => {
    it('should shorten a URL and redirect', () => {
      const longUrl = 'https://www.example.com'; // Replace with your long URL
  
      // Visit the application
      cy.visit('http://localhost:3000');
  
      // Enter the long URL and submit the form
      cy.get('input[name="longUrl"]').type(longUrl);
      cy.get('button[type="submit"]').click();
  
      // Check if the shortened URL is displayed
      cy.contains('Shortened URL:').should('be.visible');
      cy.get('a').should('have.attr', 'href').and('include', 'http://yourdomain.com');
  
      // Click on the shortened URL and check if it redirects
      cy.get('a').click();
      cy.url().should('eq', longUrl);
    });
  
    it('should handle invalid URLs', () => {
      const invalidUrl = 'invalidurl'; // Replace with an invalid URL
  
      // Visit the application
      cy.visit('http://localhost:3000');
  
      // Enter the invalid URL and submit the form
      cy.get('input[name="longUrl"]').type(invalidUrl);
      cy.get('button[type="submit"]').click();
  
      // Check if an error alert is shown
      cy.on('window:alert', (str) => {
        expect(str).to.equal('Please enter a valid URL.');
      });
    });
  });
  