<script lang="ts">
    import {createEventDispatcher} from 'svelte'
    export let book

    const dispatch = createEventDispatcher()

    function select(isbn){
        dispatch('select', {
            isbn
        })
    }
</script>
<div>
    <button class="container" on:click={()=>select(book.ISBN)}>
        <img src={book.cover} alt={book.tittle}>
    </button>
</div>

<style>
    .container {
        width: 128px;
        height: 196px;
    }

    .container img {
        width: 100%;
        height: 100%;
    }

    button {
	background: none;
	color: inherit;
	border: none;
	padding: 0;
	font: inherit;
	cursor: pointer;
	outline: inherit;
}
</style>