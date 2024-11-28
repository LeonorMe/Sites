document.addEventListener('DOMContentLoaded', function() {
    fetch('imagens.json')
        .then(response => response.json())
        .then(data => {
            const gallery = document.getElementById("images_small");
            data.images.forEach(image => {
                const imgElement = document.createElement('img');
                imgElement.src = image.image;
                imgElement.alt = image.titulo;
                gallery.appendChild(imgElement);
            });
        })
        .catch(error => console.error('Error loading images:', error));
});