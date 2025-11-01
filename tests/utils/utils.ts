export async function createNewDeck(request: any, shuffled: boolean = false): Promise<string> {
    if (shuffled) {
        const response = await request.get('/api/deck/new/shuffle/');
        const data = await response.json();
        return data.deck_id;
    }
    const response = await request.get('/api/deck/new/');
    const data = await response.json();
    return data.deck_id;
}