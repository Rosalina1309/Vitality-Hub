describe("Exercises page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/exercises");
    cy.get("#activetime").type("60").should("have.value", "60");
    cy.get("#weight").type("70").should("have.value", "70");
  })
  
  it("Calculates Burned Calories while Sleeping", () => {
    cy.get("#activity").select("Sleeping").should("have.value", "Sleeping");
    cy.get("#calccalories").click();
    cy.get("p").should("contain", "66.15 calories");
  });

  it("Calculates Burned Calories while Watching TV", () => {
    cy.get("#activity").select("Watching TV").should("have.value", "Watching TV");
    cy.get("#calccalories").click();
    cy.get("p").should("contain", "73.50 calories");
  });

  it("Calculates Calories at Desk Work", () => {
    cy.get("#activity").select("Desk work").should("have.value", "Desk work");
    cy.get("#calccalories").click();
    cy.get("p").should("contain", "132.30 calories");
  });

  it("Calculates Burned Calories while Strolling", () => {
    cy.get("#activity").select("Strolling").should("have.value", "Strolling");
    cy.get("#calccalories").click();
    cy.get("p").should("contain", "169.05 calories");
  });

  it("Calculates Burned Calories while Walking", () => {
    cy.get("#activity").select("Walking").should("have.value", "Walking");
    cy.get("#calccalories").click();
    cy.get("p").should("contain", "213.15 calories");
  });

  it("Calculates Burned Calories with Resistance Training/weight training", () => {
    cy.get("#activity").select("Resistance training/weight training").should("have.value", "Resistance training/weight training");
    cy.get("#calccalories").click();
    cy.get("p").should("contain", "257.25 calories");
  });

  it("Calculates Burned Calories with Moderate Calisthenics", () => {
    cy.get("#activity").select("Moderate calisthenics(e.g. push ups, sit ups, lunges").should("Moderate calisthenics(e.g. push ups, sit ups, lunges)");
    cy.get("#calccalories").click();
    cy.get("p").should("contain", "279.30 calories");
  });

  it("Calculates Burned Calories doing Pilates", () => {
    cy.get("#activity").select("Pilates").should("have.value", "Pilates");
    cy.get("#calccalories").click();
    cy.get("p").should("contain", "279.30 calories");
  });

  it("Calculates Burned Calories doing Yoga", () => {
    cy.get("#activity").select("Yoga").should("have.value", "Yoga");
    cy.get("#calccalories").click();
    cy.get("p").should("contain", "220.50 calories");
  });

  it("Calculates Burned Calories doing Water exercise", () => {
    cy.get("#activity").select("Water exercise").should("have.value", "Water exercise");
    cy.get("#calccalories").click();
    cy.get("p").should("contain", "183.75 calories");
  });

  it("Calculates Burned Calories while Light Bicycling", () => {
    cy.get("#activity").select("Light bicycling").should("have.value", "Light bicycling");
    cy.get("#calccalories").click();
    cy.get("p").should("contain", "389.55 calories");
  });

  it("Calculates Burned Calories Practicing Moderate Walking", () => {
    cy.get("#activity").select("Moderate walking").should("have.value", "Moderate walking");
    cy.get("#calccalories").click();
    cy.get("p").should("contain", "242.55 calories");
  });

  it("Calculates Burned Calories doing Moderate Home Exercise", () => {
    cy.get("#activity").select("Moderate home exercise").should("have.value", "Moderate home exercise");
    cy.get("#calccalories").click();
    cy.get("p").should("contain", "257.25 calories");
  });

  it("Calculates Burned Calories while Fast Walking", () => {
    cy.get("#activity").select("Fast walking").should("have.value", "Fast walking");
    cy.get("#calccalories").click();
    cy.get("p").should("contain", "264.60 calories");
  });

  it("Calculates Burned Calories while Moderate Bicycling", () => {
    cy.get("#activity").select("Moderate bicycling").should("have.value", "Moderate bicycling");
    cy.get("#calccalories").click();
    cy.get("p").should("contain", "294.00 calories");
  });

  it("Calculates Burned Calories while Fast Bicycling", () => {
    cy.get("#activity").select("Fast bicycling").should("have.value", "Fast bicycling");
    cy.get("#calccalories").click();
    cy.get("p").should("contain", "404.25 calories");
  });

  it("Calculates Burned Calories while Jogging", () => {
    cy.get("#activity").select("Jogging").should("have.value", "Jogging");
    cy.get("#calccalories").click();
    cy.get("p").should("contain", "514.50 calories");
  });

  it("Calculates Burned Calories Running", () => {
    cy.get("#activity").select("Running").should("have.value", "Running");
    cy.get("#calccalories").click();
    cy.get("p").should("contain", "588.00 calories");
  });
  
  it("Calculates Burned Calories Role Jumping", () => {
    cy.get("#activity").select("Rope jumping").should("have.value", "Rope jumping");
    cy.get("#calccalories").click();
    cy.get("p").should("contain", "735.00 calories");
  });
});
