import { browser } from '$app/environment'
import { writable } from 'svelte/store'
import { library } from '../../../books.json'

let a = library.map(item => item.book)
let r = []

if(browser){
    a = JSON.parse(localStorage.getItem('available')) || a
    r = JSON.parse(localStorage.getItem('reading')) || r
}

export const available = writable(a)
export const reading = writable(r)

if (browser) {
    available.subscribe((value) =>
      localStorage.setItem('available', JSON.stringify(value))
    )
    reading.subscribe((value) =>
      localStorage.setItem('reading', JSON.stringify(value))
    )
}