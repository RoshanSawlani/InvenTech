export function generateInitials (fullName){
    // split the full name into array of words
    const words = fullName.split(/\s+/);

    // get the first letter of the each word and join them
    const initials = words.map((word)=>word.charAt(0)).join('');

    // Ensure the initials are in uppercase
    return initials.toUpperCase();
}