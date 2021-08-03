
const getOptions = () => { // to generate mock data
    const options = [];
    for (let i = 0; i < 15; i++) {
        const obj = {
            id: i+1, 
            value: 'option ' + i, 
            label: 'Option ' + i,
            isSelected: i === 0 ? true : false
        }
        options.push(obj);
    }
    return options;
}

export default getOptions;

