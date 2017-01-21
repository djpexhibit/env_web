const CATEGORY_COSMETICS = 1;
const CATEGORY_PERFUMES = 2;
const CATEGORY_TRAVEL_ACCESSORIES = 3;

export function returnCategoryId(type){
    switch(type){
        case 'cosmetics':
            return CATEGORY_COSMETICS;
        case 'perfumes':
            return CATEGORY_PERFUMES;
        case 'travel_accessories':
            return CATEGORY_TRAVEL_ACCESSORIES;
        default:
            return 0;
    }
}