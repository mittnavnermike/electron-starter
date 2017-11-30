import React, { Component } from 'react'
import autoBind from 'react-autobind'
import { withRouter } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actionCreators from '../actions/actionCreators'

import {
    sortMarks,
    isValidNumber,
    updateFilters,
    checkAllTags,
    getUniqTags
} from '../utilities/helpers'

import config from '../config.json'

import Loader from '../components/Loader'
import Header from '../components/Header'
import Search from '../components/Search'
import Filter from '../components/Filter'
import Sort from '../components/Sort'
import Mark from '../components/Mark'
import Electron from '../components/Electron'

const electron = window.require('electron')

class FrontPage extends Component {
    constructor() {
        super()
        this.state = {
            loading: true,
            bookmarks: [],
            bookmarksVisible: [],
            tags: [],
            filter: '',
            edit: false,
            activeFilter: [],
            activeSort: 'date--desc',
            searchTerm: '',
            availableTags: []
        }
        autoBind(this)
    }
    componentDidMount() {
        const url = `https://api.airtable.com/v0/appNKZA5FgitIE1Gc/Table%201?maxRecords=99&view=Grid%20view&api_key=${config.airtable_key}`
        fetch(url)
            .then(res => res.json())
            .then(data =>
                this.setState({
                    bookmarks: data.records.sort(
                        (a, b) => (a.fields.created > b.fields.created ? -1 : 1)
                    ),
                    bookmarksVisible: data.records.sort(
                        (a, b) => (a.fields.created > b.fields.created ? -1 : 1)
                    ),
                    tags: getUniqTags(data.records),
                    availableTags: getUniqTags(data.records),
                    loading: false
                })
            )
            .catch(err => console.log(err))
        // open url
        window.addEventListener('keydown', this.openMark)
    }
    handleFilter(t, key) {
        const { bookmarks, activeFilter, bookmarksVisible, tags } = this.state
        if (key === 0) {
            this.setState({
                bookmarksVisible: bookmarks,
                activeFilter: [],
                availableTags: tags,
                searchTerm: ''
            })
        } else {
            const filters = updateFilters(activeFilter, t)
            const currentBookmarks = [...bookmarks].filter(mark => checkAllTags(filters, mark))
            this.setState({
                activeFilter: filters,
                bookmarksVisible: currentBookmarks,
                searchTerm: '',
                availableTags: getUniqTags(currentBookmarks)
            })
        }
    }
    handleSearch(e, input) {
        const lastKey = e.target.value.slice(e.target.value.length - 1, e.target.value.length)
        if (!isValidNumber(lastKey)) {
            this.setState({
                bookmarksVisible: this.state.bookmarks.filter(
                    b =>
                        b.fields.name.includes(e.target.value) ||
                        b.fields.url.includes(e.target.value)
                ),
                activeFilter: [],
                activeSort: 'date--desc',
                searchTerm: e.target.value,
                availableTags: this.state.tags
            })
        }
    }
    handleSort(term) {
        this.setState({
            bookmarksVisible: sortMarks(this.state.bookmarksVisible, term),
            activeSort: term
        })
    }
    setEditMode() {
        this.setState({
            edit: !this.state.edit
        })
    }
    openMark(e) {
        if (isValidNumber(e.key) && this.state.bookmarksVisible.length >= e.key) {
            const url = this.state.bookmarksVisible[parseInt(e.key - 1, 10)].fields.url
            electron.shell.openExternal(url)
        }
    }
    openLink(url) {
        electron.shell.openExternal(url)
    }
    render() {
        const {
            loading,
            bookmarksVisible,
            tags,
            activeFilter,
            activeSort,
            searchTerm,
            availableTags
        } = this.state
        return (
            <div>
                {loading && <Loader />}
                {!loading &&
                    <main className="container">
                        <Header setEditMode={this.setEditMode} />
                        <Electron />
                        <Search handleSearch={this.handleSearch} searchTerm={searchTerm} />
                        <Filter
                            activeFilter={activeFilter}
                            availableTags={availableTags}
                            tags={['All', ...tags]}
                            handleFilter={this.handleFilter}
                        />
                        <Sort handleSort={this.handleSort} activeSort={activeSort} />
                        <ol className="marks">
                            {bookmarksVisible.length === 0 &&
                                <li className="marks__item--no-hits">
                                    No hits
                                </li>}
                            {bookmarksVisible.map((mark, i) => (
                                <Mark
                                    edit={this.state.edit}
                                    key={mark.id}
                                    mark={mark}
                                    openLink={this.openLink}
                                    index={i}
                                />
                            ))}
                        </ol>
                    </main>}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        app: state.app
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch)
}

export default FrontPage
