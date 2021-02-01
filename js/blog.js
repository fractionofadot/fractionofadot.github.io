function displayPost() {
	let params = (new URL(document.location)).searchParams;
	let post_id = parseInt(params.get('post_id')); 

	var converter = new showdown.Converter();

	if (post_id > 0) { 
		let post_file = 'posts/' + post_id + '.md';
		fetch(post_file)
			.then(response => {
				if (response.ok) {
					return response.text();
				} else {
					document.getElementById("post").innerHTML = '<p>Post not found.</p>';
					throw new Error('Post not found');
				}
			})
			.then(data => document.getElementById("post").innerHTML = converter.makeHtml(data)
		);
	}
}

function listPosts(postObject, idxFile) {
	fetch(idxFile)
		.then(response => {
			return response.json();
		})
		.then(data => {
			for (var i = data.length - 1; i >= 0; i--) {
				var node = document.createElement("article");
				node.id = 'post-' + i;
				node.className = "post-preview";
				node.innerHTML = '<h2>' + data[i].title + '</h2><p>' + data[i].abstract + '</p>';
				postObject.appendChild(node);
			}
	  }
	);
}

