import { test, expect } from '@playwright/test';
import { createNewDeck } from './utils/utils';

test('Create a new pile and add cards to it', async ({ request }) => {
  // First, create a new deck
  const deckId = await createNewDeck(request);

  // Draw 5 cards from the created deck
  const drawResponse = await request.get(`/api/deck/${deckId}/draw/?count=5`);
  const drawData = await drawResponse.json();
  const cardsToAdd = drawData.cards.map((card: { code: string; }) => card.code).join(','); // e.g., "AS,2H,3D,4C,5S"

  // Now, create a new pile and add the drawn cards to it
  const pileName = 'newpile';
  const addToPileResponse = await request.get(`/api/deck/${deckId}/pile/${pileName}/add/?cards=${cardsToAdd}`);
  expect(addToPileResponse.ok()).toBeTruthy();

  const addToPileData = await addToPileResponse.json();
  expect(addToPileData.success).toBe(true);
  expect(addToPileData.piles[pileName].remaining).toBe(5);
});

test('Draw cards from a pile', async ({ request }) => {
  // First, create a new deck
  const deckId = await createNewDeck(request);

  // Draw 5 cards from the created deck
  const drawResponse = await request.get(`/api/deck/${deckId}/draw/?count=5`);
  const drawData = await drawResponse.json();
  const cardsToAdd = drawData.cards.map((card: { code: any; }) => card.code).join(','); // e.g., "AS,2H,3D,4C,5S"

  // Create a new pile and add the drawn cards to it
  const pileName = 'newpile';
  await request.get(`/api/deck/${deckId}/pile/${pileName}/add/?cards=${cardsToAdd}`);

  // Now, draw 3 cards from the pile
  const drawFromPileResponse = await request.get(`/api/deck/${deckId}/pile/${pileName}/draw/?count=3`);
  expect(drawFromPileResponse.ok()).toBeTruthy();

  const drawFromPileData = await drawFromPileResponse.json();
  expect(drawFromPileData.success).toBe(true);
  expect(drawFromPileData.cards.length).toBe(3);
  expect(drawFromPileData.cards.map((card: { code: any; }) => card.code)).toBeDefined(); // Ensure drawn cards have defined codes
  expect(drawFromPileData.piles.newpile.remaining).toBe(2);
});

