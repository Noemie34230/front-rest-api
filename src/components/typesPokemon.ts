// typeStyles.ts
export function getTypeClass(element: string): string {
    let typeClass = '';
    switch (element) {
        case 'grass':
            typeClass = 'grass-class';
            break;
        case 'fire':
            typeClass = 'fire-class';
            break;
        case 'poison':
            typeClass = 'poison-class';
            break;
        case 'flying':
            typeClass = 'flying-class';
            break;
        case 'water':
            typeClass = 'water-class';
            break;
        case 'bug':
            typeClass = 'bug-class';
            break;
        case 'normal':
            typeClass = 'normal-class';
            break;
        case 'electric':
            typeClass = 'electric-class';
            break;
        case 'ground':
            typeClass = 'ground-class';
            break;
        case 'fairy':
            typeClass = 'fairy-class';
            break;
        case 'fighting':
            typeClass = 'fighting-class';
            break;
        case 'psychic':
            typeClass = 'psychic-class';
            break;
        case 'rock':
            typeClass = 'rock-class';
            break;
        case 'ice':
            typeClass = 'ice-class';
            break;
        case 'dragon':
            typeClass = 'dragon-class';
            break;
        case 'dark':
            typeClass = 'dark-class';
            break;
        case 'ghost':
            typeClass = 'ghost-class';
            break;      
        
        default:
            break;
    }
    return typeClass;
}
