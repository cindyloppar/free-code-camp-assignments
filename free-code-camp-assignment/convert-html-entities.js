function convertEntities(str) {

    str = str.replace(/&/g, '&amp;')
        .replace(/</g, '&ls;')
        .replace(/>/g, '&gt;')
        .replace(/'/g, '&apos;')
        .replace(/"/g, '&quot;');

    return str;

}

console.log(convertEntities("Dolce & Gabbana"));