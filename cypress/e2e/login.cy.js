/**
 * Login Spec
 * - should display login page correctly
 * - should display popup error message when email is empty
 * - should display popup error message when password is empty
 * - should display popup error message when login failed
 * - should display popup success message and show Home Page when login success
 */

describe('Login Spec', () => {
  beforeEach(() => {
    // Visit the login page before each test
    cy.visit('/', {
      timeout: 10000 // Increase timeout to 10 seconds
    });
  });

  it('should display login page correctly', () => {
    // Use cy.contains() for text content and add timeout
    cy.contains('h1', 'Login', { timeout: 10000 }).should('be.visible');

    // Check text content with contains
    cy.contains('Please sign in to your account').should('be.visible');

    // Check form elements
    cy.get('form').should('exist');
    cy.get('input[type="email"]')
      .should('be.visible')
      .and('have.attr', 'placeholder', 'Enter your email');

    cy.get('input[type="password"]')
      .should('be.visible')
      .and('have.attr', 'placeholder', 'Enter your password');

    cy.get('[data-testid="submit-login-button"]')
      .should('be.visible')
      .and('contain', 'Sign In');

    // Check logo
    cy.get('img[alt="Dicoding Forum"]')
      .should('be.visible')
      .and('have.attr', 'src')
      .and('include', 'dicoding_logo');

    // Check sign up link (note: it's a span in your component, not an anchor)
    cy.contains('span', 'Sign up')
      .should('be.visible')
      .and('have.class', 'text-purple-600');
  });

  it('should display popup error message when email is empty', () => {
    // Fill in the form with invalid credentials
    cy.get('input[type="password"]').type('wrongpassword');
    cy.get('[data-testid="submit-login-button"]').click();
    cy.get('.Toastify').should('contain', '"email" is not allowed to be empty');
  });

  it('should display popup error message when password is empty', () => {
    // Fill in the form with invalid credentials
    cy.get('input[type="email"]').type('wrong@email.com');
    cy.get('[data-testid="submit-login-button"]').click();
    cy.get('.Toastify').should('contain', '"password" is not allowed to be empty');
  });

  it('should display popup error message when login failed', () => {
    // Fill in the form with invalid credentials
    cy.get('input[type="email"]').type('wrong@email.com');
    cy.get('input[type="password"]').type('wrongpassword');
    cy.get('[data-testid="submit-login-button"]').click();
    cy.get('.Toastify').should('contain', 'email or password is wrong');
  });

  it('should display popup success message and show Home Page when login success', () => {
    // Fill in the form with invalid credentials
    cy.get('input[type="email"]').type('anggun@gmail.com');
    cy.get('input[type="password"]').type('123123');
    cy.get('[data-testid="submit-login-button"]').click();
    cy.get('.Toastify').should('contain', 'You have successfully logged in');
    cy.url().should('eq', `${Cypress.config().baseUrl  }/`);

    // Check sidebar existence and basic structure
    cy.get('.lg\\:block').within(() => {
      // Check logo and title
      cy.get('.bg-gradient-to-r').should('exist');
      cy.contains('Dicoding Forum').should('be.visible');

      // Check navigation buttons
      cy.contains('button', 'Trending')
        .should('be.visible')
        .and('have.class', 'bg-slate-200'); // Should be active by default

      cy.contains('button', 'Leaderboard')
        .should('be.visible')
        .and('not.have.class', 'bg-slate-200'); // Should not be active

      cy.contains('button', 'Notifications')
        .should('be.visible')
        .and('not.have.class', 'bg-slate-200'); // Should not be active

      // Check icons
      cy.get('svg').should('have.length', 3); // Home, Trophy, and Bell icons
    });
  });


});