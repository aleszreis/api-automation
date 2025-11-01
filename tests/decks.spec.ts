import { test, expect } from '@playwright/test';
import { createNewDeck } from './utils/utils';

test('Create a new deck with 52 cards', async ({ request }) => {
  const response = await request.get('/api/deck/new/');
  expect(response.ok()).toBeTruthy();

  const data = await response.json();
  expect(data.success).toBe(true);
  expect(data.remaining).toBe(52);
});

test('Create a new shuffled deck with jokers included', async ({ request }) => {
  const response = await request.get('/api/deck/new/shuffle/?jokers_enabled=true');
  expect(response.ok()).toBeTruthy();

  const data = await response.json();
  expect(data.success).toBe(true);
  expect(data.shuffled).toBe(true);
  expect(data.remaining).toBe(54); // 52 cards + 2 jokers
});

test('Draw 5 cards from a new deck', async ({ request }) => {
  // First, create a new deck
  const deckId = await createNewDeck(request);

  // Now, draw 5 cards from the created deck
  const drawResponse = await request.get(`/api/deck/${deckId}/draw/?count=5`);
  expect(drawResponse.ok()).toBeTruthy();

  const drawData = await drawResponse.json();
  expect(drawData.success).toBe(true);
  expect(drawData.cards.length).toBe(5);
  expect(drawData.remaining).toBe(47);
});

test('Shuffle an existing deck', async ({ request }) => {
  // First, create a new deck
  const deckId = await createNewDeck(request);

  // Now, shuffle the created deck
  const shuffleResponse = await request.get(`/api/deck/${deckId}/shuffle/`);
  expect(shuffleResponse.ok()).toBeTruthy();

  const shuffleData = await shuffleResponse.json();
  expect(shuffleData.success).toBe(true);
  expect(shuffleData.shuffled).toBe(true);
  expect(shuffleData.remaining).toBe(52);
});

test('Fail to draw more cards than remaining in the deck', { tag: "@negative " }, async ({ request }) => {
  // First, create a new deck
  const deckId = await createNewDeck(request);
  const valueToDraw = 60;

  // Now, attempt to draw 60 cards from the created deck
  const drawResponse = await request.get(`/api/deck/${deckId}/draw/?count=${valueToDraw}`);
  expect(drawResponse.ok()).toBeTruthy();

  const drawData = await drawResponse.json();
  expect(drawData.success).toBe(false);
  expect(drawData.error).toBe(`Not enough cards remaining to draw ${valueToDraw} additional`);
});

test('Draw cards from a non-existent deck should fail', { tag: "@negative " }, async ({ request }) => {
  const invalidDeckId = 'invalid-deck-id-12345';

  // Attempt to draw cards from a non-existent deck
  const drawResponse = await request.get(`/api/deck/${invalidDeckId}/draw/?count=5`);
  expect(drawResponse.status()).toBe(404); // Deck not found
});