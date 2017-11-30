import moment from 'moment'
import uniq from 'lodash.uniq'

export function nameCombiner(first, last) {
    return `${first.toLowerCase()}-${last.toLowerCase()}`
}

export function fromDate(date) {
    return moment(date).fromNow()
}

export function sortMarks(tags, sortType) {
    if (sortType === 'alphabetical--asc') {
        return tags.sort((a, b) => (a.fields.name > b.fields.name ? -1 : 1))
    }
    if (sortType === 'alphabetical--desc') {
        return tags.sort((a, b) => (a.fields.name < b.fields.name ? -1 : 1))
    }
    if (sortType === 'date--asc') {
        return tags.sort((a, b) => (a.fields.created < b.fields.created ? -1 : 1))
    }
    if (sortType === 'date--desc') {
        return tags.sort((a, b) => (a.fields.created > b.fields.created ? -1 : 1))
    }
}

export function isValidNumber(number) {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9].includes(parseInt(number, 10))
}

export function getUniqTags(marks) {
    return uniq(
        marks.reduce((sum, m) => {
            if (m.fields.tags) {
                m.fields.tags.map(t => {
                    return sum.push(t)
                })
            }
            return sum
        }, [])
    )
}

export function checkAllTags(filters, mark) {
    return filters.reduce((prev, tag) => {
        return prev && mark.fields.tags.includes(tag)
    }, true)
}

export function updateFilters(activeFilter, tag) {
    return activeFilter.includes(tag) ? activeFilter.filter(f => f !== tag) : [...activeFilter, tag]
}
