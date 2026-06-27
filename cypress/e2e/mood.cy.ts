describe('Mood Tracker App', () => {
  beforeEach(() => {
    // Set a fixed date so tests are deterministic (e.g., 2026-06-15)
    cy.clock(new Date(2026, 5, 15).getTime(), ['Date']);
    cy.visit('/');
  });

  it('should display the current month and calendar grid', () => {
    cy.get('[data-cy="current-month"]').should('have.text', '2026. 06');
    // 15th should be highlighted as today
    cy.get('[data-cy="cal-cell-2026-06-15"]').should('have.class', 'today');
  });

  it('should show validation error when saving without mood or note', () => {
    cy.get('[data-cy="cal-cell-2026-06-15"]').click();
    
    // Save directly without selecting mood
    cy.get('[data-cy="save-btn"]').click();
    cy.get('[data-cy="error-msg"]').should('contain', '기분을 먼저 선택해주세요!');
    
    // Select mood but no note
    cy.get('[data-cy="mood-btn-happy"]').click();
    cy.get('[data-cy="save-btn"]').click();
    cy.get('[data-cy="error-msg"]').should('contain', '오늘의 일기를 짧게라도 남겨보세요.');
  });

  it('should allow user to record a mood and display it on the calendar', () => {
    cy.get('[data-cy="cal-cell-2026-06-15"]').click();
    
    cy.get('[data-cy="mood-btn-sad"]').click();
    cy.get('[data-cy="note-input"]').type('It rained all day.');
    cy.get('[data-cy="save-btn"]').click();
    
    // Verify it shows up on the calendar cell
    cy.get('[data-cy="cal-cell-2026-06-15"]').should('contain', '🥺');
  });

  it('should allow navigating to previous and next months', () => {
    // Next month (July)
    cy.get('[data-cy="next-month-btn"]').click();
    cy.get('[data-cy="current-month"]').should('have.text', '2026. 07');
    
    // Prev month (back to June)
    cy.get('[data-cy="prev-month-btn"]').click();
    cy.get('[data-cy="current-month"]').should('have.text', '2026. 06');
  });
  
  it('should preserve recorded mood when navigating months', () => {
    // Record mood on June 10
    cy.get('[data-cy="cal-cell-2026-06-10"]').click();
    cy.get('[data-cy="mood-btn-angry"]').click();
    cy.get('[data-cy="note-input"]').type('Stepped on lego');
    cy.get('[data-cy="save-btn"]').click();
    
    // Check it's there
    cy.get('[data-cy="cal-cell-2026-06-10"]').should('contain', '😡');
    
    // Navigate away and back
    cy.get('[data-cy="next-month-btn"]').click();
    cy.get('[data-cy="prev-month-btn"]').click();
    
    // Should still be there
    cy.get('[data-cy="cal-cell-2026-06-10"]').should('contain', '😡');
  });
});
