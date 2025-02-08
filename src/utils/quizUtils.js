
export function shuffleArray(array) {
    const shuffled = [...array];  // Create a shallow copy of the array
    for (let i = shuffled.length - 1; i > 0; i--) { // Loop through the array backwards
        const j = Math.floor(Math.random() * (i + 1)); // Generate a random index
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap the elements
    }
    return shuffled;
}