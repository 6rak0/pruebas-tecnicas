<script>
	import Book from '$lib/components/Book.svelte';
	import {genres} from '$lib/helpers';
	import {available, reading} from '$lib/stores'

	let selectedGenre = 'Todos';
	let selectedPages = 1300;
	let libraryCounter = $available.length
	let readingCounter

	function add(e) {
		$available.forEach((book) => {
			if (e.detail.isbn === book.ISBN) {
				$reading = [...$reading, book];
			}
		});
		$available = $available.filter((book) => e.detail.isbn != book.ISBN);
	}
	
	function remove(e) {
		$reading.forEach((book) => {
			if (e.detail.isbn === book.ISBN) {
				$available = [...$available, book];
			}
		});
		$reading = $reading.filter((book) => e.detail.isbn != book.ISBN);
	}

	$: {
		libraryCounter = 0
		readingCounter = 0
		$available.forEach((book) => {
			if (selectedGenre === book.genre || selectedGenre === 'Todos') {
				if (selectedPages > book.pages) {
					libraryCounter++
				}
			}
		});
		$reading.forEach((book) => {
			if (selectedGenre === book.genre || selectedGenre === 'Todos') {
				if (selectedPages > book.pages) {
					readingCounter++
				}
			}
		});
	}
</script>

<div class="controls">
	<input
		type="range"
		id="pages"
		name="pages"
		min="50"
		max="1550"
		step="100"
		bind:value={selectedPages}
	/>
	<select name="genre" id="genre" bind:value={selectedGenre}>
		<option value="Todos" selected>Todos</option>
		{#each genres as genre}
			<option value={genre}>{genre}</option>
		{/each}
	</select>
</div>

<div class="library">
	<p>libros disponibles {libraryCounter}</p>
	{#each $available as book}
		{#if selectedGenre === book.genre || selectedGenre === 'Todos'}
			{#if selectedPages > book.pages}
				<Book {book} on:select={add} />
			{/if}
		{/if}
	{/each}
</div>

<div class="reading-list">
	<p>libros en lista de lectura {readingCounter}</p>
	{#each $reading as book}
		{#if selectedGenre === book.genre || selectedGenre === 'Todos'}
			{#if selectedPages > book.pages}
				<Book {book} on:select={remove}/>
			{/if}
		{/if}
	{/each}
</div>

<style>
	.library,
	.reading-list {
		display: flex;
	}
</style>
