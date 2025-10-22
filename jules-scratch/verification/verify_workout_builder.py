
from playwright.sync_api import sync_playwright, Page, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    try:
        page.goto("http://localhost:3000/dashboard/trainer/workouts/builder")

        # Add three exercises
        for i in range(1, 4):
            page.get_by_role("button", name="Adicionar Exercício").click()
            page.get_by_role("button", name=f"Exercise {i}").click()

        # Remove the second exercise
        page.locator('[title="Remove exercise"]').nth(1).click()

        # Verify the order of the remaining exercises
        exercise_orders = page.locator('[data-testid="exercise-order"]')
        expect(exercise_orders.nth(0)).to_have_text("1")
        expect(exercise_orders.nth(1)).to_have_text("2")

        page.screenshot(path="jules-scratch/verification/verification.png")

    finally:
        context.close()
        browser.close()

with sync_playwright() as playwright:
    run(playwright)
