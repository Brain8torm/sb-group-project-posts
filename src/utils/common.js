export let diff = (obj2, obj1) => {
    Object.keys(obj2).reduce((diff, key) => {
        if (obj1[key] === obj2[key]) return diff
        return {
            ...diff,
            [key]: obj2[key]
        }
    }, 0);
}